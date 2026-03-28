import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Gift, Sparkles, ArrowRight, Percent } from 'lucide-react';

export const AdSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-toy-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-toy-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-12">
          
          {/* Main Editorial Ad */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-slate-900 rounded-[60px] min-h-[600px] overflow-hidden group flex flex-col lg:flex-row items-stretch"
          >
            {/* Content Side */}
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-toy-yellow mb-8"
              >
                <div className="h-px w-12 bg-toy-yellow" />
                <span className="uppercase tracking-[0.3em] font-black text-sm">Exclusive Offer</span>
              </motion.div>

              <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8">
                PLAY <br />
                <span className="text-toy-teal">BIGGER</span> <br />
                SAVE <span className="text-toy-pink">MORE</span>
              </h2>

              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-md mb-12 leading-relaxed">
                Unlock the ultimate summer fun with our curated collection of high-performance toys.
              </p>

              <div className="flex flex-wrap gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-toy-teal text-white font-black text-lg px-12 py-5 rounded-full shadow-2xl shadow-toy-teal/30 flex items-center gap-3 group"
                >
                  Shop Now
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
                
                <div className="flex flex-col justify-center">
                  <span className="text-toy-yellow font-black text-4xl leading-none">50%</span>
                  <span className="text-white/50 text-xs uppercase tracking-widest font-bold">Discount</span>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-slate-800/50 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20" 
                   style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              <motion.div
                animate={{ 
                  y: [0, -30, 0],
                  rotate: [0, 8, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-12"
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-toy-teal/20 blur-[100px] rounded-full" />
                  
                  <img 
                    src="https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800" 
                    alt="Premium Toy" 
                    className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-12 right-12 w-24 h-24 bg-toy-pink rounded-full flex items-center justify-center text-white font-black text-center leading-tight shadow-xl rotate-12"
              >
                NEW <br /> ARRIVAL
              </motion.div>
            </div>
          </motion.div>

          {/* Secondary Bento Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[48px] shadow-xl shadow-slate-200/50 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-16 h-16 bg-toy-teal/10 rounded-3xl flex items-center justify-center text-toy-teal mb-8 group-hover:scale-110 transition-transform">
                  <Rocket size={32} />
                </div>
                <h3 className="font-display text-3xl font-black text-slate-900 mb-4 leading-tight">Fast <br /> Delivery</h3>
                <p className="text-slate-500 font-medium">Free shipping on all orders over $50. Get it today!</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-toy-teal font-black uppercase tracking-widest text-xs">
                Learn More <ArrowRight size={14} />
              </div>
            </motion.div>

            {/* Card 2 - Featured Product */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-toy-pink p-10 rounded-[48px] shadow-xl shadow-toy-pink/20 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px]" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-white mb-8">
                  <Gift size={32} />
                </div>
                <h3 className="font-display text-3xl font-black text-white mb-4 leading-tight">Gift <br /> Wrapping</h3>
                <p className="text-white/80 font-medium">Make it special with our premium eco-friendly wrap.</p>
              </div>
              <div className="mt-8 relative z-10 flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs">
                Add to Order <ArrowRight size={14} />
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-toy-yellow p-10 rounded-[48px] shadow-xl shadow-toy-yellow/20 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-16 h-16 bg-black/10 rounded-3xl flex items-center justify-center text-slate-900 mb-8">
                  <Sparkles size={32} />
                </div>
                <h3 className="font-display text-3xl font-black text-slate-900 mb-4 leading-tight">Member <br /> Perks</h3>
                <p className="text-slate-700 font-medium">Join our club and earn points for every purchase.</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-slate-900 font-black uppercase tracking-widest text-xs">
                Join Now <ArrowRight size={14} />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
