import Link from 'next/link';
import Image from 'next/image';
import img from '../../assets/images/product.jpg';
import { TbCurrencyTaka } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';

const ProductCard = () => {
  return (
    <li>
      <Link
        className="grid gap-2 p-5 text-center bg-gray-100 rounded-xl shadow-md"
        href={'/'}>
        <Image
          className="object-cover object-center w-full h-56 rounded-xl"
          src={img}
          alt="product"
          height={200}
          width={200}
        />
        <h3 className="text-2xl font-bold">Box of fresh tomatoes</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          accusantium.
        </p>
        <footer className="flex justify-between items-center pt-2">
          <p className="flex items-center text-3xl font-bold text-green-500">
            <TbCurrencyTaka />
            <span>450.00</span>
          </p>
          <div>
            <button className="p-2 mr-2 text-3xl text-pink-500 bg-pink-200 rounded-full">
              <AiOutlineHeart />
            </button>
            <button className="p-2 text-3xl text-white bg-green-500 rounded-full">
              <MdAdd />
            </button>
          </div>
        </footer>
      </Link>
    </li>
  );
};

export default ProductCard;
