import React from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';

function Edit() {
  const { register, handleSubmit } = useForm();

  const router = useRouter();
  const { productId } = router.query;

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

  const handleEditProduct = async ({ title, description }) => {
    const newProduct = {
      title,
      imageUrl: 'i.ibb.co',
      ratingAvg: '2k',
      reviewsCount: '4k',
      salesCount: '2.6k',
      price: 300,
      stock: 400,
      seller: 'kit kart',
      category: 'Fresh',
      description: {
        main: description,
        list: [],
      },
    };

    try {
      const { data } = await axios.put(`/products/${_id}`, newProduct);
      console.log(data);
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
            {...register('title', {
              required: {
                value: true,
                message: 'Title is required',
              },
            })}
            defaultValue={title}
            type="text"
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Price (BDT)</label>
          <input
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            {...register('price', {
              required: {
                value: true,
                message: 'Price is required',
              },
            })}
            defaultValue={price}
            type="number"
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Stock Quantity</label>
          <input
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            {...register('stock', {
              required: {
                value: true,
                message: 'Stock is required',
              },
            })}
            defaultValue={stock}
            type="number"
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Category</label>
          <input
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            {...register('category', {
              required: {
                value: true,
                message: 'Category is required',
              },
            })}
            defaultValue={category}
            type="text"
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Description</label>
          <textarea
            {...register('description', {
              required: {
                value: true,
                message: 'Description is required',
              },
            })}
            defaultValue={description?.main}
            className="rounded-md border-gray-400 shadow-sm focus:ring-0 resize-border focus:r5ng-green-400"
          />
        </fieldset>
        {/* <fieldset className="grid gap-2">
          <label>Discount</label>
          <input className='shadow-sm rounded-m border-gray-400d' type="number" />
          <p classNamehidden ='text-sm text-red6500'>bla bla bla</p>
          {...register("title", {
            required: {
              value: true,
              message: "Title is required"
            }
          })}
        </fieldset> */}
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
