import { NextResponse } from 'next/server';
import { pool } from '../../(common)/lib/db';

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();

    // Use Promise.all to run all count queries in parallel for efficiency
    const [lgaResult] = await connection.query("SELECT COUNT(*) as count FROM google_form_responses");
    const [investmentResult] = await connection.query("SELECT COUNT(*) as count FROM investment_submissions");
    const [contactResult] = await connection.query("SELECT COUNT(*) as count FROM contact_submissions");
    const [subscriptionsResult] = await connection.query("SELECT COUNT(*) as count FROM subscriptions");
    
    // Extract the counts from the results
    const lgaCount = lgaResult[0].count;
    const investmentCount = investmentResult[0].count;
    const contactCount = contactResult[0].count;
    const subscriptionsCount = subscriptionsResult[0].count;

    return NextResponse.json({
      lgaCount,
      investmentCount,
      contactCount,
      subscriptionsCount,
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch counts:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}