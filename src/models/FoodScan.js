import mongoose from 'mongoose';

const FoodScanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  foods: [{
    type: String
  }],
  nutrition_summary: {
    totalCalories: Number,
    totalSodium: Number,
    totalCarbs: Number,
    totalSugar: Number,
    totalFat: Number,
    totalProtein: Number,
    foods: [{
      name: String,
      nutrients: {
        calories: Number,
        sodium: Number,
        carbs: Number,
        sugar: Number,
        fat: Number,
        protein: Number
      }
    }]
  },
  bloating_score: {
    type: Number,
    min: 0,
    max: 10
  },
  bloating_analysis: {
    explanation: String,
    tips: [String]
  }
}, {
  timestamps: true
});

export default mongoose.models.FoodScan || mongoose.model('FoodScan', FoodScanSchema);