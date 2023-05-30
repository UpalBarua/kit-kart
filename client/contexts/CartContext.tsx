import { useContext, createContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CartProduct } from '@/types/product';
import axios from '@/api/axios';

interface CartContextProps {
  cartProducts: CartProduct[];
  addToCart: (productId: string, productQuantity: number) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const email = 'upal@mail.com';

  const { data: cartProducts = [] } = useQuery({
    queryKey: ['cartProducts', email],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/cart?email=${email}`);
        return data?.products;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!email,
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: async (productId: string, productQuantity: number = 1) => {
      if (!productId || !productQuantity) return;
      let updatedCartProducts;

      const existingCartProducts = cartProducts.find(
        ({ product }: CartProduct) => product._id === productId
      );

      if (existingCartProducts) {
        updatedCartProducts = cartProducts.map(
          ({ product, quantity }: CartProduct) => {
            if (product._id === productId) {
              return { ...product, quantity: quantity + productQuantity };
            }

            return product;
          }
        );
      } else {
        updatedCartProducts = [
          ...cartProducts,
          { product: productId, quantity: productQuantity },
        ];
      }

      const { data } = await axios.put(`/cart?email=${email}`, {
        products: updatedCartProducts,
      });

      console.log(data);
    },
    onSuccess: () => queryClient.invalidateQueries(['cartProducts']),
  });

  const value = {
    cartProducts,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
