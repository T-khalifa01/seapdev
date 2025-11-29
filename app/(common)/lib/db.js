//
import mysql from 'mysql2/promise';
import fs from 'fs'; // node file system

const isProduction = process.env.NODE_ENV === 'production';
const caPath = process.env.DB_CA_PATH;

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

// Conditionally configure SSL only when the CA file path is provided
if (isProduction && caPath) {
    try {
        baseConfig.ssl = {
            rejectUnauthorized: true, // Requires certificate validation
            // Read the CA file synchronously from the server's file system at startup
            ca: fs.readFileSync(caPath) 
        };
    } catch (error) {
        console.error("CRITICAL: Failed to load SSL CA certificate from path:", caPath, error);
        // 
        throw new Error("Missing critical SSL certificate for production database connection.");
    }
}

export const pool = mysql.createPool(baseConfig);