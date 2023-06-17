import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { Ring } from '@uiball/loaders';

function Users() {
  const queryClient = useQueryClient();

  const { data: dashboardUsers = [], isLoading } = useQuery(
    ['dashboardUsers'],
    async () => {
      try {
        const { data } = await axios.get('/user');
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  const { mutate: handleDeleteUser } = useMutation(
    async (id: string) => {
      try {
        const { data } = await axios.delete(`/user/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['dashboardUsers']),
    }
  );

  const { mutate: handleMakeAdmin } = useMutation(
    async ({ id, isAdmin }: { id: string; isAdmin: boolean }) => {
      try {
        const { data } = await axios.patch(`/user/${id}`, {
          isAdmin,
        });
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['dashboardUsers']),
    }
  );

  return (
    <DashboardLayout>
      <h2 className="pt-3 text-2xl font-bold text-gray-500">Users</h2>
      {isLoading ? (
        <Ring size={50} lineWeight={5} speed={2} color="black" />
      ) : dashboardUsers.length ? (
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {dashboardUsers.map(({ _id, userName, email, isAdmin }) => (
                      <tr
                        key={_id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                          {userName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                          {email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                          <button
                            className="flex gap-1 items-center px-4 py-2 text-sm text-red-500 bg-red-100 rounded-md shadow-sm"
                            onClick={() => handleDeleteUser(_id)}>
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                          {isAdmin ? (
                            <button
                              className="flex gap-1 items-center px-4 py-2 text-sm text-green-500 bg-green-100 rounded-md shadow-sm"
                              onClick={() =>
                                handleMakeAdmin({ id: _id, isAdmin: false })
                              }>
                              Remove Admin
                            </button>
                          ) : (
                            <button
                              className="flex gap-1 items-center px-4 py-2 text-sm text-green-500 bg-green-100 rounded-md shadow-sm"
                              onClick={() =>
                                handleMakeAdmin({ id: _id, isAdmin: true })
                              }>
                              Make Admin
                            </button>
                          )}
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
        <p>Failed To Load Users</p>
      )}
    </DashboardLayout>
  );
}

export default Users;
