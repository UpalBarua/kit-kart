import useUser from '@/hooks/useUser';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';

function Profile() {
  const {
    userData: { _id, userName, email },
  } = useUser();
  const { user, logOut } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: profileOrders = [] } = useQuery(
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
      try {
        const { data } = await axios.delete(`/orders/${id}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['profileOrders']),
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

      {profileOrders.length > 0 ? (
        <div className="flex flex-col">
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
                        Cancel
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {profileOrders?.map(
                      ({ _id, user, quantity, isShipped, createdAt }) => (
                        <tr
                          key={_id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                            {profileOrders[0].orders
                              .map(({ product }) => product?.title)
                              .join(', ')}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                            {profileOrders[0].orders
                              .map(({ quantity }) => quantity)
                              .join(', ')}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                            <button onClick={() => cancelOrder(_id)}>
                              Cancel
                            </button>
                          </td>
                        </tr>
                      )
                    )}
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
