import { NextResponse } from 'next/server';
import { verifyAdmin } from '../../../../middleware/auth';
import connectDB from '../../../../lib/mongodb';
import Routine from '../../../../models/Routine';

export async function POST(request) {
  try {
    const authResult = await verifyAdmin(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const routineData = await request.json();

    await connectDB();
    const routine = new Routine(routineData);
    await routine.save();

    return NextResponse.json({
      success: true,
      routine
    });

  } catch (error) {
    console.error('Create routine error:', error);
    return NextResponse.json(
      { error: 'Failed to create routine' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const authResult = await verifyAdmin(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    await connectDB();
    
    const routines = await Routine.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      routines
    });

  } catch (error) {
    console.error('Get routines error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch routines' },
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

    const { routineId, ...updateData } = await request.json();

    await connectDB();
    
    const routine = await Routine.findByIdAndUpdate(
      routineId,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      routine
    });

  } catch (error) {
    console.error('Update routine error:', error);
    return NextResponse.json(
      { error: 'Failed to update routine' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const authResult = await verifyAdmin(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { routineId } = await request.json();

    await connectDB();
    
    await Routine.findByIdAndDelete(routineId);

    return NextResponse.json({
      success: true,
      message: 'Routine deleted successfully'
    });

  } catch (error) {
    console.error('Delete routine error:', error);
    return NextResponse.json(
      { error: 'Failed to delete routine' },
      { status: 500 }
    );
  }
}