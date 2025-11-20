
//this is the route to fetch the google-form-data  lga data for dashboard
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { pool } from '../../(common)/lib/db';

// Define allowed columns to prevent SQL injection
const allowedLgaFormsColumns = [
  "id", "timestamp", "state", "lga_name", "full_name", "phone_number", "email",
  "office_address", "estimated_lga_population", "households_without_electricity",
  "power_distribution_challenges", "communities_not_connected_to_national_grid",
  "support_for_hybrid_power", "registered_tricycles", "registered_motorcycles",
  "registered_buses", "support_for_cng_elec_conversion", "top_crops_grown",
  "existing_agroprocessing_centerds", "agroprocessing_opportunities_needed",
  "land_for_agro_expansion", "farming_hecters", "known_miniral_deposits",
  "types_of_minerals", "licensed_miners_present", "support_needed_to_attract_mining_investment",
  "designated_industrial_parks", "industries_that_would_thrive",
  "present_road_power_water_access_for_industries", "support_asset_allocation_for_investments",
  "number_of_33kv_transformer_present", "number_of_11kv_transformer_present",
  "number_of_415kv_transformer_present", "investments_priorities",
  "willing_to_meet_technical_advisors", "primary_cooking_fuel", "cooking_gas_price",
  "households_with_cooking_gas_percentage", "synced_at"
];

const checkColumn = (key) => {
  if (allowedLgaFormsColumns.includes(key)) {
    return key;
  }
  return 'id'; // Default to a safe column
};

// =================================================================
// Reusable Validation Function (adapted from your code)
// =================================================================
const validateLGAData = (data, isPatch = false) => {
  const errors = {};
  
  // Required fields for full submission (POST)
  const requiredFields = ["full_name", "phone_number", "email", "state", "lga_name"];
  if (!isPatch) {
    for (const field of requiredFields) {
      if (!data[field]) {
        errors[field] = `${field} is required.`;
      }
    }
  }

  // Validate specific formats
  if (data.phone_number && !/^\d{7,15}$/.test(data.phone_number)) {
    errors.phone_number = 'Invalid phone number format.';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format.';
  }

  return errors;
};

// =================================================================
// Auditing Helper Function (updated with `audit_log` table)
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
        full_name LIKE ? OR lga_name LIKE ? OR email LIKE ? OR state LIKE ?
    ` : '';
    const searchParam = search ? [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`] : [];
    
    const countQuery = `SELECT COUNT(*) AS total_count FROM google_form_responses ${searchCondition}`;
    const [totalResult] = await pool.query(countQuery, searchParam);
    const total = totalResult[0].total_count;

    const dataQuery = `
      SELECT * FROM google_form_responses
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
    return NextResponse.json({ error: 'Failed to fetch LGA forms' }, { status: 500 });
  }
}

// =================================================================
// POST: Create a new row
// =================================================================
export async function POST(request) {
  try {
    const data = await request.json();
    const errors = validateLGAData(data);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
    }

    const keys = Object.keys(data).filter(key => allowedLgaFormsColumns.includes(key) && key !== 'id');
    const values = keys.map(key => data[key]);
    
    const placeholders = keys.map(() => '?').join(', ');
    const columns = keys.map(key => `\`${key}\``).join(', ');

    const query = `
      INSERT INTO google_form_responses (${columns})
      VALUES (${placeholders});
    `;
    
    const [result] = await pool.query(query, values);
    const newId = result.insertId;
    
    const [newRowResult] = await pool.query('SELECT * FROM google_form_responses WHERE id = ?', [newId]);
    
    return NextResponse.json({ success: true, row: newRowResult[0] });

  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create new LGA form record' }, { status: 500 });
  }
}

// =================================================================
// PATCH: Update a specific cell in a row
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
    
    // Validate the single field being updated
    const errors = validateLGAData({ [safeKey]: value }, true);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
    }

    //  1. fetch
    const [originalResult] = await pool.query('SELECT * FROM google_form_responses WHERE id = ?', [id]);
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
    // await logDataChange('edited', 'google_form_responses', id, originalRow, changedBy);

    //  2. update
    const query = `
      UPDATE google_form_responses
      SET \`${safeKey}\` = ?
      WHERE id = ?;
    `;
    
    const [updateResult] = await pool.query(query, [value, id]);
    
    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    //  3. fetch
    const [updatedRowResult] = await pool.query('SELECT * FROM google_form_responses WHERE id = ?', [id]);
    const updatedRow = updatedRowResult[0];

    // 4. Log the full original and updated rows to the audit log
    await logDataChange('edited', 'google_form_responses', id, originalRow, changedBy, updatedRow);
    //
    return NextResponse.json({ success: true, row: updatedRow });

  } catch (error) {
    console.error('API PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update LGA form record' }, { status: 500 });
  }
}

// =================================================================
// DELETE: Delete a row (with auditing)
// =================================================================
export async function DELETE(request) {
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    //  1. fetch
    const [originalResult] = await pool.query('SELECT * FROM google_form_responses WHERE id = ?', [id]);
    const originalRow = originalResult[0];
    
    if (!originalRow) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    
    //  2. log
    await logDataChange('deleted', 'google_form_responses', id, originalRow, changedBy);

    //  3. deletion
    const query = `DELETE FROM google_form_responses WHERE id = ?;`;
    const [deleteResult] = await pool.query(query, [id]);

    if (deleteResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Record deleted' });

  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete LGA form record' }, { status: 500 });
  }
}