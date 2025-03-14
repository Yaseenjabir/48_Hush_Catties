"use client";
import * as React from "react";
import { toast } from "sonner";
import { apiClient } from "../../../../../client/axiosClient";
import { GET_ALL_ORDERS } from "@/constants/constants";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@mui/material";

export default function OrdersPage() {
  const [data, setData] = React.useState<any>([]);
  const [available, setAvailable] = React.useState(true);
  const [loader, setLoader] = React.useState(true);
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";
  React.useEffect(() => {
    async function fetchOrders() {
      try {
        setLoader(true);
        const res = await apiClient.get(`${GET_ALL_ORDERS}?status=processing`);
        console.log("res.data : ", res.data);
        if (res.data.length > 0) {
          const products = res.data?.flatMap((item: any) =>
            item.products.map((product) => ({
              product, // The product itself
              createdAt: item.createdAt,
              amountTotal: item.amountTotal,
              status: item.status,
              _id: item._id,
            }))
          );
          setData(products);
          setAvailable(true);
        } else {
          setAvailable(false);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoader(false);
      }
    }
    fetchOrders();
  }, []);

  const router = useRouter();

  return loader ? (
    <Spinner variant="spinner" />
  ) : !available ? (
    <div>No active orders are available</div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.length > 0 &&
          data.map((order: any) => (
            <div
              key={order.product._id}
              className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${isDarkMode ? "bg-[#1a1a1a]" : "bg-white"}`}
            >
              <Image
                src={order.product.images[0]}
                alt={order.product.name}
                width={300} // Set the width (required)
                height={300} // Set the height (required)
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2
                  className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  {order.product.name.slice(0, 20) + "..."}
                </h2>
                <p
                  className={` ${isDarkMode ? "text-white" : "text-gray-600"} mb-4`}
                >
                  {order.product.description.slice(0, 50) + "..."}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <p
                    className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    € {order.product.price}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Shipped"
                        ? "bg-green-100 text-green-800"
                        : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p
                  className={`${isDarkMode ? "text-white" : "text-gray-600"} mb-2`}
                >
                  Quantity: {order.product.quantity}
                </p>
                <p className={`${isDarkMode ? "text-white" : "text-gray-600"}`}>
                  Ordered by: yaseen jabir
                </p>
                <button
                  onClick={() => router.push(`/dashboard/orders/${order._id}`)}
                  className="bg-red-700 w-full py-2 font-semibold text-white mt-4 text-sm hover:bg-red-800"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
