// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../auth/[...nextauth]/route';
// import { pool } from '../../../(common)/lib/db';

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { is_active } = await request.json();
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   if (session.user.id === id) {
//     return NextResponse.json({ message: "Cannot disable your own account." }, { status: 400 });
//   }

//   let connection;
//   try {
//     connection = await pool.getConnection();
//     await connection.query("UPDATE users SET is_active = ? WHERE id = ?", [is_active, id]);
//     return NextResponse.json({ message: 'User status updated successfully' });
//   } catch (error) {
//     console.error("Database update failed:", error);
//     return NextResponse.json({ message: 'Failed to update user status' }, { status: 500 });
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// }


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { pool } from '../../../(common)/lib/db';

export async function PUT(request, { params }) {
  // 1. Extract parameters and payload
  const targetUserId = params.id; // User ID from the URL path
  const { is_active: newStatus } = await request.json(); // The status to set (0 or 1)
  
  // 2. Authentication and Authorization Check
  const session = await getServerSession({ req: request, ...authOptions });

  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Permission denied. Admin required.' }, { status: 403 });
  }

  // 3. CHECK A: Prevent the logged-in user from disabling their own account
  // This is required even if the database is down (it uses session data)
  // Compare IDs as strings to be safe, and only block if the action is to DISABLE (0)
  if (session.user.id.toString() === targetUserId.toString() && newStatus === 0) {
    return NextResponse.json({ message: "Operation failed: You cannot disable your own active account." }, { status: 403 });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    // 4. Fetch targeted user's current role/status
    const [targetUserResult] = await connection.query(
        "SELECT id, role, is_active FROM users WHERE id = ?",
        [targetUserId]
    );
    const targetUser = targetUserResult[0];

    if (!targetUser) {
        return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }
      
    // 5. CHECK B: Prevent disabling the last active Administrator
    // This check is required only if the target user is an Admin AND the request is to disable them.
    if (targetUser.role === 'admin' && newStatus === 0) {

      // Query the database to count all users who have the role 'admin' AND are 'is_active = 1'
      const [adminCountResult] = await connection.query(
        "SELECT COUNT(*) as count FROM users WHERE role = 'admin' AND is_active = 1"
      );
      const activeAdminCount = adminCountResult[0].count;

      // If the count is 1, disabling this user would leave 0.
      if (activeAdminCount <= 1) {
        return NextResponse.json({
          message: 'Operation failed: Cannot disable the only active Administrator.'
        }, { status: 403 });
      }
    }

    // 6. Perform the status update
    const [updateResult] = await connection.query(
      "UPDATE users SET is_active = ? WHERE id = ?",
      [newStatus, targetUserId]
    );

    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ message: 'No change made or user not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User status updated successfully' });

  } catch (error) {
    console.error("Database update failed:", error);
    return NextResponse.json({ message: 'Failed to update user status' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}