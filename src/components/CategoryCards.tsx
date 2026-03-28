import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Heart, ShoppingBag } from 'lucide-react';

interface CategoryCardProps {
  title?: string;
  bgColor: string;
  image: string;
  icon: React.ReactNode;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, bgColor, image, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className={`relative rounded-[40px] overflow-hidden aspect-[4/5] flex flex-col p-6 ${bgColor} shadow-lg cursor-pointer group`}
    >
      {/* Top Section: Title and Badge */}
      <div className="flex justify-between items-start z-10">
        {title && (
          <h3 className="font-display text-2xl font-bold text-white drop-shadow-sm">
            {title}
          </h3>
        )}
        <div className="bg-white rounded-full p-2 shadow-md">
          <div className="text-slate-800">
            {icon}
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-auto relative h-3/4 flex items-center justify-center">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={image}
          alt={title || "Category"}
          className="w-full h-full object-contain drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>
      
      {/* Subtle Overlay on Hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
    </motion.div>
  );
};

export const CategoryCards: React.FC = () => {
  const categories = [
    {
      title: "Educational Toy",
      bgColor: "bg-[#F48FB1]", // Soft Pink
      image: "https://images.unsplash.com/photo-1587654062353-478543c7a47b?auto=format&fit=crop&q=80&w=600",
      icon: <BookOpen size={18} />,
      delay: 0.1
    },
    {
      bgColor: "bg-[#4FD1D9]", // Toy Teal
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=600",
      icon: <User size={18} />,
      delay: 0.2
    },
    {
      bgColor: "bg-[#FFD93D]", // Toy Yellow
      image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=600",
      icon: <Heart size={18} />,
      delay: 0.3
    },
    {
      title: "Kids Fashion",
      bgColor: "bg-[#F8BBD0]", // Lighter Pink
      image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=600",
      icon: <ShoppingBag size={18} />,
      delay: 0.4
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-toy-teal/5 relative overflow-hidden">
      {/* Peeking Mascot on Left */}
      <motion.div
        initial={{ x: -100, rotate: -10 }}
        whileInView={{ x: -30, rotate: 5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="absolute left-0 bottom-0 w-48 h-48 hidden xl:block pointer-events-none z-0 opacity-90"
      >
        <img 
          src="https://images.unsplash.com/photo-1513159419869-1133c33dfa22?auto=format&fit=crop&q=80&w=400" 
          alt="Category Mascot" 
          className="w-full h-full object-contain drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
