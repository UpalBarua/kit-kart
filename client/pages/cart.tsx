import Layout from '@/components/Layout/Layout';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard/ProductCard';

const Cart = () => {
  const { cartProducts, addToCart } = useCart();

  return (
    <Layout>
      <h2>Shopping Cart</h2>
      <ul>
        {cartProducts.map(({ product }: { product: Product }) => (
          <ProductCard key={product?._id} {...product} />
        ))}
      </ul>
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
