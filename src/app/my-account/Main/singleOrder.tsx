"use client";
import * as React from "react";
import { GET_SINGLE_ORDERS } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";

import { useTheme } from "@mui/material"; // Import useTheme from MUI
import Image from "next/image";
import { apiClient } from "../../../../client/axiosClient";
import Heading from "./Heading";

export default function SingleOrder() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("_id");

  const [data, setData] = React.useState<any>();
  const [loader, setLoader] = React.useState(true);
  const theme = useTheme(); // Get the current theme from MUI
  const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is active

  React.useEffect(() => {
    const fetchData = async () => {
      if (data !== undefined) {
        return;
      }
      try {
        setLoader(true);
        const res = await apiClient.get(`${GET_SINGLE_ORDERS}${slug}`);
        if (res.status === 200) {
          setData(res.data);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [slug, data]);

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
      }`}
    >
      <Heading text="Order details" />

      {loader ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Spinner variant="spinner" />
        </div>
      ) : data === undefined ? (
        <p className={isDarkMode ? "text-white" : "text-black"}>
          No data available
        </p>
      ) : (
        <div
          key={data?._id}
          className={`rounded-lg shadow-md p-6 mb-6 ${
            isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Order #{data?._id}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                <span className="font-medium">Order Date:</span>{" "}
                {new Date(data?.createdAt).toLocaleString()}
              </p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                <span className="font-medium">Status : </span>{" "}
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    data.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : data.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {data.status}
                </span>
              </p>
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                <span className="font-medium">Total Amount:</span> €{" "}
                {(data?.amountTotal / 100).toFixed(2)}
              </p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                <span className="font-medium">Customer:</span>{" "}
                {data?.userId.firstName} {data?.userId.lastName}
              </p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                <span className="font-medium">Email:</span> {data?.userId.email}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3
              className={`text-lg font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Customer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  <span className="font-medium">Name:</span>{" "}
                  {data?.customerDetails.name}
                </p>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  <span className="font-medium">Email:</span>{" "}
                  {data?.customerDetails.email}
                </p>
              </div>
              <div>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  <span className="font-medium">Address:</span>{" "}
                  {data?.customerDetails.address.line1},{" "}
                  {data?.customerDetails.address.line2 && (
                    <>{data?.customerDetails.address.line2}, </>
                  )}
                  {data?.customerDetails.address.city},{" "}
                  {data?.customerDetails.address.state}{" "}
                  {data?.customerDetails.address.postal_code},{" "}
                  {data?.customerDetails.address.country}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Products
            </h3>
            {data?.products.map((product, index) => (
              <div
                key={index}
                className="border-b border-gray-200 py-4 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300} // Set the width (required)
                    height={300} // Set the height (required)
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4
                      className={`text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {product.name}
                    </h4>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      {product.description.slice(0, 200) + "..."}
                    </p>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      <span className="font-bold">Price :</span> $
                      {product.price.toFixed(2)}
                    </p>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      <span className="font-bold">Quantity :</span>{" "}
                      {product.quantity}
                    </p>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      <span className="font-bold">Color :</span> {product.color}
                    </p>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      <span className="font-bold">Size :</span> {product.size}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
