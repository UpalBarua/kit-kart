import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/ProductCard/ProductCard';
import axios from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { ChangeEvent, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { BiFilterAlt } from 'react-icons/bi';
import { Ring } from '@uiball/loaders';

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

function Products() {
  const [searchString, setSearchString] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productSort, setProductSort] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilterOpen = () => {
    setIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
  };

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

  const { data: products = [], isLoading } = useQuery(
    ['products', searchString, selectedCategories, productSort],
    async () => {
      const { data } = await axios.get(
        `/products?search=${searchString}&categories=${selectedCategories.join(
          ','
        )}&sort=${productSort}`
      );

      return data;
    },
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <Layout className="flex flex-col gap-5 lg:gap-8 lg:flex-row">
      <div className="p-6 bg-white rounded-md shadow-md h-max">
        <h2 className="pb-3 text-xl font-bold text-gray-600">
          Filter Products
        </h2>
        <div className="flex gap-2 items-center">
          <div className="flex flex-1 gap-2 items-center px-3 py-1 bg-white rounded-lg border-2 border-gray-200 lg:mb-8">
            <BsSearch className="text-xl text-gray-500" />
            <input
              className="w-48 border-0 focus:ring-0"
              placeholder="Search"
              type="text"
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
            />
          </div>
          <button
            className="p-3 text-2xl text-white bg-green-400 rounded-md lg:hidden"
            type="button"
            onClick={toggleFilterOpen}>
            <BiFilterAlt />
          </button>
        </div>
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
          <h2 className="pb-3 text-xl font-bold text-gray-600">Categories</h2>
          {categories.map((category: string, i: number) => (
            <label key={i} className="flex gap-2 items-center pb-1 w-max">
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
      </div>
      <div>
        <div className="flex justify-between items-center px-2 py-3">
          <p className="text-lg font-bold text-gray-600 lg:text-2xl lg:pe-96">
            Showing{' '}
            <span className="text-green-500">{products.length || '0'}</span>{' '}
            Products
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
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {isLoading ? (
            <Ring size={50} lineWeight={5} speed={2} color="black" />
          ) : products.length ? (
            products?.map((product: Product) => (
              <ProductCard key={product._id} {...product} />
            ))
          ) : (
            <p className="text-xl font-bold text-center text-gray-300">
              No Products Found
            </p>
          )}
        </ul>
      </div>
    </Layout>
  );
}

export default Products;
