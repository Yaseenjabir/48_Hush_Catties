"use client";
import * as React from "react";
import { apiClient } from "../../../../../../client/axiosClient";
import { GET_SINGLE_ORDERS, UPDATE_STATUS } from "@/constants/constants";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@mui/material"; // Import useTheme from MUI
import Image from "next/image";
import { locations } from "@/lib/locations";

export default function Page() {
  const { slug } = useParams();
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

  async function handleOrderChange(status) {
    try {
      setLoader(true);
      const res = await apiClient.patch(UPDATE_STATUS, {
        orderId: data._id,
        status,
      });
      if (res.status === 200) {
        toast.success("Status has been updated successfully");
        setData((prev) => ({ ...prev, status }));
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  // Helper function to get country name
  const getCountryName = (countryValue: string) => {
    const country = locations.find((loc) => loc.value === countryValue);
    return country ? country.countryName : countryValue; // Fallback to value if not found
  };

  // Helper function to get state name
  const getStateName = (stateValue: string) => {
    const country = locations.find((loc) =>
      loc.states.some((state) => state.value === stateValue)
    );
    if (country) {
      const state = country.states.find((state) => state.value === stateValue);
      return state ? state.stateName : stateValue; // Fallback to value if not found
    }
    return stateValue; // Fallback to value if country not found
  };

  // Helper function to get city name
  const getCityName = (cityValue: string) => {
    const country = locations.find((loc) =>
      loc.states.some((state) =>
        state.cities.some((city) => city.value === cityValue)
      )
    );
    if (country) {
      const state = country.states.find((state) =>
        state.cities.some((city) => city.value === cityValue)
      );
      if (state) {
        const city = state.cities.find((city) => city.value === cityValue);
        return city ? city.cityName : cityValue; // Fallback to value if not found
      }
    }
    return cityValue; // Fallback to value if country or state not found
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Orders
      </h1>

      {loader ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Spinner
            variant="spinner"
            color={`${isDarkMode ? "white" : "primary"}`}
          />
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
                {new Date(data?.createdAt).toLocaleDateString()}
              </p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                <span className="font-medium">Status : </span>{" "}
                <Select
                  defaultOpen
                  defaultValue={data.status}
                  onValueChange={(val) => handleOrderChange(val)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  {data?.customerDetails.address.line2},{" "}
                  {getCityName(data?.customerDetails.address.city)},{" "}
                  {getStateName(data?.customerDetails.address.state)}{" "}
                  {getCountryName(data?.customerDetails.address.country)}
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
