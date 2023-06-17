import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxDotFilled } from 'react-icons/rx';
import ProductQuantity from '@/components/ProductQuantity/ProductQuantity';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Product } from '@/types/product';
import { useState, useEffect } from 'react';
import axios from '@/api/axios';
import useUser from '@/hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();

  const [productQuantity, setProductQuantity] = useState(quantity);
  const {
    userData: { email },
  } = useUser();

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        await axios.patch(
          `/cart?email=${email}&id=${cartId}&quantity=${productQuantity}`
        );
        queryClient.invalidateQueries(['cartProducts']);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    updateQuantity();
  }, [productQuantity, cartId, email, queryClient]);

  return (
    <li className="flex gap-5 items-center">
      <Image
        className="object-cover object-center w-28 h-full bg-gray-200 rounded-md md:w-48"
        src={imageUrl}
        alt={title}
        height={200}
        width={200}
      />
      <div className="flex flex-col gap-2">
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
        <div className="flex justify-between pt-4">
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
      </div>
    </li>
  );
}

export default CartItem;
