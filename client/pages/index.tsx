import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';
import axios from '@/api/axios';

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
