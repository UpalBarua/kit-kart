import Layout from '@/components/Layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem/CartItem';

const Cart = () => {
  const { cart, addToCart } = useCart();

  return (
    <Layout>
      <h2>Shopping Cart</h2>
      {cart?.map((product) => (
        <CartItem key={product?._id} {...product} />
      ))}
      <button
        onClick={() => {
          addToCart('123', 123);
        }}>
        click
      </button>
    </Layout>
  );
};

export default Cart;
