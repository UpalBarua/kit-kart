import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from '@/api/axios';

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

  useEffect(() => {
    const saveCart = async () => {
      const { data } = await axios.put('/cart?email=upal@mail.com', {
        products: cart,
      });

      console.log({ data });
      console.log({ cart });
    };

    saveCart();
  }, [cart]);

  const addToCart = (productId: string, quantity: number = 0) => {
    if (!productId || !quantity) return;

    setCart((prevCart) => {
      const existingCartItem = prevCart.find(
        (item) => item?.productId === productId
      );

      if (existingCartItem) {
        const updatedCart = prevCart.map((item) => {
          if (item?.productId === productId) {
            return { ...item, quantity: item?.quantity + quantity };
          }

          return item;
        });

        return updatedCart;
      }

      return [...prevCart, { productId, quantity }];
    });
  };

  const value = {
    cart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
