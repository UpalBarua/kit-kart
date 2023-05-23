import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { TbCurrencyTaka } from 'react-icons/tb';
import { MdAdd } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Home = () => {
  return (
    <Layout>
      <ul className="grid gap-6 lg:grid-cols-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ul>
    </Layout>
  );
};

export default Home;
