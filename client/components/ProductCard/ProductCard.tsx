import Link from "next/link";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { MouseEvent, useEffect } from "react";
import useWishlist from "@/hooks/useWishlist";
import { useState } from "react";
import axios from "@/api/axios";

const ProductCard = ({ _id, title, imageUrl, price, description }: Product) => {
  const { addToCart, cart } = useCart();
  const { addToWishlist, wishlist, getIfWishListed } = useWishlist();
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

  return (
    <li>
      <Link
<<<<<<< HEAD
        className="grid gap-2 p-5 bg-gray-100 rounded-xl shadow-md"
        href={`/products/${_id}`}>
        {imageUrl !== 'i.ibb.co' && (
=======
        className="grid gap-2 p-5 bg-white shadow-md rounded-xl"
        href={`/products/${_id}`}
      >
        {imageUrl !== "i.ibb.co" && (
>>>>>>> 8c6554295820881bf74ddcbdcd56f5011b4d1b31
          <Image
            className="object-cover object-center w-full h-56 rounded-xl"
            src={imageUrl}
            alt={title}
            height={200}
            width={200}
          />
        )}
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-600">{description?.main.slice(0, 80)}</p>
        <footer className="flex items-center justify-between pt-2">
          <p className="flex items-center text-3xl font-bold text-green-500">
            <TbCurrencyTaka />
            <span>{price}</span>
          </p>
          <div>
            <button
              className={`p-2 mr-2 text-3xl text-pink-500 bg-pink-200 rounded-full ${
                isWishListed ? "bg-red-400" : "bg-ping-200"
              }`}
              onClick={handleAddToWishlist}
            >
              <AiOutlineHeart />
            </button>
            <button
              className="p-2 text-3xl text-white bg-green-500 rounded-full"
              onClick={handleAddToCart}
            >
              <MdAdd />
            </button>
          </div>
        </footer>
      </Link>
    </li>
  );
};

export default ProductCard;
