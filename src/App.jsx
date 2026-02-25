import { useState } from 'react';
import { Sparkles, Zap, Eye, BookOpen, ArrowRight, Check } from 'lucide-react';
import logoImage from './assets/logo.png';

import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    if (supabase) {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        console.error('Error inserting into waitlist:', error);
        if (error.code === '23505') { // Postgres unique violation code
          setError('This email is already on the waitlist!');
        } else {
          setError('Failed to join the waitlist. Please try again.');
        }
        setLoading(false);
        return;
      }
    } else {
      console.log('Submitted (Simulation):', email);
    }

    setSubmitted(true);
    setLoading(false);
    setEmail('');
  };

  const features = [
    "ADHD Friendly", "Custom WPM", "EPUB Support", "Dark Mode", "Dyslexia Fonts",
    "Progress Tracking", "Hyper-Focus", "One Word at a Time"
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#39ff14] selection:text-black flex flex-col items-center overflow-x-hidden">

      {/* Navigation */}
      <nav className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="FocusReader Logo" className="h-8 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tight">FocusReader</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full flex flex-col items-center justify-center text-center px-4 pt-16 pb-24 relative z-10">

        {/* Background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39ff14]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 text-gray-300">
          <Sparkles className="h-4 w-4 text-[#39ff14]" />
          <span>The future of reading is here.</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
          Read faster. Focus deeper. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">One word at a time.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl text-balance">
          Rewire your attention span with hyper-focused reading formats used in viral videos, now available for your favorite books.
        </p>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto mb-16">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39ff14]/50 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#39ff14] hover:bg-[#32e012] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] font-medium">
              <Check className="h-5 w-5 flex-shrink-0" />
              <span>You're on the list! We'll be in touch.</span>
            </div>
          )}
          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
          )}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Join 2,400+ early readers. Lock in your founder's discount.
          </p>
        </div>

        {/* Mockup Images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-8 px-4">
          {[
            { num: 1, src: '/left.png' },
            { num: 2, src: '/middle.png' },
            { num: 3, src: '/right.png' }
          ].map((item) => (
            <div key={item.num} className="relative rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <img
                src={item.src}
                alt={`FocusReader App Mockup ${item.num}`}
                className="w-full h-auto object-cover opacity-90"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Marquee Section */}
      <div className="w-full overflow-hidden py-10 border-y border-white/5 bg-[#09090b] relative z-10 flex text-gray-400">
        <div className="flex animate-marquee gap-8 pr-8 min-w-max">
          {[...features, ...features, ...features].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-sm md:text-base font-medium px-4 py-2 rounded-full border border-white/5 bg-white/5 whitespace-nowrap">
              {i % 3 === 0 ? <Eye className="h-4 w-4" /> : i % 2 === 0 ? <BookOpen className="h-4 w-4" /> : <Zap className="h-4 w-4 text-[#39ff14]" />}
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <section id="how-it-works" className="w-full max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Rewire your reading habits in three simple steps.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center pt-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39ff14]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#39ff14]/10 text-[#39ff14] flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.15)]">1</div>
            <h3 className="text-xl font-bold mb-3">Upload your book</h3>
            <p className="text-gray-400">Import any EPUB, PDF, or TXT file instantly into your secure personal library.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39ff14]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#39ff14]/10 text-[#39ff14] flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.15)]">2</div>
            <h3 className="text-xl font-bold mb-3">Set your pace</h3>
            <p className="text-gray-400">Choose your targeted Words Per Minute (WPM) and adjust the display settings to your liking.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39ff14]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#39ff14]/10 text-[#39ff14] flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.15)]">3</div>
            <h3 className="text-xl font-bold mb-3">Hyper-focus</h3>
            <p className="text-gray-400">Read one word at a time, eliminating distractions and drastically improving your reading speed.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-24 bg-[#09090b] relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Features built for focus</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Designed specifically for modern attention spans and neurodivergent readers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><Zap className="h-6 w-6 text-[#39ff14]" /></div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">RSVP Reading Mode</h3>
                <p className="text-gray-400 leading-relaxed">Rapid Serial Visual Presentation mode flashes words rapidly in the center of your screen, reducing eye movement and increasing speed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><Eye className="h-6 w-6 text-[#39ff14]" /></div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Guided Highlight Mode</h3>
                <p className="text-gray-400 leading-relaxed">Prefer seeing the whole page? We highlight each word sequentially at your exact WPM to keep your eyes moving forward.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><BookOpen className="h-6 w-6 text-[#39ff14]" /></div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Accessibility First</h3>
                <p className="text-gray-400 leading-relaxed">Includes specialized fonts for Dyslexia, highly adjustable text sizing, and high-contrast dark modes for sensitive eyes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><Sparkles className="h-6 w-6 text-[#39ff14]" /></div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Progress Analytics</h3>
                <p className="text-gray-400 leading-relaxed">Track your reading streaks, watch your WPM speed improve over time, and gamify your reading habit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full text-center py-8 text-sm text-gray-600 relative z-10 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} FocusReader. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
