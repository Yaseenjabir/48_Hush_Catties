"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import { playfairDisplay } from "../my-account/Main/Heading";
import useStore from "@/store/store";
import {
  CHANGE_QUANTITY,
  CREATE_PAYMENT,
  DELETE_CART_ITEMS,
  GET_USER_PROFILE,
  getCookie,
} from "@/constants/constants";
import { apiClient } from "../../../client/axiosClient";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";

export default function Page() {
  const { items, updateItemQuantity, removeItem } = useStore();
  const [data, setData] = useState<any>([]);
  const [loader, setLoader] = useState(true); // Global loader for initial data fetch
  const [removingItemId, setRemovingItemId] = useState<string | null>(null); // Loader for removing items
  const [showNoItemsMessage, setShowNoItemsMessage] = useState(false); // Debounce for "No items available" message

  const router = useRouter();
  const token = typeof window !== "undefined" ? getCookie("authToken") : null;
  // Fetch user profile data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setLoader(true);
        const res = await apiClient.get(GET_USER_PROFILE, {
          headers: { Authorization: token },
        });
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Something went wrong");
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [token]);

  // Debounce the "No items available" message
  useEffect(() => {
    if (items.length === 0) {
      const timer = setTimeout(() => {
        setShowNoItemsMessage(true);
      }, 1000); // Delay of 1 second
      return () => clearTimeout(timer);
    } else {
      setShowNoItemsMessage(false);
    }
  }, [items]);

  // Change quantity of an item
  async function changeQuantity(productId: string, action: string) {
    try {
      const res = await apiClient.patch(
        CHANGE_QUANTITY,
        { productId, action },
        { headers: { Authorization: token } }
      );
      if (res.status === 200) {
        updateItemQuantity(res.data.productId, res.data.updatedQuantity);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  // Remove item from cart
  async function removeFromCart(productId: string) {
    try {
      setRemovingItemId(productId); // Show loader for this specific item
      const res = await apiClient.delete(
        `${DELETE_CART_ITEMS}?productId=${productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        removeItem(productId);
        toast.success("Your item has been removed from cart");
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    } finally {
      setRemovingItemId(null); // Hide loader
    }
  }

  const handleCheckout = async () => {
    const token = getCookie("authToken");

    const products = items.map((item) => {
      return {
        _id: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: Number(item.productId.price),
        quantity: item.quantity,
        images: item.productId.imageUrls,
        color: item.color,
        size: item.size,
      };
    });

    try {
      // Initiate payment
      const res = await apiClient.post(
        CREATE_PAYMENT,
        {
          products,
        },
        { headers: { Authorization: token } }
      );
      if (res.status === 200) {
        window.location.href = res.data.url;
      }
    } catch (ex) {
      toast.error("Something went wrong!!");
      console.log(ex);
    }
  };

  // If the user is not logged in, show a login prompt
  if (!token) {
    return (
      <>
        <BreadCrumb title="Cart" crumb="cart" />
        <section className="flex flex-col h-[calc(100vh-120px)] px-5 py-10 max-w-[1200px] mx-auto">
          <div className="p-5 bg-slate-50 border-t-2 border-t-black">
            <div className="flex items-center gap-2">
              <FaShoppingCart className="text-2xl" />
              <p className="text-sm text-gray-600 md:text-base">
                Please{" "}
                <span
                  onClick={() => router.push("/auth?flag=cart")}
                  className="text-red-700 cursor-pointer hover:underline"
                >
                  log in
                </span>{" "}
                to view your cart.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <BreadCrumb title="Cart" crumb="cart" />
      {loader ? (
        // Global loader while initial data is being fetched
        <div className="h-[calc(100vh-240px)] flex items-center justify-center">
          <Spinner variant="spinner" />
        </div>
      ) : items.length > 0 ? (
        // Cart items and totals
        <section className="w-full min-h-screen p-5 py-10 flex flex-col gap-10 lg:flex-row lg:gap-5 max-w-[1100px] mx-auto relative">
          {/* Mobile Screens */}
          <div className="w-full md:hidden">
            {items.map((item, index) => (
              <div key={index} className="border w-full">
                <ul className="w-full text-sm">
                  <li className="border-b px-5 py-3 flex items-center justify-end">
                    {removingItemId === item._id ? (
                      <Spinner variant="spinner" />
                    ) : (
                      <RxCrossCircled
                        onClick={() => removeFromCart(item.productId._id)}
                        className="text-lg text-gray-600 cursor-pointer"
                      />
                    )}
                  </li>
                  <li className="border-b px-5 py-3 flex items-center justify-center">
                    <Image
                      src={item.productId.imageUrls[0]}
                      alt="fashion"
                      width={70}
                      height={70}
                    />
                  </li>
                  <li className="border-b px-5 py-3 flex items-center justify-between">
                    <span className="font-bold">Product :</span>
                    <span className="text-gray-700">{item.productId.name}</span>
                  </li>
                  <li className="border-b px-5 py-3 flex items-center justify-between">
                    <span className="font-bold">Price :</span>
                    <span className="text-gray-700">
                      € {item.productId.price}
                    </span>
                  </li>
                  <li className="border-b px-5 py-3 flex items-center justify-between">
                    <span className="font-bold">Quantity :</span>
                    <span className="text-gray-700">
                      <div className="border py-1 px-2 flex items-center justify-between gap-5">
                        <span
                          onClick={() =>
                            changeQuantity(item.productId._id, "decrease")
                          }
                          className="cursor-pointer"
                        >
                          -
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          onClick={() =>
                            changeQuantity(item.productId._id, "increase")
                          }
                          className="cursor-pointer"
                        >
                          +
                        </span>
                      </div>
                    </span>
                  </li>
                  <li className="px-5 py-3 flex items-center justify-between">
                    <span className="font-bold">Subtotal :</span>
                    <span className="text-gray-700">
                      € {Number(item.productId.price) * item.quantity}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop Screens */}
          <div className="overflow-x-auto hidden md:block lg:w-[70%]">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-start"></th>
                  <th className="border border-gray-300 px-4 py-2 text-start"></th>
                  <th className="border border-gray-300 px-4 py-2 text-start">
                    Product
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-start">
                    Price
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-start">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-start">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {removingItemId === item._id ? (
                        <Spinner variant="spinner" />
                      ) : (
                        <RxCrossCircled
                          onClick={() => removeFromCart(item.productId._id)}
                          className="text-xl cursor-pointer"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Image
                        src={item.productId.imageUrls[0]}
                        alt="fashion"
                        width={70}
                        height={70}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.productId.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {Number(item.productId.price)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="border py-1 px-2 flex items-center justify-between gap-0">
                        <span
                          onClick={() =>
                            changeQuantity(item.productId._id, "decrease")
                          }
                          className="cursor-pointer"
                        >
                          -
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          onClick={() =>
                            changeQuantity(item.productId._id, "increase")
                          }
                          className="cursor-pointer"
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {Number(item.productId.price) * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Totals */}
          <div className="w-full lg:w-[30%] sticky top-5 z-10 h-fit">
            <div className="border w-full">
              <div className="border-b px-5 p-3 flex items-center">
                <h1
                  className={`font-bold ${playfairDisplay.className} text-lg`}
                >
                  Cart Totals
                </h1>
              </div>
              <ul className="w-full text-sm py-5 px-8">
                <li className="border-b px-5 py-3 flex items-center justify-between">
                  <span className="font-bold">Subtotal :</span>
                  <span className="text-gray-700">
                    €{" "}
                    {items.reduce(
                      (total, item) =>
                        total + item.quantity * Number(item.productId.price),
                      0
                    )}
                  </span>
                </li>
                {data.addresses?.shippingAddress && (
                  <li className="border-b px-5 py-3 flex flex-col items-start justify-center w-full">
                    <span className="font-bold">Shipping :</span>
                    <text className="text-gray-700 pl-10">
                      Shipping to{" "}
                      <span className="font-bold">
                        {data.addresses.shippingAddress.street}{" "}
                        {data.addresses.shippingAddress.city}{" "}
                        {data.addresses.shippingAddress.state}{" "}
                        {data.addresses.shippingAddress.country}
                      </span>
                    </text>
                  </li>
                )}
                <li className="px-5 py-3 flex items-center justify-between border-b">
                  <span className="font-bold">Total :</span>
                  <span className="text-gray-700">
                    €{" "}
                    {items.reduce(
                      (total, item) =>
                        total + item.quantity * Number(item.productId.price),
                      0
                    )}
                  </span>
                </li>
                <li className="px-5 py-3 flex items-center justify-between">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black p-3 text-white font-semibold hover:bg-transparent hover:text-black border border-black transition-all ease-in-out duration-300"
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      ) : showNoItemsMessage ? (
        // "No items available" message (debounced)
        <section className="flex flex-col h-[calc(100vh-120px)] px-5 py-10 max-w-[1200px] mx-auto">
          <div className="p-5 bg-slate-50 border-t-2 border-t-black">
            <div className="flex items-center gap-2">
              <FaShoppingCart className="text-2xl" />
              <p className="text-sm text-gray-600 md:text-base">
                Your cart is currently empty.{" "}
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
