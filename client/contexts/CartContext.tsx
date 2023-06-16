import { useContext, createContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CartProduct } from '@/types/product';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';
import useUser from '@/hooks/useUser';

interface CartContextProps {
  cartProducts: CartProduct[];
  addToCart: (productId: string, productQuantity: number) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { email } = useUser();

  const { data: cartProducts = [] } = useQuery({
    queryKey: ['cartProducts', email],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/cart?email=${email}`);

        if (data?.products) {
          return data?.products;
        }

        return [];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    enabled: !!email,
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: async ({
      productId,
      productQuantity,
    }: {
      productId: string;
      productQuantity: number;
    }) => {
      if (!productId || !productQuantity) return;
      let updatedCartProducts;

      const existingCartProducts = cartProducts.find(
        ({ product }: CartProduct) => product._id === productId
      );

      if (existingCartProducts) {
        updatedCartProducts = cartProducts.map(
          ({ product, quantity }: CartProduct) => {
            if (product._id === productId) {
              return { product, quantity: quantity + productQuantity };
            }

            return { product, quantity };
          }
        );
      } else {
        updatedCartProducts = [
          ...cartProducts,
          { product: productId, quantity: productQuantity },
        ];
      }

      try {
        const { status } = await axios.put(`/cart?email=${email}`, {
          products: updatedCartProducts,
        });

        if (status === 200) {
          toast.success('Product added to cart');
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries(['cartProducts']),
  });

  const { mutate: removeFromCart } = useMutation({
    mutationFn: async (productId: string) => {
      if (!productId) return;

      const filteredCartProducts = cartProducts.filter(
        ({ product }: CartProduct) => product?._id !== productId
      );

      try {
        const { status } = await axios.put(`/cart?email=${email}`, {
          products: filteredCartProducts,
        });

        if (status === 200) {
          toast.success('Removed from cart');
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries(['cartProducts']),
  });

  const value = {
    cartProducts,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
