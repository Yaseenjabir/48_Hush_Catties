"use client";
import * as React from "react";
import { toast } from "sonner";
import { apiClient } from "../../../../../client/axiosClient";
import { GET_ALL_ORDERS } from "@/constants/constants";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrdersPage() {
  const [data, setData] = React.useState<any>([]);
  const [available, setAvailable] = React.useState(true);

  const [loader, setLoader] = React.useState(true);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [filteredData, setFilteredData] = React.useState<any>([]);

  const [activeStatus, setActiveStatus] = React.useState("all");

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        setLoader(true);
        const res = await apiClient.get(`${GET_ALL_ORDERS}`);
        console.log("Res : ", res.data);
        if (res.data.length > 0) {
          setData(res.data);
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

  const handleSelectChange = (val) => {
    if (val === "all") {
      setFilteredData([]);
      setAvailable(true);
      return;
    }
    const ans = data.filter((item) => item.status === val);
    if (ans.length === 0) {
      setAvailable(false);
    } else {
      setAvailable(true);
    }
    setActiveStatus(val);
    setFilteredData(ans);
  };

  const router = useRouter();

  return (
    <>
      <div className="w-full flex items-center justify-end mb-10">
        <Select
          defaultValue={activeStatus}
          onValueChange={(val) => handleSelectChange(val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Change status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {loader ? (
        <Spinner
          variant="spinner"
          color={`${isDarkMode ? "white" : "primary"}`}
        />
      ) : !available ? (
        <div>No orders are available</div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredData.length > 0 ? filteredData : data)?.map(
              (order, index) => (
                <div
                  key={index}
                  className={`${isDarkMode ? "bg-[#222222]" : "bg-white"} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`text-sm ${isDarkMode ? "text-white" : "text-gray-500"}`}
                    >
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
                    <p
                      className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                      Total: € {order.amountTotal.toFixed(2)}
                    </p>
                    <p
                      className={`text-sm ${isDarkMode ? "text-white" : "text-gray-500"}`}
                    >
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p
                      className={`text-sm ${isDarkMode ? "text-white" : "text-gray-500"}`}
                    >
                      Quantity: {order.products.length} items
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      router.push(`/dashboard/orders/${order._id}`);
                    }}
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Order
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
