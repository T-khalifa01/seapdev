import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { pool } from '../../(common)/lib/db';

// Define allowed columns to prevent SQL injection
const allowedInvestmentFormsColumns = [
  "id", "created_at", "state", "lga", "full_name", "phone", "email",
  "identity", "organisation", "organisation_type", "sector_of_interest",
  "investment_capacity", "time_frame", "mode_of_investment",
  "previous_experience", "contact_method", "message", "receive_updates"
];

const checkColumn = (key) => {
  if (allowedInvestmentFormsColumns.includes(key)) {
    return key;
  }
  return 'id'; // Default to a safe column
};

// =================================================================
// Reusable Validation Function (adapted from your form submission logic)
// =================================================================
const validateInvestmentData = (data, isPatch = false) => {
  const errors = {};
  
  // Required fields for full submission (POST)
  const requiredFields = [
    'full_name', 'phone', 'email', 'identity', 'state', 'lga',
    'sector_of_interest', 'time_frame', 'investment_capacity', 'mode_of_investment', 'contact_method'
  ];

  if (!isPatch) {
    for (const field of requiredFields) {
      if (!data[field]) {
        errors[field] = `${field} is required.`;
      }
    }
  }

  // Validate specific formats
  if (data.phone && !/^\d{7,15}$/.test(data.phone)) {
    errors.phone = 'Invalid phone number format.';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format.';
  }

  // Conditional validation for 'Representative' identity
  if (data.identity === 'Representative') {
    if (!data.organisation) {
      errors.organisation = 'Organization Name is required.';
    }
    if (!data.organisation_type) {
      errors.organisation_type = 'Organization Type is required.';
    }
  }

  return errors;
};

// =================================================================
// Auditing Helper Function (reused from the LGA route)
// =================================================================
const logDataChange = async (actionType, tableName, originalId, originalData, changedBy, updatedData = null) => {
  try {

    const dataToStore = {
      original: originalData,
      updated: updatedData, // Will be null for deleted records
    };

    const query = `
      INSERT INTO audit_log (action_type, table_name, original_id, data, changed_by)
      VALUES (?, ?, ?, ?, ?);
    `;
    const jsonData = JSON.stringify(dataToStore);
    //
    await pool.query(query, [actionType, tableName, originalId, jsonData, changedBy]);
    console.log(`Audit log: ${actionType} on ${tableName} for ID ${originalId} by user ${changedBy}`);
  } catch (err) {
    console.error('Audit log failed:', err);
  }
};

// =================================================================
// GET: Fetch and filter data
// =================================================================
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 25;
    const search = searchParams.get('search') || '';
    const sortKey = checkColumn(searchParams.get('sortKey'));
    const sortDir = (searchParams.get('sortDir') === 'desc') ? 'DESC' : 'ASC';

    const offset = (page - 1) * pageSize;

    const searchCondition = search ? `
      WHERE
        full_name LIKE ? OR email LIKE ? OR phone LIKE ?
    ` : '';
    const searchParam = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];
    
    const countQuery = `SELECT COUNT(*) AS total_count FROM investment_submissions ${searchCondition}`;
    const [totalResult] = await pool.query(countQuery, searchParam);
    const total = totalResult[0].total_count;

    const dataQuery = `
      SELECT * FROM investment_submissions
      ${searchCondition}
      ORDER BY ${sortKey} ${sortDir}
      LIMIT ? OFFSET ?;
    `;
    const dataParams = search ? [...searchParam, pageSize, offset] : [pageSize, offset];
    
    const [dataResult] = await pool.query(dataQuery, dataParams);
    const rows = dataResult;

    return NextResponse.json({ rows, total });

  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch investment forms' }, { status: 500 });
  }
}

// =================================================================
// POST: Create a new row
// =================================================================
export async function POST(request) {
  try {
    const data = await request.json();
    const errors = validateInvestmentData(data);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
    }

    const keys = Object.keys(data).filter(key => allowedInvestmentFormsColumns.includes(key) && key !== 'id');
    const values = keys.map(key => data[key]);
    
    const placeholders = keys.map(() => '?').join(', ');
    const columns = keys.map(key => `\`${key}\``).join(', ');

    const query = `
      INSERT INTO investment_submissions (${columns})
      VALUES (${placeholders});
    `;
    
    const [result] = await pool.query(query, values);
    const newId = result.insertId;
    
    const [newRowResult] = await pool.query('SELECT * FROM investment_submissions WHERE id = ?', [newId]);
    
    return NextResponse.json({ success: true, row: newRowResult[0] });

  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create new investment form record' }, { status: 500 });
  }
}

// =================================================================
// PATCH: Update a specific cell in a row (with auditing)
// =================================================================
export async function PATCH(request) {
  //
  const session = await getServerSession({ req: request, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    if (session.user.role !== 'admin' && session.user.role !== 'editor') {
      return NextResponse.json({ message: 'Permission denied' }, { status: 403 }); // Forbidden
    }
    const changedBy = session.user.name;
    
  try {
    const { id, key, value } = await request.json();

    const safeKey = checkColumn(key);
    
    if (!id || !safeKey) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    
    const errors = validateInvestmentData({ [safeKey]: value }, true);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
    }

    // fetch
    const [originalResult] = await pool.query('SELECT * FROM investment_submissions WHERE id = ?', [id]);
    const originalRow = originalResult[0];
    
    if (!originalRow) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // We now log the specific change, not the whole row
    // const auditData = {
    //   field: safeKey,
    //   old_value: originalRow[safeKey],
    //   new_value: value,
    // };
    // await logDataChange('edited', 'investment_submissions', id, auditData, changedBy);

    //  2. update
    const query = `
      UPDATE investment_submissions
      SET \`${safeKey}\` = ?
      WHERE id = ?;
    `;

    const [updateResult] = await pool.query(query, [value, id]);

    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    //  3. fetch
    const [updatedRowResult] = await pool.query('SELECT * FROM investment_submissions WHERE id = ?', [id]);
    const updatedRow = updatedRowResult[0];

    //  4. log
    await logDataChange('edited', 'investment_submissions', id, originalRow, changedBy, updatedRow);
    //
    return NextResponse.json({ success: true, row: updatedRow });

  } catch (error) {
    console.error('API PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update investment form record' }, { status: 500 });
  }
}

// =================================================================
// DELETE: Delete a row (with auditing)
// =================================================================
export async function DELETE(request) {
  // Get the session to get the user ID
    const session = await getServerSession({ req: request, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    if (session.user.role !== 'admin' && session.user.role !== 'editor') {
      return NextResponse.json({ message: 'Permission denied' }, { status: 403 }); // Forbidden
    }
    const changedBy = session.user.name;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    //  1. fetch
    const [originalResult] = await pool.query('SELECT * FROM investment_submissions WHERE id = ?', [id]);
    const originalRow = originalResult[0];
    
    if (!originalRow) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    //  2. log
    await logDataChange('deleted', 'investment_submissions', id, originalRow, changedBy);

    //  3. log
    const query = `DELETE FROM investment_submissions WHERE id = ?;`;
    const [deleteResult] = await pool.query(query, [id]);

    if (deleteResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Record deleted' });

  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete investment form record' }, { status: 500 });
  }
}