import React from "react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

const Orders = ({ data }) => {
  const router = useRouter();

  console.log("data is : ", data);

  return (
    <div className="p-6 min-h-screen">
      <Heading text="Orders" />
      {data.orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  Order #{index + 1}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  Total: € {(order.amountTotal / 100).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {order.products.length} items
                </p>
              </div>
              <button
                onClick={() => {
                  router.push(`/my-account/order?_id=${order._id}`);
                }}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                View Order
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No item ordered</p>
      )}
    </div>
  );
};

export default Orders;
