import React from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { Category } from '@/types/Category';

export const getStaticProps = async () => {
  try {
    const { data } = await axios.get('/categories');

    return {
      props: {
        categories: data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        categories: [],
      },
    };
  }
};

function Edit({ categories }: { categories: Category[] }) {
  console.log(categories);

  const { back, query } = useRouter();
  const { productId } = query;

  const { data: productDetails = {} } = useQuery(
    ['productDetails', productId],
    async () => {
      try {
        const { data } = await axios.get(`/products/${productId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  const { _id, title, price, stock, category, description } = productDetails;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title,
      price,
      stock,
      category,
      description: description?.main,
    },
  });

  const handleEditProduct = async ({
    title,
    price,
    stock,
    category,
    description,
  }) => {
    const updatedProduct = {
      title,
      ratingAvg: '4.8',
      reviewsCount: '4k',
      salesCount: '2.6k',
      price,
      stock,
      seller: 'kit kart',
      category,
      description: {
        main: description,
        list: [],
      },
    };

    try {
      const { data } = await axios.put(`/products/${_id}`, updatedProduct);
      if (data) {
        back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="pb-2 text-2xl font-bold">Edit Product Details</h2>
      <form className={'grid gap-2'} onSubmit={handleSubmit(handleEditProduct)}>
        <fieldset className="grid gap-2">
          <label>Product Title</label>
          <input
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            // value={title}
            type="text"
            {...register('title')}
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Price (BDT)</label>
          <input
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            // value={price}
            type="number"
            {...register('price')}
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Stock Quantity</label>
          <input
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            // value={stock}
            type="number"
            {...register('stock')}
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Category</label>
          <input
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            // value={category}
            type="text"
            {...register('category')}
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Description</label>
          <textarea
            // value={description?.main}
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 resize-border focus:r5ng-green-400"
            {...register('description')}
          />
        </fieldset>
        <button
          className="py-3 text-lg font-semibold text-white bg-green-500 rounded-md"
          type="submit">
          Save Changes
        </button>
      </form>
    </DashboardLayout>
  );
}

export default Edit;
