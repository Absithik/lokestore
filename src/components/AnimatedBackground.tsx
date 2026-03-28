import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Rocket, Cloud, Sun, Ghost, Zap, Smile } from 'lucide-react';

const ToyElement = ({ children, delay, duration, x, y, size, rotate }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      y: [0, -20, 0],
      rotate: [0, rotate, 0]
    }}
    transition={{ 
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none z-0"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <div style={{ width: size, height: size }}>
      {children}
    </div>
  </motion.div>
);

export const AnimatedBackground: React.FC = () => {
  const elements = [
    { icon: <Star className="text-yellow-400 fill-yellow-400" />, x: 5, y: 15, size: 40, delay: 0, duration: 4, rotate: 20 },
    { icon: <Heart className="text-pink-400 fill-pink-400" />, x: 85, y: 25, size: 30, delay: 1, duration: 5, rotate: -15 },
    { icon: <Rocket className="text-blue-400" />, x: 15, y: 45, size: 50, delay: 2, duration: 6, rotate: 45 },
    { icon: <Cloud className="text-blue-200 fill-blue-100" />, x: 75, y: 10, size: 60, delay: 0.5, duration: 8, rotate: 5 },
    { icon: <Sun className="text-orange-400 fill-orange-300" />, x: 90, y: 60, size: 45, delay: 3, duration: 7, rotate: 360 },
    { icon: <Ghost className="text-purple-300" />, x: 10, y: 80, size: 35, delay: 4, duration: 5, rotate: 10 },
    { icon: <Zap className="text-yellow-500 fill-yellow-200" />, x: 80, y: 85, size: 40, delay: 1.5, duration: 4, rotate: -20 },
    { icon: <Smile className="text-green-400" />, x: 40, y: 5, size: 30, delay: 2.5, duration: 6, rotate: 15 },
    
    // More scattered elements
    { icon: <Star className="text-blue-300 fill-blue-200" />, x: 30, y: 30, size: 20, delay: 5, duration: 4, rotate: 30 },
    { icon: <Heart className="text-red-300 fill-red-200" />, x: 60, y: 70, size: 25, delay: 3.5, duration: 5, rotate: -10 },
    { icon: <Cloud className="text-slate-200" />, x: 45, y: 90, size: 55, delay: 1, duration: 9, rotate: 0 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {/* Soft Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-pink-50" />
      
      {/* Floating Cartoon Elements */}
      {elements.map((el, i) => (
        <ToyElement key={i} {...el}>
          {el.icon}
        </ToyElement>
      ))}

      {/* Animated blobs for more "cartoon" feel */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-100/30 rounded-full blur-3xl"
      />
    </div>
  );
};
