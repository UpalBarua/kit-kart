import Layout from '@/components/Layout/Layout';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard/ProductCard';
import { CartProduct, Product } from '@/types/product';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem/CartItem';
import Link from 'next/link';

const Cart = () => {
  const { cartProducts, addToCart, removeFromCart } = useCart();
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const summedTotal = cartProducts.reduce(
      (sum: number, { product, quantity }: CartProduct) => {
        return sum + +product.price * quantity;
      },
      0
    );

    setSubTotal(summedTotal);
  }, [cartProducts]);

  return (
    <Layout className="flex items-start">
      <div>
        <h2 className="pb-5 text-2xl font-bold">Shopping Cart</h2>
        <ul className="grid gap-5">
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
      </div>
      <div className="p-5 w-80 bg-white rounded-md shadow">
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
          <button className="py-3 font-semibold text-white bg-green-500 rounded-md">
            Proceed to Checkout
          </button>
          <Link
            href={'products'}
            className="py-3 font-semibold text-center text-green-500 rounded-md border-2 border-green-500">
            Continue Shopping
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
