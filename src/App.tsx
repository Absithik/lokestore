/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, Rocket, Cloud, Sun, Menu, X, Heart, Trash2 } from 'lucide-react';
import { CategoryCards } from './components/CategoryCards';
import { FloatingMascot, AdventureSection, NewsletterSection } from './components/MascotSections';
import { AnimatedBackground } from './components/AnimatedBackground';
import { BestSellerSection, NewArrivalSection, EducationalSection, AllProductsSection, OutdoorSection } from './components/ProductSections';
import { TrendingCollections } from './components/TrendingCollections';
import { AdSection } from './components/AdSection';
import { WoodenCollection } from './components/WoodenCollection';
import { TestimonialsAndFAQ } from './components/TestimonialsAndFAQ';
import { useWishlist } from './context/WishlistContext';
import { WishlistToast } from './components/WishlistToast';
import { BackToTop } from './components/BackToTop';

// Paper Shower Component
const PaperShower = () => {
  const [papers, setPapers] = useState<{ id: number; x: number; color: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const colors = ['#FF1E6D', '#FFD93D', '#4FD1D9', '#9ADE7B', '#FFFFFF'];
    const newPapers = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setPapers(newPapers);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {papers.map((paper) => (
        <motion.div
          key={paper.id}
          initial={{ y: -20, x: `${paper.x}%`, rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: 360 * 2,
            x: `${paper.x + (Math.random() * 10 - 5)}%`,
          }}
          transition={{
            duration: paper.duration,
            repeat: Infinity,
            delay: paper.delay,
            ease: "linear"
          }}
          style={{
            width: paper.size,
            height: paper.size * 1.5,
            backgroundColor: paper.color,
            position: 'absolute',
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { wishlist, toggleWishlist, toast, hideToast } = useWishlist();
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const prevWishlistLength = useRef(wishlist.length);

  useEffect(() => {
    if (wishlist.length > prevWishlistLength.current) {
      setIsHeartAnimating(true);
      const timer = setTimeout(() => setIsHeartAnimating(false), 600);
      return () => clearTimeout(timer);
    }
    prevWishlistLength.current = wishlist.length;
  }, [wishlist.length]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      <AnimatedBackground />
      <FloatingMascot />
      
      <WishlistToast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />

      {/* Wishlist Overlay */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-toy-pink/10 p-2 rounded-xl text-toy-pink">
                    <Heart size={24} className="fill-current" />
                  </div>
                  <h2 className="font-display text-2xl font-black text-slate-900">My Wishlist</h2>
                </div>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                  <div className="bg-slate-50 p-8 rounded-full">
                    <Heart size={64} className="text-slate-200" />
                  </div>
                  <p className="text-slate-500 font-medium text-lg">Your wishlist is empty!</p>
                  <button 
                    onClick={() => setIsWishlistOpen(false)}
                    className="bg-toy-teal text-white font-bold px-8 py-3 rounded-xl shadow-lg"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlist.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      className="flex gap-4 bg-slate-50 p-4 rounded-2xl group"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border-2 border-white shadow-sm">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                          <p className="text-toy-teal font-black">{item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-toy-yellow">
                            <Star size={12} className="fill-current" />
                            <span className="text-xs font-bold text-slate-400">{item.rating}</span>
                          </div>
                          <button 
                            onClick={() => toggleWishlist(item)}
                            className="text-slate-300 hover:text-toy-pink transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-toy-pink p-2 rounded-lg">
                <Star className="text-white fill-white" size={24} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-toy-teal">ToyWonder</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 font-medium">
              <a href="#" className="hover:text-toy-pink transition-colors">Shop All</a>
              <a href="#" className="hover:text-toy-pink transition-colors">New Arrivals</a>
              <a href="#" className="hover:text-toy-pink transition-colors">Best Sellers</a>
              <a href="#" className="hover:text-toy-pink transition-colors">Gift Cards</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors relative text-slate-600"
              >
                <motion.div
                  animate={isHeartAnimating ? { 
                    scale: [1, 1.5, 1.2, 1.5, 1],
                    rotate: [0, 10, -10, 10, 0]
                  } : { scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Heart size={24} className={wishlist.length > 0 ? "text-toy-pink fill-toy-pink" : ""} />
                </motion.div>
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-toy-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
                <ShoppingCart size={24} />
                <span className="absolute top-0 right-0 bg-toy-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
              </button>
              <button 
                className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-100 absolute top-16 w-full z-30 p-4 space-y-4 shadow-xl"
          >
            <a href="#" className="block font-medium text-lg">Shop All</a>
            <a href="#" className="block font-medium text-lg">New Arrivals</a>
            <a href="#" className="block font-medium text-lg">Best Sellers</a>
            <a href="#" className="block font-medium text-lg">Gift Cards</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#56C1AD]">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Floating Hearts & Shapes */}
          <motion.div
            animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[48%] -translate-x-1/2 text-white"
          >
            <Heart size={48} className="fill-current" />
          </motion.div>
          
          {/* Floating Hearts around */}
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute top-[12%] left-[58%] text-toy-pink"
          >
            <Heart size={32} className="fill-current" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, -20, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute top-[25%] left-[62%] text-toy-pink/80"
          >
            <Heart size={24} className="fill-current" />
          </motion.div>

          {/* Abstract Shapes */}
          <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-toy-yellow rounded-full opacity-40 blur-xl" />
          <div className="absolute bottom-[20%] right-[5%] w-48 h-48 bg-toy-teal rounded-full opacity-30 blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <div className="flex flex-col items-center justify-center text-center relative">
            
            {/* Children Images - Flanking the text */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 w-[380px] z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800" 
                alt="Happy boy playing" 
                className="w-full h-auto rounded-[60px] drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-[380px] z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1515488484532-4397c443f0a2?auto=format&fit=crop&q=80&w=800" 
                alt="Happy boy playing" 
                className="w-full h-auto rounded-[60px] drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Central Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl mx-auto z-30 space-y-6"
            >
              <h1 className="font-display text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Joy for Every <br /> Little One!
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
                Discover our curated collection of toys designed to spark creativity and endless smiles.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button className="w-full sm:w-auto bg-[#00B8D4] text-white font-black text-lg px-12 py-4 rounded-full hover:brightness-110 transition-all shadow-lg">
                  Shop Now
                </button>
                <button className="w-full sm:w-auto bg-[#FF6B81] text-white font-black text-lg px-12 py-4 rounded-full hover:brightness-110 transition-all shadow-lg">
                  View Offers
                </button>
              </div>
            </motion.div>

            {/* Foreground Toys Row - Sitting on a "table" */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-full mt-20 flex justify-center items-end gap-6 md:gap-10"
            >
              {[
                { img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b", color: "bg-toy-yellow/10" },
                { img: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f", color: "bg-toy-pink/10" },
                { img: "https://images.unsplash.com/photo-1535572290543-960a8046f5af", color: "bg-toy-teal/10" },
                { img: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72", color: "bg-toy-yellow/10" },
                { img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1", color: "bg-toy-pink/10" }
              ].map((toy, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  className={`w-24 h-24 md:w-36 md:h-36 ${toy.color} rounded-3xl p-4 shadow-xl flex-shrink-0 flex items-center justify-center border-4 border-white/50`}
                >
                  <img src={`${toy.img}?auto=format&fit=crop&q=80&w=200`} className="w-full h-full object-contain" alt="Toy" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom White Surface Effect */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-white/10 backdrop-blur-[2px] border-t border-white/20 z-0" />
      </section>

      {/* New Category Cards Section */}
      <CategoryCards />

      {/* Best Sellers Section */}
      <BestSellerSection />

      {/* New Arrivals Section */}
      <NewArrivalSection />

      {/* Educational Toys Section */}
      <EducationalSection />

      {/* Outdoor Fun Section */}
      <OutdoorSection />

      {/* Handcrafted Wooden Collections Section */}
      <WoodenCollection />

      {/* All Products Section */}
      <div id="shop-all">
        <AllProductsSection />
      </div>

      {/* Advertisement Post Section */}
      <AdSection />

      {/* Adventure Section */}
      <AdventureSection />

      {/* Trending Collections Section */}
      <TrendingCollections />

      {/* Testimonials and FAQ Section */}
      <TestimonialsAndFAQ />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="text-toy-yellow fill-toy-yellow" size={24} />
              <span className="font-display text-2xl font-bold tracking-tight">ToyWonder</span>
            </div>
            <p className="text-slate-400">Making childhood magical since 2024. The best toys for the best kids.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-slate-400 mb-4">Get the latest updates on new arrivals!</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-toy-teal" />
              <button className="bg-toy-teal px-4 py-2 rounded-lg font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2024 ToyWonder. All rights reserved.
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
