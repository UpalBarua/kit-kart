import Layout from '@/components/Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';

const Wishlist = () => {
  const {
    data: wishlistProducts = [],
    isLoading,
    isError,
  } = useQuery(['wishlistProducts'], async () => {
    try {
      const { data } = await axios.get(`/wishlist?email=${'upal@mail.com'}`);
      return data.products;
    } catch (error: any) {
      throw new Error('Failed to fetch wishlist products');
    }
  });

  return (
    <Layout>
      <ul>
        {wishlistProducts.map((product: Product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </ul>
    </Layout>
  );
};

export default Wishlist;
