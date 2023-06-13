import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import Link from 'next/link';
import axios from '@/api/axios';
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import DashboardProductTable from '@/components/DashboardProductTable/DashboardProductTable';

function Products() {
  const queryClient = useQueryClient();

  const { data: dashboardProducts = [] } = useQuery(
    ['dashboardProducts'],
    async () => {
      try {
        const { data } = await axios.get('/products');
        return data;
      } catch (error) {
        console.log(error);
      }
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
      <Link
        className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md"
        href={'/dashboard/products/new'}>
        Add new product
      </Link>
      <DashboardProductTable
        products={dashboardProducts}
        deleteProduct={deleteProduct}
      />
    </DashboardLayout>
  );
}

export default Products;
