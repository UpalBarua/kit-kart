import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';
import axios from '@/api/axios';
import React from 'react';
import Image from 'next/image';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts';
import Testimonial from '@/components/Testimonial/Testimonial';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  {
    title: 'Fresh%20Produce',
    icon: '/assets/categories/fresh-produce.svg',
    bgColor: 'yellow',
  },
  { title: 'Dairy', icon: '/assets/categories/dairy.svg', bgColor: 'purple' },
  { title: 'Bakery', icon: '/assets/categories/bakery.svg', bgColor: 'lime' },
  { title: 'Canned', icon: '/assets/categories/canned.svg', bgColor: 'red' },
  {
    title: 'Snacks',
    icon: '/assets/categories/snacks.svg',
    bgColor: 'orange',
  },
  {
    title: 'Beverages',
    icon: '/assets/categories/beverages.svg',
    bgColor: 'teal',
  },
  {
    title: 'Pantry%20Staples',
    icon: '/assets/categories/pantry.svg',
    bgColor: 'indigo',
  },
  // {
  //   title: 'Frozen%20Foods',
  //   icon: '/assets/categories/frozen.svg',
  //   bgColor: 'pink',
  // },
  {
    title: 'Household',
    icon: '/assets/categories/household.svg',
    bgColor: 'fuchsia',
  },
];

export const getStaticProps = async () => {
  try {
    const { data } = await axios.get('/products');

    return {
      props: {
        products: data,
      },
    };
  } catch (error: any) {
    console.log('Failed to fetch products: ', error.message);

    return {
      props: {
        products: [],
      },
    };
  }
};

const Home = ({ products }: { products: Product[] }) => {
  return (
    <Layout>
      <section className="flex flex-col gap-2 pb-16 text-center">
        <h1 className="flex gap-3 justify-center items-center text-3xl font-bold tracking-wide text-green-500">
          <AiOutlineShoppingCart className="text-5xl" />
          <span>Kit Kart</span>
        </h1>
        <p className="text-xl font-semibold text-gray-600 capitalize">
          Bring the Store to Your Door
        </p>
        <p className="px-6 text-gray-500">
          Discover new amazing Grocery Deals, We supply high quality organic
          products
        </p>
        <FeaturedProducts products={products.slice(0, 8)} />
      </section>
      <section className="pb-16">
        <p className="font-semibold text-gray-500 lg:text-lg">
          Browser Our Hottest
        </p>
        <h2 className="pb-5 text-2xl font-bold text-green-500 uppercase lg:text-3xl lg:pb-6">
          Categories
        </h2>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-5 lg:grid-cols-8">
          {categories.map((category, i) => (
            <CategoryCard key={i} {...category} />
          ))}
        </ul>
      </section>
      <section className="pb-16">
        <p className="font-semibold text-gray-500 lg:text-lg">
          Browser New Products
        </p>
        <h2 className="pb-5 text-2xl font-bold text-green-500 uppercase lg:text-3xl lg:pb-6">
          New Products
        </h2>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
          {products.slice(8, 17).map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </ul>
      </section>
      <section className="pb-16">
        <p className="font-semibold text-gray-500 lg:text-lg">
          See Our Bestselling Products
        </p>
        <h2 className="pb-5 text-2xl font-bold text-green-500 uppercase lg:text-3xl lg:pb-6">
          Bestsellers
        </h2>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
          {products.slice(17, 25).map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </ul>
      </section>
      <section className="pb-16">
        <p className="font-semibold text-gray-500 lg:text-lg">
          Products On Sale
        </p>
        <h2 className="pb-5 text-2xl font-bold text-green-500 uppercase lg:text-3xl lg:pb-6">
          Discounted Products
        </h2>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
          {products.slice(25, 34).map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </ul>
      </section>
      <section className="pb-16">
        <p className="font-semibold text-gray-500 lg:text-lg">
          What Are Customers Saying?
        </p>
        <h2 className="pb-5 text-2xl font-bold text-green-500 uppercase lg:text-3xl lg:pb-6">
          Testimonials
        </h2>
        <Testimonial />
      </section>
    </Layout>
  );
};

export default Home;
