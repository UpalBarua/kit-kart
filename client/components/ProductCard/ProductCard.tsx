import Link from 'next/link';
import Image from 'next/image';
import { TbCurrencyTaka } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';

const ProductCard = ({
  _id,
  title,
  imageUrl,
  price,
  description,
}: IProduct) => {
  const handleAddToWishlist = (event) => {
    event.preventDefault();
    console.log('added');
  };

  return (
    <li>
      <Link
        className="grid gap-2 p-5 bg-gray-100 rounded-xl shadow-md"
        href={`/products/${_id}`}>
        <Image
          className="object-cover object-center w-full h-56 rounded-xl"
          src={imageUrl}
          alt={title}
          height={200}
          width={200}
        />
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-600">{description?.main.slice(0, 100)}</p>
        <footer className="flex justify-between items-center pt-2">
          <p className="flex items-center text-3xl font-bold text-green-500">
            <TbCurrencyTaka />
            <span>{price}</span>
          </p>
          <div>
            <button
              className="p-2 mr-2 text-3xl text-pink-500 bg-pink-200 rounded-full"
              onClick={handleAddToWishlist}>
              <AiOutlineHeart />
            </button>
            <button
              className="p-2 text-3xl text-white bg-green-500 rounded-full"
              onClick={handleAddToWishlist}>
              <MdAdd />
            </button>
          </div>
        </footer>
      </Link>
    </li>
  );
};

export default ProductCard;
