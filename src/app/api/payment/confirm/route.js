import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../middleware/auth';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request) {
  try {
    const authResult = await verifyToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { user } = authResult;
    const { payment_confirmed } = await request.json();

    if (!payment_confirmed) {
      return NextResponse.json(
        { error: 'Payment confirmation required' },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Update user to premium
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        subscription_status: 'premium',
        premium_timestamp: new Date()
      },
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      message: 'Premium subscription activated!',
      user: updatedUser
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Payment confirmation failed' },
      { status: 500 }
    );
  }
}