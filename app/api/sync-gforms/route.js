// // For Next.js App Router (app/api/sync/route.js)
// import pool from '../../(common)/lib/db';

// export async function POST(req) {
//   try {
//     const body = await req.json();  // rows from Google Apps Script
//     const rows = body.rows;

//     if (!rows || rows.length === 0) {
//       return new Response(JSON.stringify({ message: "No rows received" }), { status: 400 });
//     }

//     // Insert each row into DB
//     for (const row of rows) {
//       const keys = Object.keys(row);
//       const values = Object.values(row);

//       const placeholders = keys.map(() => "?").join(",");

//       const sql = `
//         INSERT INTO google_form_responses (${keys.join(",")})
//         VALUES (${placeholders})
//       `;

//       await pool.execute(sql, values);
//     }

//     return new Response(JSON.stringify({ message: "Data synced successfully" }), { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "Error syncing data", error: error.message }), { status: 500 });
//   }

// }
// function formatTimestamp(ts) {
//   const d = new Date(ts);
//   if (isNaN(d.getTime())) return null; // fallback if it's not a valid date
//   const pad = (n) => (n < 10 ? "0" + n : n);
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
// }

// export async function GET() {
//   try {
//     //0. test env
//     //console.log("ALL ENVS:", process.env);
//     // 1. Get last synced timestamp from DB
//     const [rows] = await pool.query(
//       "SELECT MAX(timestamp) as lastSynced FROM google_form_responses"
//     );
//     const lastSynced = rows[0].lastSynced || "1970-01-01";

//     // 2. Google Sheets Auth
//     // console.log("ENV START ===");
//     // console.log(process.env.GOOGLE_SHEETS_KEY);
//     // console.log("ENV END ===");
//     //credentials: JSON.parse(process.env.GOOGLE_SHEETS_KEY),
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         // Use the two environment variables here
//         client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // This is the crucial step  
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });
//     const sheets = google.sheets({ version: "v4", auth });

//     // 3. Fetch sheet values (Form tab)
//     const res = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.SHEET_ID,
//       range: "Form Responses 1!A:BW", // from A to BW colums in sheet
//     });

//     const allRows = res.data.values;
//     const headers = allRows[0];
//     const dataRows = allRows.slice(1);

//     // 4. Filter only new rows (compare Timestamps)
//     const newRows = dataRows.filter(
//       (r) => new Date(r[0]) > new Date(lastSynced) // assumes A = Timestamp
//     );

//     if (newRows.length === 0) {
//       return new Response(JSON.stringify({ message: "No new rows" }), { status: 200 });
//     }

//     // 5. Map sheet headers → DB fields
//     const mappedRows = newRows.map((row) => {
//       const obj = {};
//       headers.forEach((h, i) => {
//         if (mappedData[h]) {
//           obj[mappedData[h]] = row[i] || null;
//         }
//       });
//       return obj;
//     });


//     // 6. Insert into DB
//     for (const row of mappedRows) {
//       const keys = Object.keys(row);
//       const values = Object.values(row);
//       const placeholders = keys.map(() => "?").join(",");

//       const sql = `
//         INSERT INTO google_form_responses (${keys.join(",")})
//         VALUES (${placeholders})
//       `;
//       await pool.execute(sql, values);
//     }

//     return new Response(
//       JSON.stringify({ message: "Inserted new rows", count: mappedRows.length }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }






// // app/api/sync/route.js // this handles the taken data from google shits to db
// import {pool} from "../../(common)/lib/db";
// import { google } from "googleapis";

