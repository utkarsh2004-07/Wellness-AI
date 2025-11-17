import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../middleware/auth';
import { analyzeFoodImage } from '../../../../lib/gemini';
import { getNutritionData } from '../../../../lib/usda';
import { calculateBloatingScore } from '../../../../lib/bloating';
import { uploadImage } from '../../../../lib/cloudinary';
import connectDB from '../../../../lib/mongodb';
import FoodScan from '../../../../models/FoodScan';

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
    const uploadResult = await uploadImage(buffer, 'food-scans');

    // Analyze with Gemini
    const foodAnalysis = await analyzeFoodImage(buffer);
    
    if (!foodAnalysis.foods || foodAnalysis.foods.length === 0) {
      return NextResponse.json({ error: 'No food detected in image' }, { status: 400 });
    }

    // Get nutrition data from USDA
    const nutritionData = await getNutritionData(foodAnalysis.foods);

    // Calculate bloating score
    const bloatingAnalysis = calculateBloatingScore(nutritionData, null);

    // Save to database
    await connectDB();
    const foodScan = new FoodScan({
      userId: user._id,
      image_url: uploadResult.secure_url,
      foods: foodAnalysis.foods,
      nutrition_summary: nutritionData,
      bloating_score: bloatingAnalysis.bloating_score_overall,
      bloating_analysis: {
        explanation: bloatingAnalysis.explanation,
        tips: bloatingAnalysis.tips
      }
    });

    await foodScan.save();

    return NextResponse.json({
      success: true,
      data: {
        scanId: foodScan._id,
        image_url: uploadResult.secure_url,
        foods: foodAnalysis.foods,
        nutrition: nutritionData,
        bloating: bloatingAnalysis
      }
    });

  } catch (error) {
    console.error('Food scan error:', error);
    return NextResponse.json(
      { error: 'Food analysis failed' },
      { status: 500 }
    );
  }
}