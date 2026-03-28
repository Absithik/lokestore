import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
  rating: number;
}

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  toast: { message: string; isVisible: boolean };
  hideToast: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('toywonder_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    localStorage.setItem('toywonder_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const hideToast = () => setToast({ ...toast, isVisible: false });

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        setToast({ message: `Removed ${product.name} from wishlist`, isVisible: true });
        return prev.filter((item) => item.id !== product.id);
      }
      setToast({ message: `Added ${product.name} to wishlist!`, isVisible: true });
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, toast, hideToast }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
