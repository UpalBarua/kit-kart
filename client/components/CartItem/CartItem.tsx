import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxDotFilled } from 'react-icons/rx';
import ProductQuantity from '@/components/ProductQuantity/ProductQuantity';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Product } from '@/types/product';
import { useState, useEffect } from 'react';
import axios from '@/api/axios';

interface CartItemProps extends Product {
  cartId: string;
  quantity: number;
  removeFromCart: (_id: string) => void;
}

function CartItem({
  _id,
  imageUrl,
  title,
  seller,
  stock,
  price,
  quantity,
  cartId,
  removeFromCart,
}: CartItemProps) {
  const [productQuantity, setProductQuantity] = useState(quantity);

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        const { data } = await axios.patch(
          `/cart?email=${'upal@mail.com'}&id=${cartId}&quantity=${productQuantity}`
        );
        console.log(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    updateQuantity();
  }, [productQuantity, cartId]);

  return (
    <li className="flex gap-5 items-center">
      <Image
        className="bg-gray-200 rounded-md"
        src={imageUrl}
        alt={title}
        height={200}
        width={200}
      />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex gap-2 items-center text-gray-500">
          <div>
            <span>Seller </span>
            <span className="font-bold text-green-500">{seller}</span>
          </div>
          <RxDotFilled className="text-sm" />
          <div>
            <span>Stock </span>
            <span className="font-bold">{stock}</span>
          </div>
        </div>
        <ProductQuantity
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
        />
      </div>
      <div>
        <p className="flex items-center text-3xl font-semibold">
          <TbCurrencyTaka />
          <span>{(+price * quantity).toLocaleString()}</span>
        </p>
        <button
          className="flex gap-1 items-center px-4 py-2 text-red-500 bg-red-100 rounded-md"
          onClick={() => removeFromCart(_id)}>
          <AiOutlineDelete />
          <span>Remove</span>
        </button>
      </div>
    </li>
  );
}

export default CartItem;
