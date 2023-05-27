import Layout from '@/components/Layout/Layout';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cart, addToCart } = useCart();

  console.log(cart);

  return (
    <Layout>
      <h1>Hello world</h1>
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
