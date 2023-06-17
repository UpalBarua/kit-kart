import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import Link from 'next/link';
import axios from '@/api/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardProductTable from '@/components/DashboardProductTable/DashboardProductTable';
import { toast } from 'react-hot-toast';
import { Ring } from '@uiball/loaders';

function Products() {
  const queryClient = useQueryClient();

  const { data: dashboardProducts = [], isLoading } = useQuery(
    ['dashboardProducts'],
    async () => {
      const { data } = await axios.get('/products');
      return data;
    },
    {
      onSuccess: (error: any) => {
        toast.error(error.message);
      },
    }
  );

  const { mutate: deleteProduct } = useMutation(
    async (id: string) => {
      try {
        const { data } = await axios.delete(`/products?productId=${id}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['dashboardProducts']),
    }
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center">
        <h2 className="pt-3 text-2xl font-bold text-gray-500">Products</h2>
        <Link
          className="px-5 py-3 font-semibold text-white bg-green-500 rounded-md"
          href={'/dashboard/products/new'}>
          Add new product
        </Link>
      </div>
      {isLoading ? (
        <Ring size={50} lineWeight={5} speed={2} color="black" />
      ) : dashboardProducts.length ? (
        <DashboardProductTable
          products={dashboardProducts}
          deleteProduct={deleteProduct}
        />
      ) : (
        <p>Failed To Load Products</p>
      )}
    </DashboardLayout>
  );
}

export default Products;
