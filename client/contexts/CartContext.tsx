import { useContext, createContext, ReactNode } from 'react';
import axios from '@/api/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
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
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: async (productId: string, productQuantity: number = 1) => {
      if (!productId || !productQuantity) return;
      let updatedCartProducts;

      const existingCartProducts = cartProducts.find(
        ({ product }: CartItem) => product._id === productId
      );

      if (existingCartProducts) {
        updatedCartProducts = cartProducts.map(
          ({ product, quantity }: CartItem) => {
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
    onSuccess: () => queryClient.invalidateQueries('cartProducts'),
  });

  // const addToCart = (productId: string, quantity: number = 1) => {
  //   if (!productId || !quantity) return;

  //   setCart((prevCart) => {
  //     const existingCartItem = prevCart.find(
  //       (item) => item.product === productId
  //     );

  //     if (existingCartItem) {
  //       const updatedCart = prevCart.map((item) => {
  //         if (item.product === productId) {
  //           return { ...item, quantity: item?.quantity + quantity };
  //         }

  //         return item;
  //       });

  //       return updatedCart;
  //     }

  //     return [...prevCart, { product: productId, quantity }];
  //   });
  // };

  const value = {
    cartProducts,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
