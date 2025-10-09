import { Helmet } from "react-helmet-async";

import SellerOrderDataRow from "../../../components/Dashboard/TableRows/SellerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/seller-orders/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <title>Manage Orders</title>
      </Helmet>
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="py-8">
          {/* Table container with scroll for small screens */}
          <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full table-auto leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-xs sm:text-sm uppercase font-semibold text-left">
                    Name
                  </th>
                  <th className="px-3 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-xs sm:text-sm uppercase font-semibold text-left">
                    Customer
                  </th>
                  <th className="px-3 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-xs sm:text-sm uppercase font-semibold text-left">
                    Price
                  </th>
                  <th className="px-3 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-xs sm:text-sm uppercase font-semibold text-left">
                    Quantity
                  </th>
                  <th className="px-3 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-xs sm:text-sm uppercase font-semibold text-left">
                    Address
                  </th>
                  <th className="px-3 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-xs sm:text-sm uppercase font-semibold text-left">
                    Status
                  </th>
                  <th className="px-3 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-xs sm:text-sm uppercase font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((orderData) => (
                  <SellerOrderDataRow
                    key={orderData._id}
                    orderData={orderData}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 Mobile Card View */}
          <div className="grid gap-4 mt-6 sm:hidden">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Name:</span> Product Name
              </p>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Customer:</span> John Doe
              </p>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Price:</span> $120
              </p>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Quantity:</span> 2
              </p>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Address:</span> Dhaka,
                Bangladesh
              </p>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Status:</span> Pending
              </p>
              <div className="mt-3 flex justify-end">
                <button className="bg-green-500 text-white text-xs px-3 py-1 rounded-md hover:bg-green-600 transition">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
