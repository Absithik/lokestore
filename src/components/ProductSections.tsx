import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, Heart, ArrowRight, Zap, Trophy, ChevronLeft, ChevronRight, Share2, Eye, X, ChevronDown, Sun } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const ITEMS_PER_PAGE = 4;

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

const SortDropdown: React.FC<{
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  color: 'pink' | 'teal';
}> = ({ currentSort, onSortChange, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const activeLabel = options.find(opt => opt.value === currentSort)?.label;
  const accentClass = color === 'pink' ? 'text-toy-pink' : 'text-toy-teal';
  const bgClass = color === 'pink' ? 'bg-toy-pink/10' : 'bg-toy-teal/10';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl bg-white shadow-sm border-2 border-transparent hover:border-slate-100 transition-all font-bold text-slate-600`}
      >
        <span>Sort by: <span className={accentClass}>{activeLabel}</span></span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 overflow-hidden"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    currentSort === option.value
                      ? `${bgClass} ${accentClass}`
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onQuickView: (product: Product) => void }> = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [showCopied, setShowCopied] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.image,
      rating: product.rating
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareData = {
      title: `ToyWonder - ${product.name}`,
      text: `Check out ${product.name} at ToyWonder!`,
      url: window.location.origin + `?product=${product.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ 
        y: -12,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-white rounded-[32px] p-4 shadow-xl border-4 border-white group relative overflow-hidden cursor-pointer h-full"
    >
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-toy-teal text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-toy-pink text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            Best Seller
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
        <button 
          onClick={handleWishlistClick}
          className={`bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md transition-all ${
            isWishlisted ? 'text-toy-pink scale-110' : 'text-slate-400 hover:text-toy-pink'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
        </button>
        <button 
          onClick={handleQuickView}
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md transition-all text-slate-400 hover:text-toy-teal hover:scale-110"
          title="Quick view"
          aria-label={`Quick view for ${product.name}`}
        >
          <Eye size={20} />
        </button>
        <div className="relative">
          <button 
            onClick={handleShare}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md transition-all text-slate-400 hover:text-toy-teal hover:scale-110"
            title="Share product"
            aria-label={`Share ${product.name}`}
          >
            <Share2 size={20} />
          </button>
          <AnimatePresence>
            {showCopied && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap"
              >
                Link Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square rounded-[24px] overflow-hidden bg-slate-50 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-toy-teal uppercase tracking-wider">{product.category}</p>
        <h3 className="font-display text-lg font-black text-slate-900 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-1 text-toy-yellow">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-current" : "text-slate-200"} />
          ))}
          <span className="text-xs text-slate-400 font-bold ml-1">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-black text-slate-900 group-hover:text-toy-pink transition-colors">{product.price}</p>
          <motion.button 
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-toy-teal hover:bg-toy-teal/90 text-white p-3 rounded-2xl shadow-lg transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  { id: 1, user: "Sarah J.", rating: 5, comment: "My kids absolutely love this! The quality is amazing and it keeps them entertained for hours.", date: "2 days ago" },
  { id: 2, user: "Mike R.", rating: 4, comment: "Great toy, very durable. Only wish it came in more colors.", date: "1 week ago" },
  { id: 3, user: "Emily W.", rating: 5, comment: "Perfect gift for my nephew's birthday. Highly recommend!", date: "2 weeks ago" },
];

const ReviewAccordion: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="space-y-4 mt-8 pt-8 border-t border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-xl font-black text-slate-900">Customer Reviews</h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-toy-yellow">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < 4 ? "fill-current" : "text-slate-200"} />
            ))}
          </div>
          <span className="text-sm font-bold text-slate-400">({reviews.length})</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-slate-50/50 rounded-2xl border border-slate-100/50 transition-all hover:border-toy-teal/20 overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
              className="w-full p-4 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-toy-pink font-black text-sm border border-slate-100">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 text-sm">{review.user}</p>
                    <span className="text-[10px] font-black text-toy-teal bg-toy-teal/10 px-1.5 py-0.5 rounded-md uppercase tracking-wider">Verified</span>
                  </div>
                  <div className="flex gap-0.5 text-toy-yellow mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < review.rating ? "fill-current" : "text-slate-200"} />
                    ))}
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedId === review.id ? 180 : 0 }}
                className={`p-1.5 rounded-lg transition-colors ${expandedId === review.id ? 'bg-toy-teal text-white' : 'bg-white text-slate-400 shadow-sm border border-slate-100'}`}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {expandedId === review.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-4 pb-4 pt-0 ml-13">
                    <p className="text-slate-600 text-sm leading-relaxed pr-4">
                      {review.comment}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3">
                      Posted {review.date}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickViewModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-white rounded-[40px] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
        >
          <X size={24} className="text-slate-600" />
        </button>

        <div className="md:w-1/2 aspect-square md:aspect-auto bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-start space-y-6 overflow-y-auto scrollbar-hide">
          <div className="space-y-2">
            <p className="text-toy-teal font-black uppercase tracking-widest text-sm">{product.category}</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-slate-900 leading-tight">{product.name}</h2>
          </div>

          <div className="flex items-center gap-2 text-toy-yellow">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-current" : "text-slate-200"} />
              ))}
            </div>
            <span className="text-sm text-slate-400 font-bold">({product.rating} Rating)</span>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Experience the magic of {product.name}! Perfect for kids of all ages, this high-quality {product.category.toLowerCase()} toy is designed to spark imagination and provide hours of creative play.
          </p>

          <ReviewAccordion reviews={mockReviews} />

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Price</p>
              <p className="text-3xl font-black text-toy-pink">{product.price}</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#0d9488" }} // Slightly darker teal
              whileTap={{ scale: 0.95 }}
              className="bg-toy-teal text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-toy-teal/20 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color: 'pink' | 'teal';
}> = ({ currentPage, totalPages, onPageChange, color }) => {
  const activeClass = color === 'pink' ? 'bg-toy-pink text-white' : 'bg-toy-teal text-white';
  const hoverClass = color === 'pink' ? 'hover:bg-toy-pink/10 text-toy-pink' : 'hover:bg-toy-teal/10 text-toy-teal';

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={`p-2 rounded-xl transition-all disabled:text-slate-300 disabled:bg-slate-50 disabled:cursor-not-allowed ${hoverClass}`}
      >
        <ChevronLeft size={24} />
      </button>
      
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1;
        const isActive = currentPage === pageNumber;
        return (
          <button
            key={i}
            onClick={() => onPageChange(pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
            className={`w-10 h-10 rounded-xl font-bold transition-all ${
              isActive ? activeClass : `bg-white shadow-sm text-slate-400 ${hoverClass}`
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={`p-2 rounded-xl transition-all disabled:text-slate-300 disabled:bg-slate-50 disabled:cursor-not-allowed ${hoverClass}`}
      >
        <ChevronRight size={24} />
      </button>
    </nav>
  );
};

export const BestSellerSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const bestSellers: Product[] = [
    { id: 1, name: "Magic Plushie Bear", price: "$24.99", rating: 4.9, image: "https://images.unsplash.com/photo-1559440666-374433682ee3?auto=format&fit=crop&q=80&w=400", category: "Plushies", isBestSeller: true },
    { id: 2, name: "Turbo RC Racer", price: "$45.00", rating: 4.8, image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=400", category: "Vehicles", isBestSeller: true },
    { id: 3, name: "Castle Block Set", price: "$39.99", rating: 5.0, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400", category: "Building", isBestSeller: true },
    { id: 4, name: "Dream Doll House", price: "$89.00", rating: 4.7, image: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=400", category: "Dolls", isBestSeller: true },
    { id: 9, name: "Super Hero Cape", price: "$19.99", rating: 4.5, image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=400", category: "Roleplay", isBestSeller: true },
    { id: 10, name: "Puzzle Master 500", price: "$14.99", rating: 4.6, image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=400", category: "Puzzles", isBestSeller: true },
    { id: 11, name: "Artistic Paint Set", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400", category: "Art", isBestSeller: true },
    { id: 12, name: "Musical Keyboard", price: "$55.00", rating: 4.7, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=400", category: "Music", isBestSeller: true }
  ];

  const sortedItems = [...bestSellers].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const currentItems = sortedItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-toy-pink/5 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-toy-pink/10 text-toy-pink px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
              <Trophy size={16} />
              Hall of Fame
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900">
              Our <span className="text-toy-pink">Best Sellers</span>
            </h2>
            <p className="text-slate-600 font-medium max-w-xl">
              The toys that have stolen hearts all over the world. These are our most loved and highly rated playmates!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SortDropdown currentSort={sortBy} onSortChange={handleSortChange} color="pink" />
            <button className="flex items-center gap-2 text-toy-pink font-bold hover:gap-4 transition-all group">
              View All Best Sellers <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {quickViewProduct && (
            <QuickViewModal 
              product={quickViewProduct} 
              onClose={() => setQuickViewProduct(null)} 
            />
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
            color="pink"
          />
        )}
      </div>
    </section>
  );
};

export const NewArrivalSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const newArrivals: Product[] = [
    { id: 5, name: "Galactic Rocket Kit", price: "$34.99", rating: 4.9, image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=400", category: "STEM", isNew: true },
    { id: 6, name: "Magic Sparkle Wand", price: "$15.00", rating: 4.6, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400", category: "Roleplay", isNew: true },
    { id: 7, name: "Dino Explorer Set", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=400", category: "Action Figures", isNew: true },
    { id: 8, name: "Wooden Train Track", price: "$49.00", rating: 5.0, image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=400", category: "Wooden Toys", isNew: true },
    { id: 13, name: "Chemistry Lab Kit", price: "$39.99", rating: 4.7, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400", category: "STEM", isNew: true },
    { id: 14, name: "Ocean Explorer Sub", price: "$24.99", rating: 4.8, image: "https://images.unsplash.com/photo-1560272564-c83d66b1ad12?auto=format&fit=crop&q=80&w=400", category: "Vehicles", isNew: true },
    { id: 15, name: "Forest Fairy Wings", price: "$12.00", rating: 4.5, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", category: "Roleplay", isNew: true },
    { id: 16, name: "Solar System Mobile", price: "$19.99", rating: 4.9, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400", category: "STEM", isNew: true }
  ];

  const sortedItems = [...newArrivals].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const currentItems = sortedItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 bg-gradient-to-t from-toy-teal/5 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-toy-teal/10 text-toy-teal px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
              <Zap size={16} />
              Fresh Fun
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900">
              New <span className="text-toy-teal">Arrivals</span>
            </h2>
            <p className="text-slate-600 font-medium max-w-xl">
              Be the first to play! Discover our latest additions that just landed in the ToyWonder warehouse.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SortDropdown currentSort={sortBy} onSortChange={handleSortChange} color="teal" />
            <button className="flex items-center gap-2 text-toy-teal font-bold hover:gap-4 transition-all group">
              Explore New Arrivals <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {quickViewProduct && (
            <QuickViewModal 
              product={quickViewProduct} 
              onClose={() => setQuickViewProduct(null)} 
            />
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
            color="teal"
          />
        )}
      </div>
    </section>
  );
};

export const EducationalSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const educationalToys: Product[] = [
    { id: 17, name: "Alphabet Blocks", price: "$19.99", rating: 4.8, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 18, name: "Solar System Puzzle", price: "$24.99", rating: 4.9, image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 19, name: "Microscope Kit", price: "$49.99", rating: 4.7, image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 20, name: "Math Flash Cards", price: "$9.99", rating: 4.5, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 21, name: "Coding Robot", price: "$79.99", rating: 5.0, image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 22, name: "Human Body Model", price: "$34.99", rating: 4.6, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 23, name: "Geography Globe", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 24, name: "Telescope for Kids", price: "$59.99", rating: 4.9, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400", category: "Educational" }
  ];

  const sortedItems = [...educationalToys].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const currentItems = sortedItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="py-24 bg-gradient-to-b from-toy-yellow/5 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-toy-yellow/10 text-toy-yellow px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
              <Star size={16} />
              Brain Power
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900">
              Educational <span className="text-toy-yellow">Toys</span>
            </h2>
            <p className="text-slate-600 font-medium max-w-xl">
              Learn while you play! Our educational toys are designed to make learning fun and engaging for curious minds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} color="teal" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {quickViewProduct && (
            <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} color="teal" />
        )}
      </div>
    </section>
  );
};

export const AllProductsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const allProducts: Product[] = [
    { id: 1, name: "Magic Plushie Bear", price: "$24.99", rating: 4.9, image: "https://images.unsplash.com/photo-1559440666-374433682ee3?auto=format&fit=crop&q=80&w=400", category: "Plushies", isBestSeller: true },
    { id: 2, name: "Turbo RC Racer", price: "$45.00", rating: 4.8, image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=400", category: "Vehicles", isBestSeller: true },
    { id: 3, name: "Castle Block Set", price: "$39.99", rating: 5.0, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400", category: "Building", isBestSeller: true },
    { id: 4, name: "Dream Doll House", price: "$89.00", rating: 4.7, image: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=400", category: "Dolls", isBestSeller: true },
    { id: 5, name: "Galactic Rocket Kit", price: "$34.99", rating: 4.9, image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=400", category: "STEM", isNew: true },
    { id: 6, name: "Magic Sparkle Wand", price: "$15.00", rating: 4.6, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400", category: "Roleplay", isNew: true },
    { id: 7, name: "Dino Explorer Set", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=400", category: "Action Figures", isNew: true },
    { id: 8, name: "Wooden Train Track", price: "$49.00", rating: 5.0, image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=400", category: "Wooden Toys", isNew: true },
    { id: 9, name: "Super Hero Cape", price: "$19.99", rating: 4.5, image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=400", category: "Roleplay", isBestSeller: true },
    { id: 10, name: "Puzzle Master 500", price: "$14.99", rating: 4.6, image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=400", category: "Puzzles", isBestSeller: true },
    { id: 11, name: "Artistic Paint Set", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400", category: "Art", isBestSeller: true },
    { id: 12, name: "Musical Keyboard", price: "$55.00", rating: 4.7, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=400", category: "Music", isBestSeller: true },
    { id: 13, name: "Chemistry Lab Kit", price: "$39.99", rating: 4.7, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400", category: "STEM", isNew: true },
    { id: 14, name: "Ocean Explorer Sub", price: "$24.99", rating: 4.8, image: "https://images.unsplash.com/photo-1560272564-c83d66b1ad12?auto=format&fit=crop&q=80&w=400", category: "Vehicles", isNew: true },
    { id: 15, name: "Forest Fairy Wings", price: "$12.00", rating: 4.5, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", category: "Roleplay", isNew: true },
    { id: 16, name: "Solar System Mobile", price: "$19.99", rating: 4.9, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400", category: "STEM", isNew: true },
    { id: 17, name: "Alphabet Blocks", price: "$19.99", rating: 4.8, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 18, name: "Solar System Puzzle", price: "$24.99", rating: 4.9, image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 19, name: "Microscope Kit", price: "$49.99", rating: 4.7, image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 20, name: "Math Flash Cards", price: "$9.99", rating: 4.5, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 21, name: "Coding Robot", price: "$79.99", rating: 5.0, image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 22, name: "Human Body Model", price: "$34.99", rating: 4.6, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 23, name: "Geography Globe", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 24, name: "Telescope for Kids", price: "$59.99", rating: 4.9, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400", category: "Educational" },
    { id: 25, name: "Bubble Blower Gun", price: "$12.99", rating: 4.7, image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 26, name: "Inflatable Pool", price: "$39.99", rating: 4.8, image: "https://images.unsplash.com/photo-1562158074-974318030014?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 27, name: "Flying Disc", price: "$8.00", rating: 4.5, image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 28, name: "Kids Trampoline", price: "$149.99", rating: 5.0, image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=400", category: "Outdoor" }
  ];

  const sortedItems = [...allProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const ALL_ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(sortedItems.length / ALL_ITEMS_PER_PAGE);
  const currentItems = sortedItems.slice((currentPage - 1) * ALL_ITEMS_PER_PAGE, currentPage * ALL_ITEMS_PER_PAGE);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-toy-teal/10 text-toy-teal px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
              <ShoppingCart size={16} />
              Full Collection
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900">
              Shop <span className="text-toy-teal">All Toys</span>
            </h2>
            <p className="text-slate-600 font-medium max-w-xl">
              Explore our entire universe of fun! From plushies to STEM kits, we have something special for every child.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} color="teal" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {quickViewProduct && (
            <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} color="teal" />
        )}
      </div>
    </section>
  );
};

export const OutdoorSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const outdoorToys: Product[] = [
    { id: 25, name: "Bubble Blower Gun", price: "$12.99", rating: 4.7, image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 26, name: "Inflatable Pool", price: "$39.99", rating: 4.8, image: "https://images.unsplash.com/photo-1562158074-974318030014?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 27, name: "Flying Disc", price: "$8.00", rating: 4.5, image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 28, name: "Kids Trampoline", price: "$149.99", rating: 5.0, image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 29, name: "Garden Swing Set", price: "$199.00", rating: 4.9, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 30, name: "Water Slide", price: "$55.00", rating: 4.6, image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 31, name: "Kite Explorer", price: "$15.00", rating: 4.7, image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=400", category: "Outdoor" },
    { id: 32, name: "Sandbox Kit", price: "$45.00", rating: 4.8, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400", category: "Outdoor" }
  ];

  const sortedItems = [...outdoorToys].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const currentItems = sortedItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="py-24 bg-gradient-to-t from-toy-teal/5 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-toy-teal/10 text-toy-teal px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
              <Sun size={16} />
              Outdoor Fun
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900">
              Outdoor <span className="text-toy-teal">Adventures</span>
            </h2>
            <p className="text-slate-600 font-medium max-w-xl">
              Get outside and play! Our outdoor collection is perfect for backyard fun and sunny days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} color="teal" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {quickViewProduct && (
            <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} color="teal" />
        )}
      </div>
    </section>
  );
};
