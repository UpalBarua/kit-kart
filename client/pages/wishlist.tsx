import { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import useWishlist from '@/hooks/useWishlist';

const Wishlist = () => {
  const {
    userData: { _id, email },
  } = useUser();
  const { push } = useRouter();
  const { wishlist } = useWishlist();

  return (
    <Layout>
      <h2 className="pb-3 text-2xl font-bold">Your Wishlist</h2>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
        {wishlist.products?.length > 0 ? (
          wishlist?.products?.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p className="text-lg text-gray-500">
            There are no products in your wishlist
          </p>
        )}
      </ul>
    </Layout>
  );
};

export default Wishlist;
