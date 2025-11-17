import axios from 'axios';

const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export async function searchFood(foodName) {
  try {
    const response = await axios.post(`${USDA_BASE_URL}/foods/search?api_key=${process.env.USDA_API_KEY}`, {
      query: foodName,
      dataType: ['Foundation', 'SR Legacy'],
      pageSize: 5
    });

    return response.data.foods[0] || null;
  } catch (error) {
    console.error('USDA API error:', error);
    return null;
  }
}

export async function getNutritionData(foods) {
  const nutritionData = {
    totalCalories: 0,
    totalSodium: 0,
    totalCarbs: 0,
    totalSugar: 0,
    totalFat: 0,
    totalProtein: 0,
    foods: []
  };

  for (const foodName of foods) {
    const foodData = await searchFood(foodName);
    
    if (foodData && foodData.foodNutrients) {
      const nutrients = {};
      
      foodData.foodNutrients.forEach(nutrient => {
        const name = nutrient.nutrientName?.toLowerCase();
        const value = nutrient.value || 0;
        
        if (name?.includes('energy') || name?.includes('calorie')) {
          nutrients.calories = value;
          nutritionData.totalCalories += value;
        } else if (name?.includes('sodium')) {
          nutrients.sodium = value;
          nutritionData.totalSodium += value;
        } else if (name?.includes('carbohydrate')) {
          nutrients.carbs = value;
          nutritionData.totalCarbs += value;
        } else if (name?.includes('sugar')) {
          nutrients.sugar = value;
          nutritionData.totalSugar += value;
        } else if (name?.includes('fat')) {
          nutrients.fat = value;
          nutritionData.totalFat += value;
        } else if (name?.includes('protein')) {
          nutrients.protein = value;
          nutritionData.totalProtein += value;
        }
      });

      nutritionData.foods.push({
        name: foodName,
        nutrients
      });
    } else {
      // Fallback nutrition data for common Indian foods
      const fallbackNutrition = getFallbackNutrition(foodName);
      nutritionData.foods.push({
        name: foodName,
        nutrients: fallbackNutrition
      });
      
      nutritionData.totalCalories += fallbackNutrition.calories || 0;
      nutritionData.totalSodium += fallbackNutrition.sodium || 0;
      nutritionData.totalCarbs += fallbackNutrition.carbs || 0;
      nutritionData.totalSugar += fallbackNutrition.sugar || 0;
      nutritionData.totalFat += fallbackNutrition.fat || 0;
      nutritionData.totalProtein += fallbackNutrition.protein || 0;
    }
  }

  return nutritionData;
}

function getFallbackNutrition(foodName) {
  const fallbackData = {
    'rice': { calories: 130, sodium: 1, carbs: 28, sugar: 0, fat: 0.3, protein: 2.7 },
    'chapati': { calories: 104, sodium: 119, carbs: 18, sugar: 0, fat: 3.7, protein: 3.1 },
    'dal': { calories: 116, sodium: 5, carbs: 20, sugar: 2, fat: 0.4, protein: 9 },
    'curry': { calories: 150, sodium: 400, carbs: 12, sugar: 5, fat: 8, protein: 6 },
    'vegetable': { calories: 50, sodium: 200, carbs: 10, sugar: 4, fat: 2, protein: 2 }
  };

  const lowerFood = foodName.toLowerCase();
  for (const [key, value] of Object.entries(fallbackData)) {
    if (lowerFood.includes(key)) {
      return value;
    }
  }

  return { calories: 100, sodium: 200, carbs: 15, sugar: 3, fat: 3, protein: 3 };
}