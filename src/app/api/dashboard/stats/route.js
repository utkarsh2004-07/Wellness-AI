import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import FaceScan from '../../../../models/FaceScan';
import FoodScan from '../../../../models/FoodScan';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    const userId = decoded.userId;

    await connectDB();

    // Get face scans count
    const faceScansCount = await FaceScan.countDocuments({ user_id: userId });
    
    // Get food scans count
    const foodScansCount = await FoodScan.countDocuments({ user_id: userId });
    
    // Get average bloating score from face scans
    const faceScans = await FaceScan.find({ user_id: userId }).select('analysis.bloating_score');
    const avgBloatingScore = faceScans.length > 0 
      ? (faceScans.reduce((sum, scan) => sum + (scan.analysis?.bloating_score || 0), 0) / faceScans.length).toFixed(1)
      : 0;

    const stats = {
      faceScans: faceScansCount,
      foodScans: foodScansCount,
      avgBloatingScore: avgBloatingScore
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}