

import { pool } from '../../../(common)/lib/db';
import { NextResponse } from 'next/server';

// Define a whitelist of tables and their configurations for security
// (This part remains the same)
const tableConfigs = {
  google_form_responses: {
    headers: ["timestamp", "state", "lga_name", "full_name", "phone_number", "email", "office_address", "households_without_electricity",
              "communities_not_connected_to_national_grid", "support_for_hybrid_power", "support_for_cng_elec_conversion",
              "existing_agroprocessing_centerds", "land_for_agro_expansion", "farming_hecters", "known_miniral_deposits",
              "types_of_minerals", "licensed_miners_present", "support_needed_to_attract_mining_investment", "designated_industrial_parks",
              "industries_that_would_thrive", "present_road_power_water_access_for_industries", "support_asset_allocation_for_investments",
              "number_of_33kv_transformer_present", "number_of_11kv_transformer_present", "number_of_415kv_transformer_present",
              "investments_priorities", "willing_to_meet_technical_advisors", "primary_cooking_fuel", "cooking_gas_price",
              "households_with_cooking_gas_percentage", "synced_at" ],
    searchableColumns: ["full_name", "lga_name", "state", "phone_number", "email" ],
    sortableColumns: ["full_name", "lga_name", "timestamp", "state", "synced_at"],
  },
  investment_submissions: {
    headers: ["full_name", "phone", "email", "identity", "organisation", "organisation_type", "lga", "sector_of_interest", "time_frame",
              "mode_of_investment", "previous_experience", "contact_method", "message", "receive_updates", "created_at"],
    searchableColumns: ["full_name", "phone", "email", "organisation", "lga", ],
    sortableColumns: ["full_name", "identity", "lga", "created_at", "receive_updates" ],
  },
  contact_submissions: {
    headers: ["full_name", "phone", "email", "identity", "organisation", "organisation_type", "message", "created_at", ],
    searchableColumns: ["full_name", "phone", "email", "organisation", ],
    sortableColumns: ["full_name", "identity", "created_at"],
  },
  subscriptions: {
    headers: ["email", "type", "created_at", ],
    searchableColumns: ["email", "type", ],
    sortableColumns: ["created_at", "type", "email",],
  }
};


// export async function GET(request, { params })
// export async function GET(request, { params: { tableName } })
// export async function GET(request)
export async function GET(request, { params }) {
  //const {tableName} = params.tableName;
  // const urlParts = request.url.split('/');
  // const tableName = urlParts[urlParts.length - 2].split('?')[0];
  //  const { params } = await context;
  const tableName = params.tableName;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const sortKey = searchParams.get('sortKey');
  const sortDir = searchParams.get('sortDir');

  if (!tableName || !tableConfigs[tableName]) {
    return NextResponse.json({ message: "Invalid table name." }, { status: 404 });
  }
  const config = tableConfigs[tableName];

  let connection;
  try {
    // Correct way to get a connection from the MySQL pool
    connection = await pool.getConnection();

    // 2. Construct the SQL query with search and sort logic
    // MySQL uses '?' for parameterized queries, and the query logic needs to be adapted.
    let query = `SELECT * FROM ${tableName}`;
    let values = [];
    let whereClauses = [];

    // Add search filter
    if (search) {
      const searchClauses = config.searchableColumns.map(col => `\`${col}\` LIKE ?`);
      whereClauses.push(`(${searchClauses.join(" OR ")})`);
      config.searchableColumns.forEach(() => values.push(`%${search}%`));
    }

    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    // Add sorting
    if (sortKey && sortDir) {
      if (!config.sortableColumns.includes(sortKey)) {
        return NextResponse.json({ message: "Invalid sort key" }, { status: 400 });
      }
      const direction = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      query += ` ORDER BY \`${sortKey}\` ${direction}`;
    } else {
      query += ` ORDER BY \`${config.sortableColumns[0]}\` DESC`;
    }

    // 3. Fetch all data using the correct MySQL query method
    const [rows] = await connection.query(query, values);
    const allRows = rows;

    // 4. Generate CSV string
    const headers = config.headers;
    const csvRows = [
      headers.join(","),
      ...allRows.map(row => headers.map(header => {
        const value = row[header] ?? "";
        const escapedValue = String(value).replace(/"/g, '""');
        return `"${escapedValue}"`;
      }).join(",")),
    ];
    const csv = csvRows.join("\n");

    // 5. Return the CSV file
    const responseHeaders = new Headers({
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${tableName}_export_${Date.now()}.csv`,
    });
    
    return new NextResponse(csv, { headers: responseHeaders });

  } catch (error) {
    console.error("CSV Export failed:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    // Correct way to release the connection for MySQL
    if (connection) {
      connection.release();
    }
  }
}