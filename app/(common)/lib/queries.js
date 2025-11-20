import { pool } from './db';//./db

/**
 * Fetches all LGA data for a given state from the database.
 * @param {string} stateName - The name of the state (e.g., 'Abia').
 * @returns {Promise<Array<Object>>} An array of LGA data objects.
 */
// export async function getLgaDataForState(stateName) {
//   const connection = await pool.getConnection();
//   try {
//     const [rows] = await connection.execute(
//       `SELECT
//         name,
//         population_estimate AS population,
//         households_with_electricity_meter AS homesWithMeter,
//         registered_tricycles AS tricycles,
//         commercial_motorcycles AS motorcycles,
//         mini_buses_vans AS buses,
//         percentage_households_with_cooking_gas AS homesWithCookingGas,
//         available_agricultural_land AS agriLand,
//         top_5_crops_grown AS cropsGrown,
//         minerals_resources_present AS mineralsPresent,
//         development_needed AS neededDev
//        FROM lgas
//        WHERE state = ?`,
//       [stateName]
//     );

//     return rows;
//   } finally {
//     connection.release();
//   }
// }


export async function getLgaDataForState(stateName) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT
        lga_name AS name,
        estimated_lga_population AS population,
        households_without_electricity AS homesWithMeter,
        registered_tricycles AS tricycles,
        registered_motorcycles AS motorcycles,
        registered_buses AS buses,
        households_with_cooking_gas_percentage AS homesWithCookingGas,
        farming_hecters AS agriLand,
        top_crops_grown AS cropsGrown,
        types_of_minerals AS mineralsPresent,
        investments_priorities AS neededDev
       FROM google_form_responses
       WHERE state = ?`,
      [stateName]
    );

    return rows;
  } finally {
    connection.release();
  }
}