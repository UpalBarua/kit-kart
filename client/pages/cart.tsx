import Layout from '@/components/Layout/Layout';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard/ProductCard';
import { CartProduct, Product } from '@/types/product';
import Image from 'next/image';
import { TbCurrencyTaka } from 'react-icons/tb';
import ProductQuantity from '@/components/ProductQuantity/ProductQuantity';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxDotFilled } from 'react-icons/rx';
import { useEffect, useState } from 'react';

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
          {cartProducts.map(({ product, quantity }: CartProduct) => (
            <li className="flex gap-5 items-center" key={product?._id}>
              <Image
                className="bg-gray-200 rounded-md"
                src={product.imageUrl}
                alt={product.title}
                height={200}
                width={200}
              />
              <div>
                <h3 className="text-xl font-bold">{product.title}</h3>
                <div className="flex gap-2 items-center text-gray-500">
                  <div>
                    <span>Seller </span>
                    <span className="font-bold text-green-500">
                      {product.seller}
                    </span>
                  </div>
                  <RxDotFilled className="text-sm" />
                  <div>
                    <span>Stock </span>
                    <span className="font-bold">{product.stock}</span>
                  </div>
                </div>
                <ProductQuantity productQuantity={quantity} />
              </div>
              <div>
                <p className="flex items-center text-3xl font-semibold">
                  <TbCurrencyTaka />
                  <span>{+product.price * quantity}</span>
                </p>
                <button
                  className="flex gap-1 items-center px-4 py-2 text-red-500 bg-red-100 rounded-md"
                  onClick={() => removeFromCart(product?._id)}>
                  <AiOutlineDelete />
                  <span>Remove</span>
                </button>
              </div>
            </li>
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
          <button className="py-3 font-semibold text-green-500 rounded-md border-2 border-green-500">
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
