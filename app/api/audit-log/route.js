import { NextResponse } from 'next/server';
import { pool } from '../../(common)/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('pageSize')) || 25;
  const search = searchParams.get('search') || '';
  const sortKey = searchParams.get('sortKey') || 'created_at';
  const sortDir = searchParams.get('sortDir') || 'DESC';

  const offset = (page - 1) * pageSize;

  let connection;
  try {
    connection = await pool.getConnection();

    // 1. Get the total count for pagination
    const [countResult] = await connection.query("SELECT COUNT(*) as count FROM audit_log");
    const totalCount = countResult[0].count;

    // 2. Fetch the data with search, sort, and pagination
    let query = "SELECT * FROM audit_log";
    let values = [];

    if (search) {
      // Assuming you want to search by table name or action type
      query += " WHERE `table_name` LIKE ? OR `action_type` LIKE ?";
      values.push(`%${search}%`, `%${search}%`);
    }

    const direction = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    query += ` ORDER BY \`${sortKey}\` ${direction} LIMIT ? OFFSET ?`;
    values.push(pageSize, offset);

    const [rows] = await connection.query(query, values);

    // 3. Process the results. The 'data' column is already a JS object.
    const processedRows = rows.map(row => {
      // Corrected line: 'row.data' is already an object, so no need to parse it.
      const parsedData = row.data;
      
      // Create a new object with flattened JSON data
      return {
        id: row.id,
        action_type: row.action_type,
        table_name: row.table_name,
        original_id: row.original_id,
        data: JSON.stringify(row.data, null, 2),
        changed_by: row.changed_by,
        created_at: row.created_at,
      };
    });
    // field: parsedData.field,
    //     old_value: parsedData.old_value,
    //     new_value: parsedData.new_value,

    return NextResponse.json({
      data: processedRows,
      totalCount,
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch audit log:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}