// const mappedData = {
//   "Timestamp": "timestamp",
//   "Which state are you in?": "state",
//   "final LGAs": "lga_name",
//   "  Full Name  ": "full_name",
//   "Phone Number": "phone_number",
//   "Email Address": "email",
//   "Office Address": "office_address",
//   "Estimated LGA Population": "estimated_lga_population",
//   "Estimated Number of households without electricity meter": "households_without_electricity",
//   "Are there power distribution challenges in your LGA?": "power_distribution_challenges",
//   "Do you have communities not connected to the national grid?": "communities_not_connected_to_national_grid",
//   "Would you support off-grid hybrid power (gas + solar) deployment?": "support_for_hybrid_power",
//   "Number of Registered Tricycles (Keke)": "registered_tricycles",
//   "Number of Commercial Motorcycles (Okada)": "registered_motorcycles",
//   "Number of Mini Buses / Vans": "registered_buses",
//   "Would you support a CNG/electric conversion project?": "support_for_cng_elec_conversion",
//   "Top 5 crops grown in your LGA": "top_crops_grown",
//   "Are there existing agro-processing centers?": "existing_agroprocessing_centerds",
//   "Agro-Processing opportunities needed?": "agroprocessing_opportunities_needed",
//   "Is there land for agro expansion or industrial farming?": "land_for_agro_expansion",
//   "If Yes, how many hectares?": "farming_hecters",
//   "Are there known mineral deposits?": "known_miniral_deposits",
//   "If yes, list types of minerals": "types_of_minerals",
//   "Are licensed miners operating currently?": "licensed_miners_present",
//   "What support is needed to attract mining investment?": "support_needed_to_attract_mining_investment",
//   "Is there a designated industrial park/area?": "designated_industrial_parks",
//   "What types of industries would thrive in your LGA?": "industries_that_would_thrive",
//   "Does your LGA have road, power, or water access for industry?": "present_road_power_water_access_for_industries",
//   "Would you support land/public asset allocation for investment?": "support_asset_allocation_for_investments",
//   "33kv": "number_of_33kv_transformer_present",
//   "11kv": "number_of_11kv_transformer_present",
//   "415v": "number_of_415kv_transformer_present",
//   "What specific investment priorities/projects would you like to see in your LGA? ": "investments_priorities",
//   "Would you be willing to meet technical or investor teams?": "willing_to_meet_technical_advisors",
//   "What is the primary cooking fuel in your LGA?": "primary_cooking_fuel",
//   "What is the price of Cooking gas per/kg in your LGA?": "cooking_gas_price",
//   "What percentage of households in your LGA cook with Gas? ": "households_with_cooking_gas_percentage"
// };



// // helper to convert Sheets timestamp -> MySQL DATETIME
// function formatTimestamp(ts) {
//   const d = new Date(ts);
//   if (isNaN(d.getTime())) return null; // fallback if it's not a valid date
//   const pad = (n) => (n < 10 ? "0" + n : n);
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
// }

// export async function GET() {
//   try {
//     // 1. Get last synced timestamp from DB
//     const [rows] = await pool.query(
//       "SELECT MAX(timestamp) as lastSynced FROM google_form_responses"
//     );
//     const lastSynced = rows[0].lastSynced || "1970-01-01";

//     // 2. Google Sheets Auth
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });
//     const sheets = google.sheets({ version: "v4", auth });

//     // 3. Fetch sheet values
//     const res = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.SHEET_ID,
//       range: "Form Responses 1!A:BW",
//     });

//     const allRows = res.data.values;
//     const headers = allRows[0];
//     const dataRows = allRows.slice(1);

//     // 4. Filter only new rows (compare timestamps in column A)
//     const newRows = dataRows.filter(
//       (r) => new Date(r[0]) > new Date(lastSynced)
//     );

//     if (newRows.length === 0) {
//       return new Response(JSON.stringify({ message: "No new rows" }), { status: 200 });
//     }

//     // 5. Map sheet headers → DB fields
//     const mappedRows = newRows.map((row) => {
//       const obj = {};
//       headers.forEach((h, i) => {
//         if (mappedData[h]) {
//           obj[mappedData[h]] = row[i] || null;
//         }
//       });

//       // Fix timestamp before saving
//       if (obj.timestamp) {
//         obj.timestamp = formatTimestamp(obj.timestamp);
//       }

//       return obj;
//     });

//     // 6. Insert into DB
//     for (const row of mappedRows) {
//       const keys = Object.keys(row);
//       const values = Object.values(row);
//       const placeholders = keys.map(() => "?").join(",");

//       const sql = `
//         INSERT INTO google_form_responses (${keys.join(",")})
//         VALUES (${placeholders})
//       `;
//       await pool.execute(sql, values);
//     }

//     return new Response(
//       JSON.stringify({ message: "Inserted new rows", count: mappedRows.length }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }






import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { pool } from "../../(common)/lib/db";
import { google } from "googleapis";

