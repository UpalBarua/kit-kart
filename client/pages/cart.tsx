import Layout from '@/components/Layout/Layout';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard/ProductCard';
import { CartProduct } from '@/types/product';

const Cart = () => {
  const { cartProducts, addToCart, removeFromCart } = useCart();

  return (
    <Layout>
      <h2>Shopping Cart</h2>
      <ul className="grid gap-5">
        {cartProducts.map(({ product, quantity }: CartProduct) => (
          <li className="flex gap-5 items-center" key={product?._id}>
            <ProductCard {...product} />
            <p>x{quantity}</p>
            <p>price: {+product.price * quantity}</p>
            <button onClick={() => removeFromCart(product?._id)}>Remove</button>
          </li>
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
