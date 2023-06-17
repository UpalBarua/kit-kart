import useUser from '@/hooks/useUser';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

function Profile() {
  const {
    userData: { _id, userName, email },
  } = useUser();

  const { logOut } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: profileOrders = [], isLoading } = useQuery(
    ['profileOrders'],
    async () => {
      try {
        const { data } = await axios.get(`/orders/${_id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: !!_id,
    }
  );

  const { mutate: cancelOrder } = useMutation(
    async (id: string) => {
      return await axios.delete(`/orders/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profileOrders']);
        toast.success('Order canceled');
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );

  const handleLogOut = async () => {
    try {
      await logOut();
      queryClient.invalidateQueries();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center w-10 h-10 text-green-800 bg-gray-200 rounded-full">
          <AiOutlineUser className="text-3xl" />
        </div>
        <div className="hidden lg:block">
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
        <button
          className="flex gap-1 items-center px-4 py-2 font-semibold text-red-500 bg-red-100 rounded-md ms-8"
          onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      {isLoading ? (
        <p>Orders Are Loading</p>
      ) : profileOrders.length ? (
        <div className="flex flex-col p-2 my-6 bg-white rounded-md shadow">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                        Cancel
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {profileOrders?.map(({ _id, orders, createdAt }) => (
                      <tr
                        key={_id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                          {orders
                            .map(({ product }) => product?.title)
                            .join(', ')}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                          {orders.map(({ quantity }) => quantity).join(', ')}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                          {createdAt &&
                            format(new Date(createdAt), 'MMMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                          <button
                            onClick={() => cancelOrder(_id)}
                            className="px-4 py-2 text-sm font-semibold text-red-500 bg-red-100 rounded-md">
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="px-2 py-5 text-xl text-gray-500">You Have No Orders</p>
      )}
    </Layout>
  );
}

export default Profile;
