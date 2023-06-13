import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';

function Users() {
  const { data: dashboardUsers = [] } = useQuery(
    ['dashboardUsers'],
    async () => {
      try {
        const { data } = await axios.get('/users');
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  console.log(dashboardUsers);

  return (
    <section className="p-10">
      <h2 className="pb-2 text-2xl font-bold">Users</h2>
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dashboardUsers.map(({ _id, name, email }) => (
                    <tr
                      key={_id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Users;
