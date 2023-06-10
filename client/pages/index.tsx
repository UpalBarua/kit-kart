import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';
import axios from '@/api/axios';
import React from 'react';
import Provide from '@/components/Provide/Provide';
import Testimonial from '@/components/Testimonial/Testimonial';
import Categories from '@/components/Categories/Categories';
import BestSelling from '@/components/BestSelling/BestSelling';
import NewProduct from '@/components/NewProduct/NewProduct';
import Hero from '@/components/Hero/Hero';
import Image from 'next/image';
import CategoryCard from '@/components/CategoryCard/CategoryCard';

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
      {/* <Hero></Hero> */}
      <section>
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
      {/* <BestSelling></BestSelling> */}
      {/* <NewProduct></NewProduct> */}
      {/* <Provide></Provide> */}
      {/* <Testimonial></Testimonial> */}
      <ul className="grid gap-6 lg:grid-cols-3">
        {products &&
          products?.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
      </ul>
    </Layout>
  );
};

export default Home;
