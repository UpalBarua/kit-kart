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

const index = ({ products }: { products: Product[] }) => {
  return (
    <Layout className="grid gap-2 grid-1 lg:grid-cols-6">
      <div className="col-span-2 bg-red-400 rounded-x">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quaerat
        beatae repellat deleniti! Possimus in dolor molestias, non suscipit
        earum, illo ipsa, nam quasi delectus beatae repudiandae consequatur.
        Odit optio sint vero labore voluptate accusamus quos omnis ipsum,
        distinctio excepturi aliquam quasi officiis culpa quae dolorum atque
        tenetur cum molestias.
      </div>
      <ul className="grid col-span-4 gap-6 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </ul>
    </Layout>
  );
};

export default index;
