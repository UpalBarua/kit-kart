import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import { RxDotFilled } from 'react-icons/rx';
import { AiFillStar, AiFillLike } from 'react-icons/ai';
import { TbCurrencyTaka } from 'react-icons/tb';
import { BsCart3, BsFillShareFill } from 'react-icons/bs';
import { ImPriceTag } from 'react-icons/im';
import { GoReport } from 'react-icons/go';
import axios from '@/api/axios';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import ProductQuantity from '@/components/ProductQuantity/ProductQuantity';
import { useCart } from '@/contexts/CartContext';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import { Product } from '@/types/product';
import ReviewForm from '@/components/ReviewForm/ReviewForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Review } from '@/types/review';
import { toast } from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';

export const getStaticPaths = async () => {
  try {
    const { data: products } = await axios.get('/products');

    const paths = products.map(({ _id }: { _id: string }) => {
      return {
        params: {
          productId: _id,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (error: any) {
    console.log('Error fetching products: ', error);

    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps = async ({
  params,
}: {
  params: { productId: string };
}) => {
  try {
    const { data } = await axios.get(`/products/${params?.productId}`);

    return {
      props: {
        productDetails: data,
      },
    };
  } catch (error: any) {
    console.log('Failed to fetch product details: ', error);

    return {
      props: {
        productDetails: {},
      },
    };
  }
};

function ProductDetails({ productDetails }: { productDetails: Product }) {
  const [productQuantity, setProductQuantity] = useState(1);
  const [isReviewEditing, setIsReviewEditing] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const {
    userData: { _id: userId },
  } = useUser();

  const handleReviewEditing = () => {
    setIsReviewEditing((prevIsReviewEditing) => !prevIsReviewEditing);
  };

  const {
    _id,
    title,
    imageUrl,
    ratingAvg,
    reviewsCount,
    salesCount,
    seller,
    description,
    price,
    stock,
  } = productDetails || {};

  const handleAddToCart = () => {
    if (!userId) {
      return toast.error('You need to be logged in');
    }

    addToCart({ productId: _id, productQuantity });
  };

  const { data: reviews = [] } = useQuery(['reviews', _id], async () => {
    try {
      const { data } = await axios.get(`/reviews?productId=${_id}`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  });

  const handleCheckout = async () => {
    if (!userId) {
      return toast.error('You need to be logged in');
    }

    try {
      const { data } = await axios.post('/payment/create-checkout-session', {
        products: [{ product: productDetails, quantity: productQuantity }],
      });

      if (data?.url) {
        await axios.post('/orders', {
          user: userId,
          orders: [{ product: productDetails, quantity: productQuantity }],
        });

        router.push(data.url);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <PhotoProvider>
      <Layout>
        <section className="grid grid-cols-1 gap-8 py-2 lg:py-6 lg:grid-cols-10">
          <div className="rounded-md lg:col-span-3 shadow-m">
            <PhotoView src={imageUrl}>
              <Image
                src={imageUrl}
                alt={title}
                height={500}
                width={500}
                className="w-full h-[20rem] lg:h-[25rem] object-cover object-center rounded-xl shadow-lg bg-white"
              />
            </PhotoView>
          </div>
          <div className="grid gap-1 content-start lg:col-span-4">
            <h2 className="text-2xl font-bold text-gray-800 capitalize lg:text-3xl">
              {title}
            </h2>
            <div className="flex gap-2 items-center text-lg text-gray-500">
              <div className="flex items-center">
                <AiFillStar className="text-lg text-yellow-500 me-1" />
                <span className="font-bold">{ratingAvg}</span>
                &nbsp;Ratings
              </div>
              <RxDotFilled className="text-sm" />
              <div>
                <span className="font-bold">{reviewsCount}+</span> Reviews
              </div>
              <RxDotFilled className="text-sm" />
              <div>
                <span className="font-bold">{salesCount}+</span> Sold
              </div>
            </div>
            <div className="flex gap-2 items-center pb-3 text-lg text-gray-500 lg:pb-5">
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
            <div className="flex justify-between items-center pb-3">
              <p className="flex items-center text-4xl font-bold text-gray-800">
                <TbCurrencyTaka />
                <span>{price}</span>
              </p>
              <ProductQuantity
                productQuantity={productQuantity}
                setProductQuantity={setProductQuantity}
              />
            </div>
            <div className="flex gap-2 pb-6">
              <button
                className="flex flex-1 gap-2 justify-center items-center px-6 py-3 font-semibold text-white bg-green-500 rounded-lg border-2 border-green-500 shadow"
                onClick={handleCheckout}>
                <ImPriceTag className="text-xl" />
                <span>Buy Now</span>
              </button>
              <button
                className="flex flex-1 gap-2 justify-center items-center px-6 py-3 font-semibold text-green-500 bg-white rounded-lg border-2 border-green-500 shadow"
                onClick={handleAddToCart}>
                <BsCart3 className="text-xl" />
                <span>Add to Cart</span>
              </button>
            </div>
            {/* Description */}
            <div className="grid gap-2 pb-5">
              <h3 className="text-xl font-bold capitalize">Description</h3>
              <p className="text-gray-600">{description?.main}</p>
              <ul className="list-disc list-inside text-gray-600">
                {description?.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
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
          <div className="pb-5 lg:col-span-3">
            <div className="flex justify-between items-center pb-6 text-xl">
              <h2 className="font-bold capitalize">Top Reviews</h2>
              {userId ? (
                <button
                  className={`p-1 text-2xl text-white rounded-full ${
                    isReviewEditing ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  onClick={handleReviewEditing}>
                  {isReviewEditing ? <MdOutlineClose /> : <MdAdd />}
                </button>
              ) : null}
            </div>
            <ReviewForm
              isReviewEditing={isReviewEditing}
              setIsReviewEditing={setIsReviewEditing}
              productId={_id}
            />
            <ul className="grid gap-3 lg:gap-8">
              {reviews?.map((review: Review) => (
                <ReviewCard key={review._id} {...review} />
              ))}
            </ul>
          </div>
        </section>
      </Layout>
    </PhotoProvider>
  );
}

export default ProductDetails;
