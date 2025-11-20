import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { pool } from '../../(common)/lib/db';

export async function POST(request) {
  // 1. Authorization Check
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
    return NextResponse.json({ message: 'Permission denied' }, { status: 403 });
  }
  const userId = session.user.id;

  try {
    const { auditLogId } = await request.json();

    if (!auditLogId) {
      return NextResponse.json({ message: 'Audit log ID is required' }, { status: 400 });
    }

    let connection;
    try {
      connection = await pool.getConnection();

      // 2. Fetch the audit log record
      const [auditLogResult] = await connection.query(
        "SELECT * FROM audit_log WHERE id = ?",
        [auditLogId]
      );
      const auditLogRecord = auditLogResult[0];

      if (!auditLogRecord) {
        return NextResponse.json({ message: 'Audit log record not found' }, { status: 404 });
      }

      // 3. Parse the stored data and determine the action
      const { action_type, table_name, original_id, data } = auditLogRecord;
      //  const parsedData = JSON.parse(data);
      let parsedData;
      // try {
      //   parsedData = JSON.parse(data);
      // } catch (e) {
      //   // Log the error for debugging
      //   console.error("Failed to parse audit log data:", e);
      //   return NextResponse.json({ message: "Invalid audit log data format. Restore impossible." }, { status: 500 });
      // }

      //
      if (typeof data === 'object' && data !== null) {
          parsedData = data;
      } else if (typeof data === 'string') {
          // Only attempt to parse if it is a string
          try {
              parsedData = JSON.parse(data);
          } catch (e) {
              console.error("Failed to parse audit log data:", e);
              return NextResponse.json({ message: "Invalid audit log data format. Restore impossible." }, { status: 500 });
          }
      } else {
          // Fallback for unexpected data types
          console.error("Audit log data is neither a string nor an object:", typeof data);
          return NextResponse.json({ message: "Unexpected audit log data type. Restore impossible." }, { status: 500 });
      }

      const formatToMySQLDatetime = (isoString) => {
        if (!isoString) return null;
        try {
            // Create a Date object from the ISO string
            const date = new Date(isoString);
            
            // Check if the date is valid
            if (isNaN(date)) return isoString; // Return original if it's not a valid date
            
            // Format the components (padding with 0s)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        } catch (e) {
            console.error("Date formatting failed:", e);
            return isoString; // Fallback to original
        }
      };

      if (action_type === 'edited') {
        // Handle "edited" records: Revert the specific field
        // const { field, old_value, } = parsedData;
        const oldValues = parsedData.original;

        // new change
        const dataToRevert = { ...oldValues };
        delete dataToRevert.id;

        if (dataToRevert.created_at) {
          dataToRevert.created_at = formatToMySQLDatetime(dataToRevert.created_at);
        }
        if (dataToRevert.synced_at) {
          dataToRevert.synced_at = formatToMySQLDatetime(dataToRevert.synced_at);
        }
        if (dataToRevert.timestamp) {
          dataToRevert.timestamp = formatToMySQLDatetime(dataToRevert.timestamp);
        }

        // Revert the change
        const [updateResult] = await connection.query(
          // `UPDATE \`${table_name}\` SET \`${field}\` = ? WHERE id = ?`,
          `UPDATE \`${table_name}\` SET ? WHERE id = ?`,
          [dataToRevert, original_id]
        );

        if (updateResult.affectedRows === 0) {
          return NextResponse.json({ message: 'Failed to restore: record not found or no change made' }, { status: 404 });
        }

        // // 4. Log the "restore" action to the audit log
        // await connection.query(
        //   "INSERT INTO audit_log (action_type, table_name, original_id, data, changed_by) VALUES (?, ?, ?, ?, ?)",
        //   // ['restored', table_name, original_id, JSON.stringify({ reverted_field: field, reverted_to: oldValues}), userId]
        //   ['restored', table_name, original_id, JSON.stringify({ reverted_data: parsedData.original }), userId]
        // );
        // 4.  Delete the original audit log record from the audit_log table
        await connection.query(
          "DELETE FROM audit_log WHERE id = ?",
          [auditLogId]
        );

        return NextResponse.json({ message: 'Change successfully reverted' }, { status: 200 });

      }
      else if (action_type === 'deleted') {
        //
        // const originalRowData = parsedData;
        const originalRowData = parsedData.original;

        const dataToInsert = { ...originalRowData };

        if (dataToInsert.created_at) {
          dataToInsert.created_at = formatToMySQLDatetime(dataToInsert.created_at);
        }
        if (dataToInsert.synced_at) {
          dataToInsert.synced_at = formatToMySQLDatetime(dataToInsert.synced_at);
        }
        if (dataToInsert.timestamp) {
          dataToInsert.timestamp = formatToMySQLDatetime(dataToInsert.timestamp);
        }


        const columns = Object.keys(dataToInsert).join(', ');
        const placeholders = Object.keys(dataToInsert).map(() => '?').join(', ');
        const values = Object.values(dataToInsert);

        const [insertResult] = await connection.query(
          `INSERT INTO \`${table_name}\` (${columns}) VALUES (${placeholders})`,
          values
        );

        if (insertResult.affectedRows === 0) {
          return NextResponse.json({ message: 'Failed to restore: no record was inserted' }, { status: 500 });
        }

        // // 4. Log the "restore" action to the audit log
        // await connection.query(
        //   "INSERT INTO audit_log (action_type, table_name, original_id, data, changed_by) VALUES (?, ?, ?, ?, ?)",
        //   ['restored', table_name, original_id, JSON.stringify({ reinserted_id: original_id }), userId]
        // );
        await connection.query(
          "DELETE FROM audit_log WHERE id = ?",
          [auditLogId]
        );

        return NextResponse.json({ message: 'Record successfully restored' }, { status: 200 });

      } else {
        // The record's action type is not restorable
        return NextResponse.json({ message: 'Action type is not restorable' }, { status: 400 });
      }

    } catch (dbError) {
      console.error('Database operation failed during restore:', dbError);
      return NextResponse.json({ message: 'Failed to perform restore operation' }, { status: 500 });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (error) {
    console.error("Restore request failed:", error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}