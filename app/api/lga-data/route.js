//this is for fetching data to display for the interactive lga map
import { NextResponse } from 'next/server';
import { getLgaDataForState } from '../../(common)/lib/queries';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');

    // Basic validation to ensure a state parameter is provided
    if (!state) {
      return NextResponse.json({ error: 'State parameter is required.' }, { status: 400 });
    }

    // Use the new function to fetch data from the database
    const lgaData = await getLgaDataForState(state);

    // Return the fetched data as a JSON response
    return NextResponse.json(lgaData, { status: 200 });

  } catch (err) {
    console.error('Error fetching LGA data:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}