import Layout from '@/components/Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';

const Wishlist = () => {
  const { _id } = useUser();
  const { push } = useRouter();

  const { data: wishlistProducts = [] } = useQuery(
    ['wishlistProducts'],
    async () => {
      try {
        const { data } = await axios.get(`/wishlist?email=${'upal@mail.com'}`);
        return data.products;
      } catch (error: any) {
        throw new Error('Failed to fetch wishlist products');
      }
    }
  );

  if (!_id) {
    push('/login');
  }

  return (
    <Layout>
      <h2 className="pb-3 text-2xl font-bold">Your Wishlist</h2>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
        {wishlistProducts.map((product: Product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </ul>
    </Layout>
  );
};

export default Wishlist;
