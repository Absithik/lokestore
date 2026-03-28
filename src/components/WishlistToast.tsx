import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const WishlistToast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] bg-toy-pink text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
        >
          <Heart size={20} className="fill-current" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
