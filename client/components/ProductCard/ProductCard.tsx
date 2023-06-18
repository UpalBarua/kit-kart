import Link from 'next/link';
import Image from 'next/image';
import { TbCurrencyTaka } from 'react-icons/tb';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { MouseEvent, useEffect } from 'react';
import useWishlist from '@/hooks/useWishlist';
import { useState } from 'react';

const ProductCard = ({ _id, title, imageUrl, price, description }: Product) => {
  const { addToCart } = useCart()!;
  const { addToWishlist, wishlist } = useWishlist();
  const [isWishListed, setIsWishListed] = useState(false);

  useEffect(() => {
    setIsWishListed(
      wishlist.products?.find((product: Product) => product._id === _id)
    );
  }, [wishlist, _id]);

  const handleAddToCart = (event: MouseEvent) => {
    event.preventDefault();
    return addToCart({ productId: _id, productQuantity: 1 });
  };

  const handleAddToWishlist = (event: MouseEvent) => {
    event.preventDefault();
    setIsWishListed((prevIsWishListed) => !prevIsWishListed);
    return addToWishlist(_id);
  };

  if (imageUrl === 'i.ibb.co') return null;

  return (
    <li>
      <Link
        className="flex gap-3 p-2 bg-white rounded-xl border-2 border-gray-100 shadow-md lg:p-4 lg:flex-col"
        href={`/products/${_id}`}>
        <div>
          <Image
            style={{
              minHeight: '100%',
            }}
            className="object-cover object-center h-full bg-gray-200 rounded-xl max-w-48 lg:w-full lg:h-56"
            src={imageUrl}
            alt={title}
            height={200}
            width={200}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600">{description?.main?.slice(0, 50)}</p>
          <footer className="flex justify-between items-center pt-3 lg:pt-5">
            <p className="flex items-center text-2xl font-bold text-green-500 lg:text-3xl">
              <TbCurrencyTaka />
              <span>{price}</span>
            </p>
            <div>
              <button
                className={`p-2 mr-2 text-2xl text-pink-500 bg-pink-200 rounded-full`}
                onClick={handleAddToWishlist}>
                {isWishListed ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              <button
                className="p-2 text-2xl text-white bg-green-500 rounded-full"
                onClick={handleAddToCart}>
                <MdAdd />
              </button>
            </div>
          </footer>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
