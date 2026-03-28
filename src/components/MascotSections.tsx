import React from 'react';
import { motion } from 'motion/react';

export const FloatingMascot: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        y: [0, -20, 0],
      }}
      transition={{ 
        x: { duration: 0.8, delay: 1 },
        opacity: { duration: 0.8, delay: 1 },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden xl:block pointer-events-none"
    >
      <div className="relative group pointer-events-auto cursor-help">
        {/* Speech Bubble */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute -top-12 left-12 bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-toy-teal whitespace-nowrap"
        >
          <p className="text-sm font-bold text-toy-teal">Hi there! 👋</p>
          <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-r-2 border-b-2 border-toy-teal rotate-45" />
        </motion.div>

        {/* Mascot Image - Using a high-quality 3D character style placeholder */}
        <img 
          src="https://images.unsplash.com/photo-1620336655055-088d06e7660c?auto=format&fit=crop&q=80&w=400" 
          alt="Mascot" 
          className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-2xl"
          referrerPolicy="no-referrer"
        />
        
        {/* Decorative Sparkles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 text-toy-yellow"
        >
          ✨
        </motion.div>
      </div>
    </motion.div>
  );
};

export const AdventureSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-toy-yellow/20 to-toy-pink/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[60px] p-8 md:p-16 shadow-2xl relative overflow-hidden border-8 border-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4FD1D9 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Side: Character Image */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-toy-pink/20 rounded-full blur-3xl" />
                <motion.img
                  animate={{ rotate: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800"
                  alt="Adventure Kid"
                  className="w-full h-full object-cover rounded-[40px] shadow-2xl border-4 border-white transform -rotate-3"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-toy-teal text-white p-6 rounded-3xl shadow-xl font-bold text-center rotate-12"
                >
                  <p className="text-xs uppercase tracking-widest">New</p>
                  <p className="text-2xl">Arrivals</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side: Content */}
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="font-display text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                Let the <span className="text-toy-pink">Adventure</span> Begin!
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed">
                Discover a world where imagination knows no bounds. Our hand-picked collection of toys is designed to inspire, educate, and bring endless joy to every child.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="bg-toy-teal hover:bg-toy-teal/90 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
                  Explore Collection
                </button>
                <button className="bg-white border-4 border-toy-yellow text-slate-900 font-bold px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
                  Watch Video
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-60">
                <div className="text-center">
                  <p className="font-bold text-2xl">50k+</p>
                  <p className="text-xs uppercase font-bold">Happy Kids</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-center">
                  <p className="font-bold text-2xl">100%</p>
                  <p className="text-xs uppercase font-bold">Safe Toys</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NewsletterSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-t from-toy-teal/10 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative bg-toy-teal rounded-[50px] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          {/* Character Peeking from Left */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="md:w-1/3 relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1513159419869-1133c33dfa22?auto=format&fit=crop&q=80&w=400" 
                alt="Happy Kid" 
                className="w-full h-auto relative z-10 drop-shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="md:w-2/3 text-center md:text-left space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white">
              Join the <span className="text-toy-yellow underline decoration-wavy underline-offset-8">ToyWonder Club!</span>
            </h2>
            <p className="text-xl text-white/90 font-medium">
              Get exclusive deals, early access to new arrivals, and magical surprises delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-2 border-white/30 rounded-2xl px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-4 focus:ring-toy-yellow/50 w-full backdrop-blur-sm"
              />
              <button className="bg-toy-yellow hover:bg-toy-yellow/90 text-slate-900 font-bold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                Sign Me Up!
              </button>
            </div>
            <p className="text-sm text-white/60">
              * We promise not to spam. Only magic and fun!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
