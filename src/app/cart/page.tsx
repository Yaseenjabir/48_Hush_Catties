"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import useStore from "@/store/store";
import {
  CHANGE_QUANTITY,
  DELETE_CART_ITEMS,
  getCookie,
} from "@/constants/constants";
import { apiClient } from "../../../client/axiosClient";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import CartsTotal from "./cartsTotal";

export default function Page() {
  const { items, updateItemQuantity, removeItem } = useStore();

  const [loader, setLoader] = useState(true);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [showNoItemsMessage, setShowNoItemsMessage] = useState(false);
  const router = useRouter();
  const token = typeof window !== "undefined" ? getCookie("authToken") : null;
  useEffect(() => {
    if (items.length === 0) {
      const timer = setTimeout(() => {
        setShowNoItemsMessage(true);
      }, 1000);
      setLoader(false);
      return () => clearTimeout(timer);
    } else {
      setLoader(false);
      setShowNoItemsMessage(false);
    }
  }, [items]);

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

  async function removeFromCart(productId: string) {
    try {
      setRemovingItemId(productId);
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
      setRemovingItemId(null);
    }
  }

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
        <div className="h-[calc(100vh-240px)] flex items-center justify-center">
          <Spinner variant="spinner" />
        </div>
      ) : items.length > 0 ? (
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

          {/* Cart Totals and Form */}
          <CartsTotal />
        </section>
      ) : showNoItemsMessage ? (
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
