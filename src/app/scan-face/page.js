'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function FaceScanPage() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

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
      const response = await fetch('/api/scan/face', {
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
        setError(data.error || 'Face analysis failed');
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
          <p className="text-white/70 mb-8">Please login to scan your face</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 hero-bg pt-24">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-20 h-20 bg-neon-pink/20 rounded-full blur-xl floating-element"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 bg-neon-cyan/20 rounded-full blur-xl floating-element" style={{animationDelay: '3s'}}></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12 slide-up">
          <h1 className="text-6xl font-black mb-6">
            <span className="gradient-text">Face Glow</span>
            <span className="text-white"> Check ✨</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Upload your selfie & let AI spill the tea on your glow factor. 
            Get that main character energy with personalized insights! 📸💅
          </p>
        </div>

        {!result ? (
          <div className="glass-card max-w-3xl mx-auto">
            <div className="text-center">
              {!preview ? (
                <div 
                  className="border-2 border-dashed border-neon-pink/50 rounded-3xl p-16 cursor-pointer hover:border-neon-pink hover:bg-neon-pink/5 transition-all duration-300 group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-8xl mb-6 floating-element group-hover:scale-110 transition-transform">📸</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Drop Your Selfie Here
                  </h3>
                  <p className="text-white/70 mb-8 text-lg">
                    Click to upload or drag & drop your glow-up pic 💫
                  </p>
                  <div className="btn-neon inline-block text-lg">
                    Choose Your Pic ✨
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
                        'Analyze My Glow ✨'
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
                    <span className="text-lg font-medium">AI is checking your vibe... This might take a sec! 🔮</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 slide-up">
            <div className="glass-card">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="relative group">
                    <img 
                      src={preview} 
                      alt="Analyzed face" 
                      className="w-full rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <h2 className="text-4xl font-bold mb-8 gradient-text">Your Glow Report 📊</h2>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                      <div className="text-4xl font-black text-neon-pink mb-2">
                        {result.analysis.bloating_score}/10
                      </div>
                      <div className="text-white/70 font-medium">Bloating Level</div>
                      <div className="text-xs text-neon-pink mt-1">Lower is better! 💫</div>
                    </div>
                    
                    <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                      <div className="text-4xl font-black text-neon-cyan mb-2">
                        {result.analysis.jawline_visibility}/10
                      </div>
                      <div className="text-white/70 font-medium">Jawline Sharp</div>
                      <div className="text-xs text-neon-cyan mt-1">Slay queen! 👑</div>
                    </div>
                    
                    <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                      <div className="text-4xl font-black text-accent mb-2">
                        {result.analysis.cheek_puff}/10
                      </div>
                      <div className="text-white/70 font-medium">Cheek Puff</div>
                      <div className="text-xs text-accent mt-1">Natural glow! ✨</div>
                    </div>
                    
                    <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
                      <div className="text-4xl font-black text-primary mb-2">
                        {result.analysis.symmetry_score?.toFixed(1)}/10
                      </div>
                      <div className="text-white/70 font-medium">Face Symmetry</div>
                      <div className="text-xs text-primary mt-1">Balanced beauty! 🎯</div>
                    </div>
                  </div>

                  {result.analysis.notes && (
                    <div className="neon-card">
                      <h3 className="text-xl font-bold mb-3 text-neon-pink">AI's Hot Take 🔥</h3>
                      <p className="text-white/80 leading-relaxed">{result.analysis.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {result.analysis.recommendations && (
              <div className="glass-card">
                <h3 className="text-3xl font-bold mb-6 gradient-text">Your Glow-Up Plan 💅</h3>
                <div className="space-y-4">
                  {result.analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <span className="text-neon-pink text-xl mr-4 mt-1">✨</span>
                      <span className="text-white/90 leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <button onClick={resetScan} className="btn-primary text-xl">
                Scan Another Selfie 📸
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}