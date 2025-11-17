'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function FoodScanPage() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setError('');
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/scan/food', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Food analysis failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 hero-bg flex items-center justify-center pt-24">
        <div className="glass-card text-center p-12">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-3xl font-bold mb-6 gradient-text">Login Required</h2>
          <p className="text-white/70 mb-8">Please login to scan your food</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 hero-bg pt-24">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent/20 rounded-full blur-xl floating-element"></div>
        <div className="absolute bottom-32 right-10 w-32 h-32 bg-neon-cyan/20 rounded-full blur-xl floating-element" style={{animationDelay: '2s'}}></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12 slide-up">
          <h1 className="text-6xl font-black mb-6">
            <span className="gradient-text">Food Scanner</span>
            <span className="text-white"> Pro 🍽️</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Snap your meal & get the nutrition tea! AI identifies your food & tells you what's helping or hurting your glow ✨
          </p>
        </div>

        {!result ? (
          <div className="glass-card max-w-3xl mx-auto">
            <div className="text-center">
              {!preview ? (
                <div 
                  className="border-2 border-dashed border-neon-cyan/50 rounded-3xl p-16 cursor-pointer hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all duration-300 group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-8xl mb-6 floating-element group-hover:scale-110 transition-transform">🍽️</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Drop Your Food Pic Here
                  </h3>
                  <p className="text-white/70 mb-8 text-lg">
                    Click to upload or drag & drop your meal photo 📸
                  </p>
                  <div className="btn-neon inline-block text-lg">
                    Choose Your Meal 🍴
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="relative group">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-w-full h-80 object-cover rounded-3xl mx-auto shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex justify-center space-x-6">
                    <button onClick={resetScan} className="btn-secondary">
                      Change Pic 🔄
                    </button>
                    <button 
                      onClick={handleScan}
                      disabled={loading}
                      className="btn-primary relative overflow-hidden"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          AI is analyzing... 🤖
                        </span>
                      ) : (
                        'Analyze My Food ✨'
                      )}
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {error && (
              <div className="mt-6 bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-4 rounded-2xl backdrop-blur-sm">
                <span className="font-medium">Oops! </span>{error}
              </div>
            )}

            {loading && (
              <div className="mt-8 text-center">
                <div className="glass-card inline-block px-8 py-4">
                  <div className="flex items-center text-white">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-neon-cyan border-t-transparent mr-4"></div>
                    <span className="text-lg font-medium">AI is checking your meal... This might take a sec! 🔍</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 slide-up">
            {/* Detected Foods */}
            <div className="glass-card">
              <h2 className="text-4xl font-bold mb-8 gradient-text">What's On Your Plate? 🍽️</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {result.foods.map((food, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-to-r from-neon-cyan/20 to-primary/20 border border-neon-cyan/50 text-neon-cyan px-4 py-2 rounded-2xl text-sm font-bold backdrop-blur-sm hover:scale-105 transition-transform"
                  >
                    {food} 🍴
                  </span>
                ))}
              </div>
              <div className="relative group">
                <img 
                  src={preview} 
                  alt="Analyzed food" 
                  className="w-full max-w-md rounded-3xl mx-auto shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              </div>
            </div>

            {/* Nutrition Summary */}
            <div className="glass-card">
              <h2 className="text-4xl font-bold mb-8 gradient-text">Nutrition Breakdown 📊</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-primary mb-2">
                    {Math.round(result.nutrition.totalCalories)}
                  </div>
                  <div className="text-white/70 font-medium">Calories</div>
                  <div className="text-xs text-primary mt-1">Energy fuel! ⚡</div>
                </div>
                
                <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-red-400 mb-2">
                    {Math.round(result.nutrition.totalSodium)}mg
                  </div>
                  <div className="text-white/70 font-medium">Sodium</div>
                  <div className="text-xs text-red-400 mt-1">Watch out! 🧒</div>
                </div>
                
                <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-yellow-400 mb-2">
                    {Math.round(result.nutrition.totalCarbs)}g
                  </div>
                  <div className="text-white/70 font-medium">Carbs</div>
                  <div className="text-xs text-yellow-400 mt-1">Quick energy! 🍞</div>
                </div>
                
                <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-neon-pink mb-2">
                    {Math.round(result.nutrition.totalSugar)}g
                  </div>
                  <div className="text-white/70 font-medium">Sugar</div>
                  <div className="text-xs text-neon-pink mt-1">Sweet treat! 🍭</div>
                </div>
                
                <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-orange-400 mb-2">
                    {Math.round(result.nutrition.totalFat)}g
                  </div>
                  <div className="text-white/70 font-medium">Fat</div>
                  <div className="text-xs text-orange-400 mt-1">Good fats! 🥑</div>
                </div>
                
                <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-neon-green mb-2">
                    {Math.round(result.nutrition.totalProtein)}g
                  </div>
                  <div className="text-white/70 font-medium">Protein</div>
                  <div className="text-xs text-neon-green mt-1">Muscle fuel! 💪</div>
                </div>
              </div>
            </div>

            {/* Bloating Analysis */}
            <div className="glass-card">
              <h2 className="text-4xl font-bold mb-8 gradient-text">Bloating Check 🤰</h2>
              <div className="flex items-center mb-8">
                <div className="neon-card text-center mr-6">
                  <div className="text-5xl font-black text-neon-pink mb-2">
                    {result.bloating.bloating_score_overall}/10
                  </div>
                  <div className="text-white/70 font-medium">Bloating Risk</div>
                  <div className="text-xs text-neon-pink mt-1">Lower is better! 🎯</div>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-white mb-2">AI's Take 🤖</div>
                  <div className="text-white/80 leading-relaxed">{result.bloating.explanation}</div>
                </div>
              </div>
              
              {result.bloating.tips && (
                <div className="neon-card">
                  <h3 className="text-xl font-bold mb-4 text-neon-cyan">Pro Tips for Your Glow ✨</h3>
                  <div className="space-y-3">
                    {result.bloating.tips.map((tip, index) => (
                      <div key={index} className="flex items-start p-3 bg-white/5 rounded-2xl border border-white/10">
                        <span className="text-neon-cyan text-lg mr-3 mt-1">✨</span>
                        <span className="text-white/90 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <button onClick={resetScan} className="btn-primary text-xl">
                Scan Another Meal 🍽️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}