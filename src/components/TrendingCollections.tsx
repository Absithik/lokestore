import React from 'react';
import { motion } from 'motion/react';
import { Play, Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';

interface TrendingVideo {
  id: number;
  thumbnail: string;
  title: string;
  views: string;
  likes: string;
  author: string;
}

const trendingVideos: TrendingVideo[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=400",
    title: "Unboxing the Magic Plushie!",
    views: "1.2M",
    likes: "45K",
    author: "@toy_explorer"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400",
    title: "STEM Kit Science Experiment",
    views: "850K",
    likes: "32K",
    author: "@science_kids"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1559440666-374433682ee3?auto=format&fit=crop&q=80&w=400",
    title: "Best Birthday Gift Ever!",
    views: "2.5M",
    likes: "120K",
    author: "@mommy_vlogs"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=400",
    title: "RC Racer Speed Test!",
    views: "500K",
    likes: "18K",
    author: "@speedy_toys"
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400",
    title: "Building the Ultimate Castle",
    views: "1.8M",
    likes: "67K",
    author: "@block_master"
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=400",
    title: "Doll House Tour 2024",
    views: "3.1M",
    likes: "210K",
    author: "@dream_dolls"
  }
];

const VideoCard: React.FC<{ video: TrendingVideo }> = ({ video }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative flex-shrink-0 w-72 aspect-[9/16] rounded-[32px] overflow-hidden shadow-2xl group cursor-pointer"
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30"
        >
          <Play size={40} className="text-white fill-current" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-toy-pink border-2 border-white overflow-hidden">
            <img src={`https://i.pravatar.cc/150?u=${video.author}`} alt="avatar" />
          </div>
          <span className="text-white text-sm font-bold drop-shadow-md">{video.author}</span>
        </div>
        
        <h3 className="text-white font-display text-lg font-bold leading-tight drop-shadow-md">
          {video.title}
        </h3>

        <div className="flex items-center justify-between text-white/90">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart size={16} className="fill-toy-pink text-toy-pink" />
              <span className="text-xs font-bold">{video.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span className="text-xs font-bold">42</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Play size={14} />
            <span className="text-xs font-bold">{video.views}</span>
          </div>
        </div>
      </div>

      {/* Trending Badge */}
      <div className="absolute top-6 left-6 bg-toy-pink text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
        <TrendingUp size={12} />
        Trending
      </div>
    </motion.div>
  );
};

export const TrendingCollections: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-toy-pink rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-toy-teal rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-toy-pink/20 text-toy-pink px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
              <Share2 size={16} />
              Social Buzz
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white">
              Trending <span className="text-toy-pink">Collections</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-xl">
              See what's viral! Watch our community unbox, play, and explore the latest ToyWonder treasures.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-bold transition-all border border-white/10">
              View All Reels
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          {/* Scroll Indicators/Fades */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
