/// this post data from investments form to db
import { pool } from '../../(common)/lib/db';

export async function POST(req) {
  try {
    const data = await req.json();

    // Map your form data keys to the database column names if needed.
    // This is a good practice to centralize the mapping.
    const formKeys = {
      fullName: 'full_name',
      phone: 'phone',
      email: 'email',
      identity: 'identity',
      organizationName: 'organisation',
      organizationType: 'organisation_type',
      state: 'state',
      lga: 'lga',
      customSector: 'sector_of_interest',
      capacity: 'investment_capacity',
      timeframe: 'time_frame',
      investmentMode: 'mode_of_investment',
      experience: 'previous_experience',
      contactMethod: 'contact_method',
      message: 'message',
      receiveUpdates: 'receive_updates', // Added the new field
    };

    // The core required fields that are always mandatory.
    const requiredFields = [
      'fullName', 'phone', 'email', 'identity', 'state', 'lga', 'customSector', 'timeframe', 'capacity', 'investmentMode', 'contactMethod'
    ];

    const errors = {};

    // Check for core required fields
    for (const field of requiredFields) {
      if (!data[field]) {
        errors[field] = `${field} is required.`;
      }
    }

    // Validate specific formats
    if (data.phone && !/^\d{7,15}$/.test(data.phone)) {
      errors.phone = 'Invalid phone number format.';
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format.';
    }

    // Conditional validation for 'Representative' identity
    // You check for 'Representative' in your form, so let's match that.
    if (data.identity === 'Representative') {
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

    // Now, prepare the data for the SQL query.
    // Ensure all fields, including optional ones, are accounted for.
    const finalData = {
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      identity: data.identity,
      // Conditional values, defaulting to an empty string if not applicable.
      organisation: data.identity === 'Representative' ? data.organizationName : '',
      organisation_type: data.identity === 'Representative' ? data.organizationType : '',
      state: data.state,
      lga: data.lga,
      sector_of_interest: data.customSector,
      investment_capacity: data.capacity,
      time_frame: data.timeframe,
      mode_of_investment: data.investmentMode,
      previous_experience: data.experience || '', // Optional field
      contact_method: data.contactMethod,
      message: data.message || '', // Optional field
      receive_updates: data.receiveUpdates || false, // Added receiveUpdates
    };

    // Corrected SQL query with 16 columns and 16 placeholders
    await pool.execute(
      `INSERT INTO investment_submissions (full_name, phone, email, identity, organisation, organisation_type, state, lga, sector_of_interest, investment_capacity, time_frame, mode_of_investment, previous_experience, contact_method, message, receive_updates)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      Object.values(finalData)
    );
    
    // Optional: Fetch the ID if your DB supports it, otherwise it's just a success response.
    // const [rows] = await pool.execute(...);
    // const id = rows.insertId;

    return new Response(JSON.stringify({ success: true /*, id: id*/ }), { status: 200 });

  } catch (err) {
    console.error(err);
    // You can check err.code for specific database errors, e.g., duplicate entry.
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
