export function calculateBloatingScore(nutritionData, faceAnalysis) {
  let score = 0;
  const tips = [];
  
  // Nutrition-based scoring
  if (nutritionData.totalSodium > 1000) {
    score += 3;
    tips.push('Reduce sodium intake - high sodium causes water retention');
  } else if (nutritionData.totalSodium > 500) {
    score += 1;
    tips.push('Monitor sodium levels in your diet');
  }
  
  if (nutritionData.totalCarbs > 100) {
    score += 2;
    tips.push('High carb intake can cause bloating - try smaller portions');
  }
  
  if (nutritionData.totalSugar > 25) {
    score += 1;
    tips.push('Reduce sugar intake to minimize bloating');
  }
  
  // Check for fried/oily foods
  if (nutritionData.totalFat > 30) {
    score += 2;
    tips.push('Fried and oily foods can cause digestive bloating');
  }
  
  // Face analysis integration
  if (faceAnalysis) {
    const faceWeight = faceAnalysis.bloating_score * 0.4; // 40% weight to face analysis
    score += faceWeight;
    
    if (faceAnalysis.bloating_score > 6) {
      tips.push('Facial puffiness detected - try facial massage and hydration');
    }
    
    if (faceAnalysis.double_chin_level > 5) {
      tips.push('Consider jaw exercises to improve definition');
    }
  }
  
  // Normalize score to 0-10
  score = Math.min(Math.max(score, 0), 10);
  
  let explanation = '';
  if (score <= 3) {
    explanation = 'Low bloating risk - your diet looks balanced!';
  } else if (score <= 6) {
    explanation = 'Moderate bloating risk - some dietary adjustments recommended';
  } else {
    explanation = 'High bloating risk - consider significant dietary changes';
  }
  
  // Add general tips
  if (tips.length === 0) {
    tips.push('Stay hydrated and eat mindfully');
    tips.push('Include probiotics in your diet');
  }
  
  return {
    bloating_score_overall: Math.round(score * 10) / 10,
    explanation,
    tips: tips.slice(0, 3) // Limit to 3 tips
  };
}