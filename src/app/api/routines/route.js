import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Routine from '../../../models/Routine';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    jwt.verify(token, process.env.NEXTAUTH_SECRET);

    await connectDB();

    const routines = await Routine.find({}).sort({ created_at: -1 });

    return NextResponse.json({ success: true, routines });
  } catch (error) {
    console.error('Routines fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch routines' }, { status: 500 });
  }
}