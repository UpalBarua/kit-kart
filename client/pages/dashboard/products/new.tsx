import { useForm } from 'react-hook-form';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import axios from '@/api/axios';

function New() {
  const { register, handleSubmit } = useForm();

  const handleAddProduct = async ({
    title,
    price,
    stock,
    category,
    description,
  }) => {
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
      const { data } = await axios.post('/products', newProduct);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="pb-2 text-2xl font-bold">Add New Product</h2>
      {/* TODO : add image upload */}
      <form className={'grid gap-2'} onSubmit={handleSubmit(handleAddProduct)}>
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
          Add
        </button>
      </form>
    </DashboardLayout>
  );
}

export default New;
