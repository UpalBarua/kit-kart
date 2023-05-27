import { useState, useContext, createContext, ReactNode } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: string, quantity: number) => {
    setCart((prevCart) => [...prevCart, { productId, quantity }]);
  };

  const value = {
    cart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
