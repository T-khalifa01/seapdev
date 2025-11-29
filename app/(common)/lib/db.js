// //
// import mysql from 'mysql2/promise';
// // import fs from 'fs'; // node file system

// // const isProduction = process.env.NODE_ENV === 'production';
// // const caPath = process.env.DB_CA_PATH;

// const isLocal = process.env.NODE_ENV === 'development';

// const baseConfig = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
// });
// // ssl: {
// //     rejectUnauthorized: true
// //   }

// let finalConfig = { ...baseConfig };

// // // Conditionally configure SSL only when the CA file path is provided
// // if (isProduction && caPath) {
// //     try {
// //         baseConfig.ssl = {
// //             rejectUnauthorized: true, // Requires certificate validation
// //             // Read the CA file synchronously from the server's file system at startup
// //             ca: fs.readFileSync(caPath) 
// //         };
// //     } catch (error) {
// //         console.error("CRITICAL: Failed to load SSL CA certificate from path:", caPath, error);
// //         // 
// //         throw new Error("Missing critical SSL certificate for production database connection.");
// //     }
// // }

// if (!isLocal) {
//     // This runs in prod
//     try {
//         const fs = require('fs'); // NodeFS module is available in prodserver env
//         finalConfig.ssl = {
//             rejectUnauthorized: true, // Requires cert validation
//             ca: fs.readFileSync(process.env.DB_CA_PATH) // Path set in DO secrets
//         };
//     } catch (error) {
//         console.error("CRITICAL: Failed to load SSL CA certificate:", error);
//         // Throwing this error stops the production server from starting insecurely
//         throw new Error("Missing critical SSL certificate for production database connection.");
//     }
// } else {
//     // This runs in development (Local machine)
//     // We explicitly avoid setting finalConfig.ssl, disabling SSL for the local connection.
// }

// // export const pool = mysql.createPool(baseConfig);

// export const pool = mysql.createPool(finalConfig);

import mysql from 'mysql2/promise';
import fs from 'fs'; // Node.js File System module (safe here as it runs on server)
import path from 'path'; // For constructing the absolute file path

const isLocal = process.env.NODE_ENV === 'development';
// const caPath = process.env.DB_CA_PATH;

// 1. Define the base credentials configuration object (NOT the pool yet)
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
};

// 2. Conditionally add SSL configuration for Production
if (!isLocal) {
    // This runs in production (DigitalOcean)
    try {
        // Construct the absolute path to the certificate file
        const absoluteCaPath = path.join(process.cwd(), 'app', 'certs', 'ca-certificate.crt'); 

        // Attach the SSL object directly to the configuration
        config.ssl = {
            rejectUnauthorized: true, // Requires certificate validation
            ca: fs.readFileSync(absoluteCaPath) // Read the committed file content
        };
    } catch (error) {
        console.error("CRITICAL: Failed to load SSL CA certificate:", error.path, error);
        // Throwing this error stops the production server from starting insecurely
        throw new Error("Missing critical SSL certificate for production database connection.");
    }
} 
// else block (isLocal) is not needed, as the base config is used without 'ssl'

// 3. Create and export the pool ONCE using the final configuration
export const pool = mysql.createPool(config);