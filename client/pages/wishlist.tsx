import { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import useWishlist from '@/hooks/useWishlist';
import { Ring } from '@uiball/loaders';

const Wishlist = () => {
  const { push } = useRouter();
  const { wishlist, isLoading } = useWishlist();

  const {
    userData: { _id },
    userIsLoading,
  } = useUser();

  useEffect(() => {
    if (!userIsLoading && !_id) {
      push('/');
    }
  }, [_id, userIsLoading, push]);

  return (
    <Layout>
      <h2 className="pb-3 text-2xl font-bold">Your Wishlist</h2>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
        {isLoading ? (
          <Ring size={50} lineWeight={5} speed={2} color="black" />
        ) : wishlist.products?.length ? (
          wishlist.products.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p>No Products Found</p>
        )}
      </ul>
    </Layout>
  );
};

export default Wishlist;
