import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import axios from '@/api/axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import uploadImage from '@/utils/uploadImage';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function New() {
  const [userImg, setUserImg] = useState('');
  const [imgPreview, setImgPreview] = useState('');

  const { register, handleSubmit } = useForm();
  const { back } = useRouter();

  const handleAddProduct = async ({
    title,
    price,
    stock,
    category,
    description,
  }) => {
    const imageUrl = await uploadImage(userImg);

    const newProduct = {
      title,
      imageUrl,
      ratingAvg: '2k',
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
      const { data } = await axios.post('/products', newProduct);
      if (data) {
        back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userImg) {
      return setImgPreview('');
    }

    const objectURL = URL.createObjectURL(userImg);
    setImgPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [userImg]);

  return (
    <DashboardLayout>
      <h2 className="pb-5 text-2xl font-bold text-gray-600">Add New Product</h2>
      <form
        className={'grid gap-4 lg:gap-6 lg:pe-96'}
        onSubmit={handleSubmit(handleAddProduct)}>
        <div className="p-5 bg-white rounded-md shadow">
          {imgPreview && (
            <Image
              height={200}
              width={200}
              src={imgPreview}
              alt="Upload Image"
            />
          )}
          <input
            className="pt-2"
            type="file"
            onChange={(event) => setUserImg(event.target.files[0])}
          />
        </div>
        <fieldset className="grid gap-2">
          <label>Product Title</label>
          <input
            className="py-3 rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            {...register('title', {
              required: {
                value: true,
                message: 'Title is required',
              },
            })}
            type="text"
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Price (BDT)</label>
          <input
            className="py-3 rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            {...register('price', {
              required: {
                value: true,
                message: 'Price is required',
              },
            })}
            type="number"
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Stock Quantity</label>
          <input
            className="py-3 rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            {...register('stock', {
              required: {
                value: true,
                message: 'Stock is required',
              },
            })}
            type="number"
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label>Category</label>
          <input
            className="py-3 rounded-md border-gray-400 shadow-sm focus:ring-0 focus:border-green-500"
            {...register('category', {
              required: {
                value: true,
                message: 'Category is required',
              },
            })}
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
            className="py-3 rounded-md border-gray-400 shadow-sm focus:ring-0 resize-border focus:r5ng-green-400"
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
          Add
        </button>
      </form>
    </DashboardLayout>
  );
}

export default New;
