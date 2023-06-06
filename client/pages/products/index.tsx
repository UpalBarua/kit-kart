import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import axios from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { ChangeEvent, useState } from 'react';

const categories = [
  'Fresh%20Produce',
  'Dairy',
  'Bakery',
  'Canned',
  'Snacks',
  'Beverages',
  'Pantry%20Staples',
  'Frozen%20Foods',
  'Household',
];

const sortOptions = ['default', 'ratings', 'prices', 'sales'];

const Products = () => {
  const [searchString, setSearchString] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productSort, setProductSort] = useState('');

  const handleSelectCategory = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: category } = event.target;

    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((item) => item !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?search=${searchString}&categories=${selectedCategories.join(
          ','
        )}&sort=${productSort}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery(
    ['products', searchString, selectedCategories, productSort],
    fetchProducts
  );

  return (
    <Layout className="grid gap-2 grid-1 lg:grid-cols-6">
      <div className="col-span-2 bg-green-50 rounded-xl">
        <input
          type="text"
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
        <h3>Categories</h3>
        {categories.map((category: string, i: number) => (
          <label key={i} className="flex gap-2 items-center">
            <input
              className="text-green-500 rounded-md focus:ring-0"
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleSelectCategory}
            />
            {decodeURIComponent(category)}
          </label>
        ))}
      </div>
      <div className="col-span-4">
        {isLoading && <p>Products loading...</p>}
        {isError && <p>Failed to load products!</p>}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-gray-700">
            Showing <span className="text-green-500">{products.length}</span>{' '}
            search results
          </p>
          <form>
            <label className="me-3" htmlFor="cars">
              Sort by
            </label>
            <select
              className="rounded-md"
              name="cars"
              id="cars"
              onChange={(event) => setProductSort(event.target.value)}>
              {sortOptions.map((option: string, i: number) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </form>
        </div>
        <ul className="grid gap-6 lg:grid-cols-3">
          {products?.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Products;
