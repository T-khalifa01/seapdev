//
import mysql from 'mysql2/promise';
// import fs from 'fs'; // node file system

// const isProduction = process.env.NODE_ENV === 'production';
// const caPath = process.env.DB_CA_PATH;

const isLocal = process.env.NODE_ENV === 'development';

const baseConfig = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});
// ssl: {
//     rejectUnauthorized: true
//   }

let finalConfig = { ...baseConfig };

// // Conditionally configure SSL only when the CA file path is provided
// if (isProduction && caPath) {
//     try {
//         baseConfig.ssl = {
//             rejectUnauthorized: true, // Requires certificate validation
//             // Read the CA file synchronously from the server's file system at startup
//             ca: fs.readFileSync(caPath) 
//         };
//     } catch (error) {
//         console.error("CRITICAL: Failed to load SSL CA certificate from path:", caPath, error);
//         // 
//         throw new Error("Missing critical SSL certificate for production database connection.");
//     }
// }

if (!isLocal) {
    // This runs in prod
    try {
        const fs = require('fs'); // NodeFS module is available in prodserver env
        finalConfig.ssl = {
            rejectUnauthorized: true, // Requires cert validation
            ca: fs.readFileSync(process.env.DB_CA_PATH) // Path set in DO secrets
        };
    } catch (error) {
        console.error("CRITICAL: Failed to load SSL CA certificate:", error);
        // Throwing this error stops the production server from starting insecurely
        throw new Error("Missing critical SSL certificate for production database connection.");
    }
} else {
    // This runs in development (Local machine)
    // We explicitly avoid setting finalConfig.ssl, disabling SSL for the local connection.
}

// export const pool = mysql.createPool(baseConfig);

export const pool = mysql.createPool(finalConfig);