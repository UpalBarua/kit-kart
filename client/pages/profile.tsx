import useUser from '@/hooks/useUser';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import { useRouter } from 'next/router';

function Profile() {
  const { _id, userName, email } = useUser();
  const { user, logOut } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: profileOrders = [] } = useQuery(['profileOrders'], async () => {
    try {
      const { data } = await axios.get(`/orders/${_id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  });

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
    const res = await logOut();
    console.log(res);
  };

  console.log({ user });
  // if (!_id) {
  //   router.push('/login');
  // }

  return (
    <Layout>
      <h2>{userName}</h2>
      <p>{email}</p>
      <button onClick={handleLogOut}>Log Out</button>
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
    </Layout>
  );
}

export default Profile;
