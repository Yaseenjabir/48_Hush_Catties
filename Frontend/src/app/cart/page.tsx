"use client";
import React from "react";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import { playfairDisplay } from "../my-account/Main/Heading";
import useStore from "@/store/store";
import {
  CHANGE_QUANTITY,
  getCookie,
  REMOVE_FROM_CART,
} from "@/constants/constants";
import { apiClient } from "../../../client/axiosClient";
import { FaShoppingCart } from "react-icons/fa";

export default function Page() {
  const { items, updateItemQuantity, removeItem } = useStore();
  async function changeQuantity(productId, action) {
    const authToken = getCookie("authToken");
    try {
      const res = await apiClient.patch(
        CHANGE_QUANTITY,
        { productId, action },
        { headers: { Authorization: authToken } }
      );

      if (res.status === 200) {
        updateItemQuantity(res.data.productId, res.data.updatedQuantity);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async function removeFromCart(item_id: string) {
    const authToken = getCookie("authToken");

    try {
      const res = await apiClient.delete(`${REMOVE_FROM_CART}${item_id}`, {
        headers: { Authorization: authToken },
      });
      if (res.status === 200) {
        removeItem(item_id);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      <BreadCrumb title="Cart" crumb="cart" />
      {items.length > 0 ? (
        <section className="w-full min-h-screen p-5 py-10 flex flex-col gap-10 lg:flex-row lg:gap-5 max-w-[1100px] mx-auto relative">
          {/* Mobile Screens  */}
          <div className="w-full md:hidden">
            {items.map((item, index) => {
              return (
                <div key={index} className="border w-full">
                  <ul className="w-full text-sm">
                    <li className="border-b px-5 py-3 flex items-center justify-end">
                      <RxCrossCircled
                        onClick={() => removeFromCart(item._id)}
                        className="text-lg text-gray-600 cursor-pointer"
                      />
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
                      <span className="text-gray-700">
                        {item.productId.name}
                      </span>
                    </li>
                    <li className="border-b px-5 py-3 flex items-center justify-between">
                      <span className="font-bold">Price :</span>
                      <span className="text-gray-700">
                        € {item.productId.price}
                      </span>
                    </li>
                    <li className="border-b px-5 py-3 flex items-center justify-between">
                      <span className="font-bold">Product :</span>
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
              );
            })}
          </div>
          {/* Desktop Screens  */}
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
                {items.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="border border-gray-300 px-4 py-2">
                        <RxCrossCircled
                          onClick={() => removeFromCart(item._id)}
                          className="text-xl cursor-pointer"
                        />
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
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Cart totals  */}
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

                <li className="border-b px-5 py-3 flex flex-col items-start justify-center w-full">
                  <span className="font-bold">Shipping :</span>
                  <text className="text-gray-700 pl-10">
                    Shipping to{" "}
                    <span className="font-bold">
                      This is street address, Islamabad, Islamabad Capital
                      Territory, 23200.
                    </span>
                  </text>
                </li>
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
                  <button className="w-full bg-black p-3 text-white font-semibold hover:bg-transparent hover:text-black border border-black transition-all ease-in-out duration-300">
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      ) : (
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
      )}
    </>
  );
}
