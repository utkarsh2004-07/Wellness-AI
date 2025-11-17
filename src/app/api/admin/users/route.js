import { NextResponse } from 'next/server';
import { verifyAdmin } from '../../../../middleware/auth';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET(request) {
  try {
    const authResult = await verifyAdmin(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    await connectDB();
    
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const authResult = await verifyAdmin(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { userId, subscription_status } = await request.json();

    await connectDB();
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        subscription_status,
        premium_timestamp: subscription_status === 'premium' ? new Date() : null
      },
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}