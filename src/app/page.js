import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 hero-bg overflow-hidden pt-24">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-pink/20 rounded-full blur-xl floating-element"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-neon-cyan/20 rounded-full blur-xl floating-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary/20 rounded-full blur-xl floating-element" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-card mx-4 mt-4 rounded-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-pink to-primary rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold">✨</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">WellnessAI</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-white/80 hover:text-neon-cyan transition-colors font-medium">
                Login
              </Link>
              <Link href="/signup" className="btn-neon">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="slide-up">
            <h2 className="text-7xl font-black mb-8 leading-tight">
              <span className="gradient-text">AI-Powered</span><br/>
              <span className="text-white">Wellness Revolution</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover your glow-up journey with AI face analysis & food scanning. 
              Get that main character energy with personalized wellness insights ✨
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/signup" className="btn-primary text-xl group">
                Start Your Glow Up
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/premium" className="btn-secondary text-xl">
                Go Premium ₹5 💎
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-5xl font-bold text-center mb-16 gradient-text">Vibe Check Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 floating-element">📸</div>
              <h4 className="text-2xl font-bold mb-4 text-neon-pink">Face Glow Analysis</h4>
              <p className="text-white/70 leading-relaxed">
                AI checks your facial bloating, jawline definition & overall glow factor. No cap! 💯
              </p>
            </div>
            <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 floating-element" style={{animationDelay: '1s'}}>🍽️</div>
              <h4 className="text-2xl font-bold mb-4 text-neon-cyan">Food Scanner Pro</h4>
              <p className="text-white/70 leading-relaxed">
                Scan your meals & get the tea on nutrition. Know what's helping or hurting your glow ☕
              </p>
            </div>
            <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 floating-element" style={{animationDelay: '2s'}}>💪</div>
              <h4 className="text-2xl font-bold mb-4 text-accent">Face Fitness Routines</h4>
              <p className="text-white/70 leading-relaxed">
                Custom face yoga & massage routines. Level up your skincare game with AI guidance 🧘‍♀️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-5xl font-bold mb-16 gradient-text">Choose Your Vibe</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🆓</div>
              <h4 className="text-3xl font-bold mb-4 text-white">Free Tier</h4>
              <p className="text-5xl font-black text-neon-cyan mb-6">₹0</p>
              <ul className="text-left space-y-3 mb-8 text-white/80">
                <li className="flex items-center"><span className="text-neon-green mr-3">✓</span> Basic face analysis</li>
                <li className="flex items-center"><span className="text-neon-green mr-3">✓</span> Food scanning</li>
                <li className="flex items-center"><span className="text-neon-green mr-3">✓</span> Basic routines</li>
                <li className="flex items-center"><span className="text-neon-green mr-3">✓</span> Progress tracking</li>
              </ul>
              <Link href="/signup" className="btn-secondary w-full">
                Start Free
              </Link>
            </div>
            <div className="neon-card border-2 border-neon-pink glow-effect hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">💎</div>
              <h4 className="text-3xl font-bold mb-4 text-neon-pink">Premium Glow</h4>
              <p className="text-5xl font-black text-neon-pink mb-6">₹5</p>
              <ul className="text-left space-y-3 mb-8 text-white/80">
                <li className="flex items-center"><span className="text-neon-pink mr-3">✓</span> Advanced AI analysis</li>
                <li className="flex items-center"><span className="text-neon-pink mr-3">✓</span> Detailed nutrition insights</li>
                <li className="flex items-center"><span className="text-neon-pink mr-3">✓</span> Premium routines</li>
                <li className="flex items-center"><span className="text-neon-pink mr-3">✓</span> Detailed analytics</li>
                <li className="flex items-center"><span className="text-neon-pink mr-3">✓</span> Exclusive video content</li>
              </ul>
              <Link href="/buy" className="btn-primary w-full">
                Upgrade Now ✨
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 glass-card mx-4 mb-4 rounded-3xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-pink to-primary rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">✨</span>
                </div>
                <h5 className="text-xl font-bold gradient-text">WellnessAI</h5>
              </div>
              <p className="text-white/60">
                Your AI bestie for wellness & glow-ups 💅
              </p>
            </div>
            <div>
              <h6 className="font-bold mb-4 text-neon-cyan">Features</h6>
              <ul className="space-y-2 text-white/60">
                <li>Face Analysis</li>
                <li>Food Scanning</li>
                <li>Wellness Routines</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4 text-neon-pink">Support</h6>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/terms" className="hover:text-neon-pink transition-colors">Terms</Link></li>
                <li><Link href="/policy" className="hover:text-neon-pink transition-colors">Privacy</Link></li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4 text-accent">Account</h6>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/login" className="hover:text-accent transition-colors">Login</Link></li>
                <li><Link href="/signup" className="hover:text-accent transition-colors">Sign Up</Link></li>
                <li><Link href="/premium" className="hover:text-accent transition-colors">Premium</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/40">
            <p>&copy; 2024 WellnessAI. Built different. No cap. 💯</p>
          </div>
        </div>
      </footer>
    </div>
  );
}