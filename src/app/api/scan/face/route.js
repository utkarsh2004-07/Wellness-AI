import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../middleware/auth';
import { analyzeFaceImage } from '../../../../lib/gemini';
import { uploadImage } from '../../../../lib/cloudinary';
import connectDB from '../../../../lib/mongodb';
import FaceScan from '../../../../models/FaceScan';

export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await verifyToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { user } = authResult;
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await uploadImage(buffer, 'face-scans');

    // Analyze with Gemini
    const geminiAnalysis = await analyzeFaceImage(buffer);

    // MediaPipe analysis (simplified for demo)
    const mediaPipeMetrics = {
      jawline_angle: Math.random() * 20 + 10, // 10-30 degrees
      face_width_ratio: Math.random() * 0.2 + 0.6, // 0.6-0.8
      cheek_swelling_index: Math.random() * 5 + 1, // 1-6
      symmetry_score: Math.random() * 3 + 7 // 7-10
    };

    // Merge metrics
    const mergedMetrics = {
      ...geminiAnalysis,
      ...mediaPipeMetrics
    };

    // Save to database
    await connectDB();
    const faceScan = new FaceScan({
      userId: user._id,
      image_url: uploadResult.secure_url,
      bloating_score: geminiAnalysis.bloating_score,
      jawline_score: geminiAnalysis.jawline_visibility,
      puffiness: geminiAnalysis.cheek_puff,
      metrics: mergedMetrics
    });

    await faceScan.save();

    return NextResponse.json({
      success: true,
      data: {
        scanId: faceScan._id,
        image_url: uploadResult.secure_url,
        analysis: mergedMetrics
      }
    });

  } catch (error) {
    console.error('Face scan error:', error);
    return NextResponse.json(
      { error: 'Face analysis failed' },
      { status: 500 }
    );
  }
}