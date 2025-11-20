import { pool } from '../../(common)/lib/db';

export async function POST(req) {
  try {
    const data = await req.json();

    // The validation object will hold the errors.
    const errors = {};

    // Validate required fields
    if (!data.name) errors.name = 'Full Name is required';
    if (!data.phone) errors.phone = 'Phone Number is required';
    if (!data.email) errors.email = 'Email is required';
    if (!data.message) errors.message = 'Message is required';

    // Validate formats
    if (data.phone && !/^\d{7,15}$/.test(data.phone)) {
      errors.phone = 'Invalid phone number format.';
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email address format.';
    }

    // Conditional validation for 'Organization' fields
    if (data.identity === 'Organization') {
      if (!data.organizationName) {
        errors.organizationName = 'Organization Name is required.';
      }
      if (!data.organizationType) {
        errors.organizationType = 'Organization Type is required.';
      }
    }

    // If any validation errors exist, return them.
    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ error: 'Validation failed', fields: errors }), { status: 400 });
    }

    // Prepare the data for the SQL query. Use snake_case for DB columns.
    const finalData = {
      full_name: data.name,
      phone: data.phone,
      email: data.email,
      identity: data.identity,
      organisation: data.identity === 'Organization' ? data.organizationName : '',
      organisation_type: data.identity === 'Organization' ? data.organizationType : '',
      message: data.message,
    };

    // Save to DB using the existing pool
    await pool.execute(
      `INSERT INTO contact_submissions (full_name, phone, email, identity, organisation, organisation_type, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      Object.values(finalData)
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}