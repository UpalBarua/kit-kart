import Layout from '@/components/Layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { CartProduct } from '@/types/product';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem/CartItem';
import Link from 'next/link';
import axios from '@/api/axios';
import useUser from '@/hooks/useUser';
import { Ring } from '@uiball/loaders';

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const { cartProducts, removeFromCart, isLoading } = useCart()!;

  const {
    userData: { _id },
    userIsLoading,
  } = useUser();

  const { push } = useRouter();

  useEffect(() => {
    const summedTotal = cartProducts.reduce(
      (sum: number, { product, quantity }: CartProduct) => {
        return sum + +product?.price * quantity;
      },
      0
    );

    setSubTotal(summedTotal);
  }, [cartProducts]);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('/payment/create-checkout-session', {
        products: cartProducts,
      });

      if (data?.url) {
        await axios.post('/orders', {
          user: _id,
          orders: cartProducts,
        });

        push(data.url);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!userIsLoading && !_id) {
      push('/login');
    }
  }, [_id, userIsLoading, push]);

  return (
    <Layout>
      <h2 className="pb-5 text-2xl font-bold">Shopping Cart</h2>
      {isLoading ? (
        <Ring size={50} lineWeight={5} speed={2} color="black" />
      ) : cartProducts.length ? (
        <div className="grid grid-cols-1 gap-5 items-start md:grid-cols-2">
          <ul className="grid order-1 gap-5 md:-order-1 md:gap-7">
            {cartProducts?.map(({ product, quantity, _id }: CartProduct) => (
              <CartItem
                key={_id}
                {...product}
                cartId={_id}
                quantity={quantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
          <div className="p-5 w-full bg-white rounded-md shadow md:w-80 md:ms-auto md:p-8">
            <h2 className="pb-3 text-2xl font-bold">Order Summery</h2>
            <div className="flex justify-between items-center pb-3">
              <p>Subtotal</p>
              <p>{subTotal} BDT</p>
            </div>
            <div className="flex justify-between items-center pb-3">
              <p>Shipping</p>
              <p>90 BDT</p>
            </div>
            <div className="flex justify-between items-center pb-3">
              <p>Tax</p>
              <p>20 BDT</p>
            </div>
            <div className="flex justify-between items-center pb-3 text-xl font-semibold">
              <p>Total Price</p>
              <p>{subTotal + 90 + 20} BDT</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="py-3 font-semibold text-white bg-green-500 rounded-md"
                onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <Link
                href={'products'}
                className="py-3 font-semibold text-center text-green-500 rounded-md border-2 border-green-500">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl text-gray-500">Your Shopping Cart is Empty</p>
      )}
    </Layout>
  );
};

export default Cart;
