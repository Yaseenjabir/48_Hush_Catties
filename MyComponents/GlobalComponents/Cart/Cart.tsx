"use client";
import React, { useEffect } from "react";
import { Drawer, DrawerContent, useDisclosure } from "@heroui/react";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { AiOutlineMinus } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { apiClient } from "../../../client/axiosClient";
import {
  CHANGE_QUANTITY,
  FETCH_CART_ITEMS,
  getCookie,
} from "@/constants/constants";
import useStore from "@/store/store";
import { playfairDisplay } from "@/app/my-account/Main/Heading";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState<any>("blur");
  const { items, insertItems, updateItemQuantity } = useStore();

  const handleBackdropChange = (backdrop: string) => {
    setBackdrop(backdrop);
    onOpen();
  };

  async function fetchData() {
    const authToken = getCookie("authToken");
    if (!authToken) {
      return;
    }
    try {
      const res = await apiClient.get(FETCH_CART_ITEMS, {
        headers: { Authorization: authToken },
      });
      insertItems(res.data.items);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      return total + Number(item.productId.price) * item.quantity;
    }, 0);
  };

  const router = useRouter();

  return (
    <>
      <div className="relative">
        <IoCartOutline
          key={backdrop}
          onClick={() => handleBackdropChange(backdrop)}
          className="cursor-pointer text-2xl"
        />
        <span className="bg-white h-4 w-4 rounded-full flex items-center justify-center absolute text-[12px] font-bold text-black -top-1 -right-1">
          {items.length}
        </span>
      </div>
      <Drawer backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="z-[1001]">
          <div className="w-full">
            <div className="py-3 border-b border-t px-5">
              <h1 className="font-extrabold text-red-700">
                YOUR CART
                <span className="font-bold mx-2 text-black">1</span>
                <span className="font-light text-gray-600">ITEM</span>
              </h1>
            </div>
          </div>
          {items.length > 0 ? (
            <div className="px-5 h-[calc(100vh-180px)] overflow-y-auto">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-start border-b py-3"
                  >
                    <div className="w-[15%]">
                      <Image
                        src={item.productId.imageUrls[0]}
                        alt="fashion"
                        height={100}
                        width={100}
                        className="w-full"
                      />
                    </div>
                    <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                      <div className="w-full flex justify-between">
                        <span>{item.productId.name}</span>
                        <span className="font-extrabold text-red-700">
                          €{item.productId.price}
                        </span>
                      </div>
                      <div className="w-full flex justify-start text-gray-600">
                        <span className="font-semibold">Color : </span>
                        <span>Yellow</span>
                      </div>
                      <div className="w-full flex justify-end items-center gap-2 text-gray-600">
                        <span className="font-semibold">QTY : </span>
                        <div className="flex gap-2 items-center">
                          <span
                            onClick={() =>
                              changeQuantity(item.productId._id, "decrease")
                            }
                            className="border p-1 font-bold cursor-pointer"
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="border py-1 px-3 text-sm">
                            {item.quantity}
                          </span>
                          <span
                            onClick={() =>
                              changeQuantity(item.productId._id, "increase")
                            }
                            className="border p-1  font-bold cursor-pointer"
                          >
                            <GoPlus />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[calc(100vh-180px)] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className={`text-xl font-bold ${playfairDisplay.className}`}>
                  No item added in cart
                </p>
                <Link
                  onClick={onOpenChange}
                  href={"/shop"}
                  className="py-2 px-4 font-normal border border-black bg-black text-white hover:text-black hover:bg-transparent"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          )}

          <div className="w-full p-5 bg-gray-100 flex flex-col gap-5">
            <div className="w-full flex items-center justify-between">
              <span className="font-bold text-lg">SUBTOTAL : </span>
              <span className="text-red-700 font-extrabold">
                € {calculateSubtotal()}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link
                onClick={onOpenChange}
                className="py-2 border border-red-700 font-light text-white w-full bg-red-700 hover:bg-transparent flex items-center justify-center hover:text-red-700 transition-all ease-in-out duration-300"
                href={"/cart"}
              >
                View Cart
              </Link>
              <button
                onClick={() => {
                  router.push("/cart");
                  onOpenChange();
                }}
                className="py-2 border border-red-700 font-light text-white w-full bg-red-700 hover:bg-transparent flex items-center justify-center hover:text-red-700 transition-all ease-in-out duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
