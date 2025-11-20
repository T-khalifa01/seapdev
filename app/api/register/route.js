// import { NextResponse } from 'next/server';
// import { pool } from '../../(common)/lib/db';
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
//     }

//     // Hash the password securely
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     let connection;
//     try {
//       connection = await pool.getConnection();

//       // Check if a user with this email already exists
//       const [existingUser] = await connection.query("SELECT id FROM users WHERE email = ?", [email]);
//       if (existingUser.length > 0) {
//         return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
//       }

//       // Insert the new user into the database with a default role
//       await connection.query(
//         "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
//         [email, hashedPassword, ]
//       );

//       return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });
//     } catch (error) {
//       console.error("Database operation failed:", error);
//       return NextResponse.json({ message: 'Failed to register user.' }, { status: 500 });
//     } finally {
//       if (connection) {
//         connection.release();
//       }
//     }
//   } catch (error) {
//     console.error("Registration request failed:", error);
//     return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
//   }
// }

import { NextResponse } from 'next/server';
import { pool } from '../../(common)/lib/db';
import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     // 1. Correctly extract the role from the request body
//     const { email, password, role } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
//     }

//     // A safety check: if the role is not provided in the request, default it to 'viewer'.
//     const userRole = role || 'viewer';

//     // Hash the password securely
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     let connection;
//     try {
//       connection = await pool.getConnection();

//       // Check if a user with this email already exists
//       const [existingUser] = await connection.query("SELECT id FROM users WHERE email = ?", [email]);
//       if (existingUser.length > 0) {
//         return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
//       }

//       // 2. Use the 'userRole' variable instead of hardcoding 'viewer'
//       await connection.query(
//         "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
//         [email, hashedPassword, userRole]
//       );

//       return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });
//     } catch (error) {
//       console.error("Database operation failed:", error);
//       return NextResponse.json({ message: 'Failed to register user.' }, { status: 500 });
//     } finally {
//       if (connection) {
//         connection.release();
//       }
//     }
//   } catch (error) {
//     console.error("Registration request failed:", error);
//     return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
//   }
// }

export async function POST(request) {
  try {
    // 1. Correctly extract the name, email, password, and role from the request body
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
    }

    // A safety check: if the role is not provided in the request, default it to 'viewer'.
    const userRole = role || 'viewer';

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let connection;
    try {
      connection = await pool.getConnection();

      // Check if a user with this email already exists
      const [existingUser] = await connection.query("SELECT id FROM users WHERE email = ?", [email]);
      if (existingUser.length > 0) {
        return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
      }

      // 2. Insert the new user into the database, including the new 'name' field
      await connection.query(
        "INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, userRole, name]
      );

      return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });
    } catch (error) {
      console.error("Database operation failed:", error);
      return NextResponse.json({ message: 'Failed to register user.' }, { status: 500 });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (error) {
    console.error("Registration request failed:", error);
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }
}