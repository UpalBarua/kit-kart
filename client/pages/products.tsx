import { useState } from 'react';
import productImg from '@/assets/images/product.jpg';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import { RxDotFilled } from 'react-icons/rx';
import { AiFillStar, AiFillLike } from 'react-icons/ai';
import { TbCurrencyTaka } from 'react-icons/tb';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import { BsCart3, BsFillShareFill } from 'react-icons/bs';
import { ImPriceTag } from 'react-icons/im';
import { GoReport } from 'react-icons/go';

const products = () => {
  const [productQuantity, setProductQuantity] = useState(1);

  return (
    <Layout>
      <section className="grid grid-cols-1 gap-8 py-2 lg:py-6 lg:grid-cols-10">
        {/* Product Image */}
        <div className="rounded-md lg:col-span-3 shadow-m">
          <Image
            src={productImg}
            alt={'product'}
            height={500}
            width={500}
            className="w-full h-[20rem] lg:h-[25rem] object-cover object-center rounded-xl shadow-lg"
          />
        </div>

        {/* Product description */}
        <div className="grid gap-1 content-start lg:col-span-4">
          <h2 className="text-2xl font-bold text-gray-800 capitalize lg:text-3xl">
            Box of fresh tomatoes
          </h2>

          <div className="flex gap-2 items-center pb-3 text-lg text-gray-500 lg:pb-5">
            <div className="flex items-center">
              <AiFillStar className="text-lg text-yellow-500 me-1" />
              <span className="font-bold">4.9</span> Ratings
            </div>
            <RxDotFilled className="text-sm" />
            <div>
              <span className="font-bold">2.5k+</span> Reviews
            </div>
            <RxDotFilled className="text-sm" />
            <div>
              <span className="font-bold">2.9k+</span> Sold
            </div>
          </div>

          <div className="flex justify-between items-center pb-3">
            <p className="flex items-center text-4xl font-bold text-gray-800">
              <TbCurrencyTaka />
              <span>450.00</span>
            </p>

            <div className="flex gap-1 items-center px-2 py-1 rounded-lg border-2 border-gray-200">
              <button
                className="p-1 text-xl rounded-full hover:shadow hover:bg-gray-200 outline-0"
                onClick={() =>
                  setProductQuantity(
                    (prevProductQuantity) => prevProductQuantity - 1
                  )
                }>
                <GrFormSubtract />
              </button>
              <input
                className="w-16 text-center border-0 focus:ring-0"
                type="number"
                min="0"
                max="100"
                onChange={(event) => setProductQuantity(event.target.value)}
                value={productQuantity}
              />
              <button
                className="p-1 text-xl rounded-full hover:shadow hover:bg-gray-200 outline-0"
                onClick={() =>
                  setProductQuantity(
                    (prevProductQuantity) => prevProductQuantity + 1
                  )
                }>
                <GrFormAdd />
              </button>
            </div>
            {/* <p className="text-gray-500">
                Stock: <span className="font-semibold text-gray-800">886</span>
              </p> */}
          </div>

          <div className="flex gap-2 pb-6">
            <button className="flex flex-1 gap-2 justify-center items-center px-6 py-3 font-semibold text-white bg-green-500 rounded-lg border-2 border-green-500 shadow">
              <ImPriceTag className="text-xl" />
              <span>Buy Now</span>
            </button>
            <button className="flex flex-1 gap-2 justify-center items-center px-6 py-3 font-semibold text-green-500 rounded-lg border-2 border-green-500 shadow">
              <BsCart3 className="text-xl" />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Description */}
          <div className="grid gap-2 pb-5">
            <h3 className="text-xl font-bold capitalize">Description</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              architecto culpa quo assumenda maiores aut! Porro quam quis ad,
              accusamus ea totam fuga, tempora nihil tempore blanditiis, iste
              dolores eius.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Lorem ipsum dolor sit amet consectetur</li>
              <li>Lorem ipsum dolor sit amet consectetur</li>
              <li>Lorem ipsum dolor sit amet consectetur</li>
              <li>Lorem ipsum dolor sit amet consectetur</li>
              <li>Lorem ipsum dolor sit amet consectetur</li>
            </ul>
          </div>

          <div className="flex gap-5 items-center">
            <button className="flex gap-2 items-center font-semibold text-green-500">
              <BsFillShareFill />
              <span>Share Product</span>
            </button>
            <button className="flex gap-2 items-center font-semibold text-green-500">
              <GoReport />
              <span>Report Product</span>
            </button>
          </div>
        </div>

        {/* Order placement */}
        <div className="pb-5 lg:col-span-3">
          <h2 className="pb-4 text-xl font-bold capitalize">Top Reviews</h2>
          <ul className="grid gap-3 lg:gap-6">
            <li className="grid gap-3 p-4 bg-gray-50 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full shadow"></div>
                  <p className="font-semibold">Upal Barua</p>
                </div>
                <div className="flex gap-1 items-center font-semibold">
                  <AiFillStar className="text-yellow-500" />
                  <span>5.0</span>
                </div>
              </div>
              <p className="p-1 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
                nobis? Lorem ipsum dolor sit amet.
              </p>
              <footer className="flex justify-between items-center text-gray-500">
                <div className="flex gap-1 items-center text-lg">
                  <AiFillLike />
                  <span>10</span>
                </div>
                <p className="text-sm">10th May 2023</p>
              </footer>
            </li>
            <li className="grid gap-3 p-4 bg-gray-50 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full shadow"></div>
                  <p className="font-semibold">Upal Barua</p>
                </div>
                <div className="flex gap-1 items-center font-semibold">
                  <AiFillStar className="text-yellow-500" />
                  <span>5.0</span>
                </div>
              </div>
              <p className="p-1 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
                nobis? Lorem ipsum dolor sit amet.
              </p>
              <footer className="flex justify-between items-center text-gray-500">
                <div className="flex gap-1 items-center text-lg">
                  <AiFillLike />
                  <span>10</span>
                </div>
                <p className="text-sm">10th May 2023</p>
              </footer>
            </li>
            <li className="grid gap-3 p-4 bg-gray-50 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full shadow"></div>
                  <p className="font-semibold">Upal Barua</p>
                </div>
                <div className="flex gap-1 items-center font-semibold">
                  <AiFillStar className="text-yellow-500" />
                  <span>5.0</span>
                </div>
              </div>
              <p className="p-1 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
                nobis? Lorem ipsum dolor sit amet.
              </p>
              <footer className="flex justify-between items-center text-gray-500">
                <div className="flex gap-1 items-center text-lg">
                  <AiFillLike />
                  <span>10</span>
                </div>
                <p className="text-sm">10th May 2023</p>
              </footer>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default products;
