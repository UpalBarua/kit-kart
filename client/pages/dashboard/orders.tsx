import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';

function Orders() {
  const queryClient = useQueryClient();

  const { data: dashboardOrders = [] } = useQuery(
    ['dashboardOrders'],
    async () => {
      try {
        const { data } = await axios.get('/orders');
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  const { mutate: deleteOrder } = useMutation(
    async (id: string) => {
      try {
        const { data } = await axios.delete(`/orders/${id}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['dashboardOrders']),
    }
  );

  const { mutate: markAsShipped } = useMutation(
    async ({ id, isShipped }: { id: string; isShipped: boolean }) => {
      try {
        const { data } = await axios.patch(`/orders/${id}`, {
          isShipped: isShipped,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['dashboardOrders']),
    }
  );

  return (
    <DashboardLayout>
      <h2 className="pb-2 text-2xl font-bold">Orders</h2>
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
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                      Delete
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dashboardOrders.map(({ _id, user, quantity, isShipped }) => (
                    <tr
                      key={_id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {dashboardOrders[0].orders
                          .map(({ product }) => product?.title)
                          .join(', ')}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {user.userName}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {dashboardOrders[0].orders
                          .map(({ quantity }) => quantity)
                          .join(', ')}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                        <button onClick={() => deleteOrder(_id)}>delete</button>
                      </td>
                      {!isShipped && (
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                          <button
                            onClick={() =>
                              markAsShipped({ id: _id, isShipped: true })
                            }>
                            Ship Product
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Orders;
