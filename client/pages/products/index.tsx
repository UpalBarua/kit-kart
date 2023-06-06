import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import axios from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { useState } from 'react';

const Products = () => {
  const [searchString, setSearchString] = useState('');

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery(['products', searchString], async () => {
    try {
      const { data } = await axios.get(`/products?search=${searchString}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Layout className="grid gap-2 grid-1 lg:grid-cols-6">
      <div className="col-span-2 bg-red-400 rounded-x">
        <input
          type="text"
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quaerat
        beatae repellat deleniti! Possimus in dolor molestias, non suscipit
        earum, illo ipsa, nam quasi delectus beatae repudiandae consequatur.
        Odit optio sint vero labore voluptate accusamus quos omnis ipsum,
        distinctio excepturi aliquam quasi officiis culpa quae dolorum atque
        tenetur cum molestias.
      </div>
      {isLoading && <p>Products loading...</p>}
      {isError && <p>Failed to load products!</p>}
      <ul className="grid col-span-4 gap-6 lg:grid-cols-3">
        {products?.map((product: Product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </ul>
    </Layout>
  );
};

export default Products;
