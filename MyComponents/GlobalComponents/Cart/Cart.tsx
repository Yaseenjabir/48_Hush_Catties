"use client";
import React, { useState } from "react";
import { Drawer, DrawerContent, useDisclosure } from "@heroui/react";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { AiOutlineMinus } from "react-icons/ai";
import { GoPlus } from "react-icons/go";

export default function Cart() {
  const [cartCounter, setCartCounter] = useState(5);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState<any>("blur");

  const handleBackdropChange = (backdrop: string) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <IoCartOutline
        key={backdrop}
        onClick={() => handleBackdropChange(backdrop)}
        className="cursor-pointer text-2xl"
      />
      <Drawer backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <div className="w-full">
            <div className="py-3 border-b border-t px-5">
              <h1 className="font-extrabold text-red-700">
                YOUR CART
                <span className="font-bold mx-2 text-black">1</span>
                <span className="font-light text-gray-600">ITEM</span>
              </h1>
            </div>
          </div>
          <div className="px-5 h-[calc(100vh-180px)] overflow-y-auto">
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start border-b py-3">
              <div className="w-[15%]">
                <Image
                  src={
                    "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg"
                  }
                  alt="fashion"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="px-3 w-[85%] gap-1 text-sm flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <span>Morbi Vitae mi</span>
                  <span className="font-extrabold text-red-700">$39.93</span>
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
                        setCartCounter((prev: number) => {
                          if (prev === 0) {
                            return 0;
                          } else {
                            return prev - 1;
                          }
                        })
                      }
                      className="border p-1 font-bold cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="border py-1 px-3 text-sm">
                      {cartCounter}
                    </span>
                    <span
                      onClick={() => setCartCounter((prev: number) => prev + 1)}
                      className="border p-1  font-bold cursor-pointer"
                    >
                      <GoPlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-5 bg-gray-100 flex flex-col gap-5">
            <div className="w-full flex items-center justify-between">
              <span className="font-bold text-lg">SUBTOTAL : </span>
              <span className="text-red-700 font-extrabold">$39.92</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button className="py-2 border border-red-700 font-light text-red-700 w-full hover:bg-red-700 hover:text-white transition-all ease-in-out duration-300">
                View Cart
              </button>
              <button className="py-2 border border-red-700 font-light text-white w-full bg-red-700 hover:bg-transparent hover:text-red-700 transition-all ease-in-out duration-300">
                Checkout
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
