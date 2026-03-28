import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react';

interface WoodenProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  description: string;
}

const woodenProducts: WoodenProduct[] = [
  {
    id: 101,
    name: "Classic Wooden Train Set",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1515488484532-4397c443f0a2?auto=format&fit=crop&q=80&w=600",
    rating: 5,
    description: "Hand-carved from sustainable maple wood with non-toxic finishes."
  },
  {
    id: 102,
    name: "Organic Animal Stackers",
    price: "$32.00",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    description: "A beautiful set of balancing animals made from solid beechwood."
  },
  {
    id: 103,
    name: "Artisan Building Blocks",
    price: "$55.00",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    description: "Natural wood blocks with unique textures and organic shapes."
  }
];

export const WoodenCollection: React.FC = () => {
  return (
    <section className="py-24 bg-[#fdfaf6] relative overflow-hidden font-serif">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-64 h-64 border border-[#d4c3a3] rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-[#d4c3a3] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#8b7355] uppercase tracking-[0.2em] text-sm font-sans font-bold mb-4 block"
            >
              Timeless & Sustainable
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl text-[#4a3728] font-black leading-tight"
            >
              Handcrafted <br />
              <span className="italic font-light text-[#8b7355]">Wooden Collections</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6d5a4a] text-lg max-w-sm font-sans leading-relaxed"
          >
            Discover our artisan-made toys, crafted with love from natural materials to last for generations.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {woodenProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] bg-[#f5f2ed] mb-8">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                
                <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#4a3728] shadow-lg hover:bg-[#4a3728] hover:text-white transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#4a3728] shadow-lg hover:bg-[#4a3728] hover:text-white transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-full bg-white/90 backdrop-blur-md text-[#4a3728] py-4 rounded-2xl font-sans font-bold shadow-xl">
                    Quick View
                  </button>
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-[#4a3728] group-hover:text-[#8b7355] transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-xl font-sans font-bold text-[#8b7355]">{product.price}</span>
                </div>
                <div className="flex items-center gap-1 text-[#d4c3a3]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-current" : ""} />
                  ))}
                  <span className="text-xs text-[#8b7355] font-sans font-bold ml-2">{product.rating}</span>
                </div>
                <p className="text-[#6d5a4a] text-sm font-sans leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-[#d4c3a3]/30 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#fdfaf6] overflow-hidden bg-slate-200">
                  <img src={`https://picsum.photos/seed/wood${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-[#6d5a4a] text-sm font-sans">
              <span className="font-bold text-[#4a3728]">500+ families</span> love our wooden collection
            </p>
          </div>

          <button className="group flex items-center gap-4 text-[#4a3728] font-sans font-black text-lg uppercase tracking-widest">
            View Full Collection
            <div className="w-12 h-12 rounded-full border border-[#4a3728] flex items-center justify-center group-hover:bg-[#4a3728] group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
