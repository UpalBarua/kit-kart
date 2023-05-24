import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import axios from '@/api/axios';

export const getStaticProps = async () => {
  const { data } = await axios.get('/products');

  return {
    props: {
      products: data,
    },
  };
};

const index = ({ products }: { products: IProduct[] }) => {
  return (
    <Layout>
      <ul className="grid gap-6 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </ul>
    </Layout>
  );
};

export default index;