// Define the data mapping object
const mappedData = {
  "Timestamp": "timestamp",
  "Which state are you in?": "state",
  "final LGAs": "lga_name",
  "Full Name": "full_name",
  "Phone Number": "phone_number",
  "Email Address": "email",
  "Office Address": "office_address",
  "Estimated LGA Population": "estimated_lga_population",
  "Estimated Number of households without electricity meter": "households_without_electricity",
  "Are there power distribution challenges in your LGA?": "power_distribution_challenges",
  "Do you have communities not connected to the national grid?": "communities_not_connected_to_national_grid",
  "Would you support off-grid hybrid power (gas + solar) deployment?": "support_for_hybrid_power",
  "Number of Registered Tricycles (Keke)": "registered_tricycles",
  "Number of Commercial Motorcycles (Okada)": "registered_motorcycles",
  "Number of Mini Buses / Vans": "registered_buses",
  "Would you support a CNG/electric conversion project?": "support_for_cng_elec_conversion",
  "Top 5 crops grown in your LGA": "top_crops_grown",
  "Are there existing agro-processing centers?": "existing_agroprocessing_centerds",
  "Agro-Processing opportunities needed?": "agroprocessing_opportunities_needed",
  "Is there land for agro expansion or industrial farming?": "land_for_agro_expansion",
  "If Yes, how many hectares?": "farming_hecters",
  "Are there known mineral deposits?": "known_miniral_deposits",
  "If yes, list types of minerals": "types_of_minerals",
  "Are licensed miners operating currently?": "licensed_miners_present",
  "What support is needed to attract mining investment?": "support_needed_to_attract_mining_investment",
  "Is there a designated industrial park/area?": "designated_industrial_parks",
  "What types of industries would thrive in your LGA?": "industries_that_would_thrive",
  "Does your LGA have road, power, or water access for industry?": "present_road_power_water_access_for_industries",
  "Would you support land/public asset allocation for investment?": "support_asset_allocation_for_investments",
  "33kv": "number_of_33kv_transformer_present",
  "11kv": "number_of_11kv_transformer_present",
  "415v": "number_of_415kv_transformer_present",
  "What specific investment priorities/projects would you like to see in your LGA? ": "investments_priorities",
  "Would you be willing to meet technical or investor teams?": "willing_to_meet_technical_advisors",
  "What is the primary cooking fuel in your LGA?": "primary_cooking_fuel",
  "What is the price of Cooking gas per/kg in your LGA?": "cooking_gas_price",
  "What percentage of households in your LGA cook with Gas? ": "households_with_cooking_gas_percentage"
};


// helper to convert Sheets timestamp -> MySQL DATETIME
function formatTimestamp(ts) {
  const d = new Date(ts);
  if (isNaN(d.getTime())) return null;
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// ADDED REQUEST ARGUMENT
export async function POST(request) {
    // 1. Authorization Check (Admin Only)
    const session = await getServerSession({ req: request, ...authOptions });

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Permission denied. Admin required to trigger sync.' }, { status: 403 });
    }

  try {
   // 2. Get last synced timestamp from DB
     const [rows] = await pool.query(
     "SELECT MAX(timestamp) as lastSynced FROM google_form_responses"
    );
    const lastSynced = rows[0].lastSynced || "1970-01-01";

    // 3. Google Sheets Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // 4. Fetch sheet values
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Form Responses 1!A:BW",
    });

    const allRows = res.data.values;
    if (!allRows || allRows.length < 1) {
        return NextResponse.json({ message: "Sheet is empty or inaccessible." }, { status: 404 });
    }

    const headers = allRows[0];
    const dataRows = allRows.slice(1);

    // 5. Filter only new rows (compare timestamps in column A)
    const lastSyncedDate = new Date(lastSynced).getTime();
    const newRows = dataRows.filter(
      (r) => {
            // Google Sheets timestamp is always the first column (r[0])
            const rowTimestamp = new Date(r[0]).getTime();
            return rowTimestamp > lastSyncedDate;
        }
    );

    if (newRows.length === 0) {
      return NextResponse.json({ message: "No new rows found in Google Forms data." }, { status: 200 });
    }

    // 6. Map sheet headers → DB fields
    const mappedRows = newRows.map((row) => {
      const obj = {};
      headers.forEach((h, i) => {
        if (mappedData[h]) {
          obj[mappedData[h]] = row[i] || null;
        }
      });

      // Fix timestamp before saving
      if (obj.timestamp) {
        obj.timestamp = formatTimestamp(obj.timestamp);
      }

      return obj;
    });

    // 7. Insert into DB using a transaction for robustness
    let insertedCount = 0;
    for (const row of mappedRows) {
        const keys = Object.keys(row);
        const values = Object.values(row);
        const placeholders = keys.map(() => "?").join(",");

        const sql = `
            INSERT INTO google_form_responses (${keys.join(",")})
            VALUES (${placeholders})
        `;
        // Using pool.execute for prepared statements is generally better than pool.query
        const [result] = await pool.execute(sql, values);
        insertedCount += result.affectedRows;
    }

    return NextResponse.json(
      { message: `Successfully inserted ${insertedCount} new row(s).`, count: insertedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google Forms Sync Error:", error);
    return NextResponse.json({ message: 'Failed to complete synchronization due to a server error.' }, { status: 500 });
  }
}