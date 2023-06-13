import { Product } from '@/types/product';
import Link from 'next/link';
import React from 'react';

interface DashboardProductTableProps {
  products: Product[];
  deleteProduct: (productId: string) => void;
}

function DashboardProductTable({
  products,
  deleteProduct,
}: DashboardProductTableProps) {
  return (
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
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase">
                    Sales
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase">
                    Ratings
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase">
                    Seller
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map(
                  ({
                    _id,
                    title,
                    price,
                    stock,
                    salesCount,
                    ratingAvg,
                    seller,
                  }) => (
                    <tr
                      key={_id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                        {stock}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        {salesCount}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        {ratingAvg}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        {seller}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="flex gap-1 items-center px-4 py-2 text-sm text-red-500 bg-red-100 rounded-md shadow-sm"
                          onClick={() => deleteProduct(_id)}>
                          Delete
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <Link
                          href={`/dashboard/products/edit?productId=${_id}`}
                          className="flex gap-1 items-center px-4 py-2 text-sm text-green-500 bg-green-100 rounded-md shadow-sm">
                          Edit
                        </Link>
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
  );
}

export default DashboardProductTable;
