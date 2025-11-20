import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { pool } from '../../(common)/lib/db';

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        const [users] = await connection.query("SELECT id, name, email, role, is_active FROM users ORDER BY name ASC");
        return NextResponse.json(users);
    } catch (error) {
        console.error("Database query failed:", error);
        return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}