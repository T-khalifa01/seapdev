// app/api/subscribe-newsletter/route.js
import { pool } from '../../(common)/lib/db';

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, type } = data;

    // Server-side validation
    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    // Check for a valid type
    const validTypes = ['newsletter']; // You can add more types here
    if (!type || !validTypes.includes(type)) {
      return new Response(JSON.stringify({ error: 'Invalid subscription type' }), { status: 400 });
    }

    // Check if email already exists for this type
    const [existing] = await pool.execute('SELECT id FROM subscriptions WHERE email = ? AND type = ?', [email, type]);
    if (existing.length > 0) {
      return new Response(JSON.stringify({ error: 'You are already subscribed.' }), { status: 409 });
    }

    // Insert into the database
    await pool.execute(
      'INSERT INTO subscriptions (email, type) VALUES (?, ?)',
      [email, type]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Subscription error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

// CREATE TABLE subscriptions (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) NOT NULL,
//     type VARCHAR(50) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE KEY unique_email_type (email, type)
// );