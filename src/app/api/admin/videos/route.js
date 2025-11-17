import { NextResponse } from 'next/server';
import { verifyAdmin } from '../../../../middleware/auth';
import { uploadVideo } from '../../../../lib/cloudinary';
import connectDB from '../../../../lib/mongodb';
import Video from '../../../../models/Video';

export async function POST(request) {
  try {
    const authResult = await verifyAdmin(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('video');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');
    const premium_required = formData.get('premium_required') === 'true';

    if (!file || !title || !category) {
      return NextResponse.json(
        { error: 'Video file, title and category required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await uploadVideo(buffer, 'exercise-videos');

    // Save to database
    await connectDB();
    const video = new Video({
      title,
      url: uploadResult.secure_url,
      thumbnail_url: uploadResult.eager?.[0]?.secure_url || uploadResult.secure_url,
      category,
      description: description || '',
      duration_seconds: uploadResult.duration || 0,
      premium_required
    });

    await video.save();

    return NextResponse.json({
      success: true,
      video
    });

  } catch (error) {
    console.error('Video upload error:', error);
    return NextResponse.json(
      { error: 'Video upload failed' },
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
    
    const videos = await Video.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      videos
    });

  } catch (error) {
    console.error('Get videos error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}