"use client";
import React, { useState } from "react";
import ShopSlider from "./Slider";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiOutlineSupport } from "react-icons/hi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GoPlus } from "react-icons/go";
import { Slash } from "lucide-react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineMinus,
} from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCheck, FaFacebook, FaRegHeart } from "react-icons/fa";
import { FaArrowRotateLeft, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { IoAlertCircleOutline, IoShuffleSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { MdOutlinePolicy } from "react-icons/md";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SameCategorySlider from "./SameCategorySlider/SameCategorySlider";
import { IoRocketOutline } from "react-icons/io5";

export default function Page() {
  const [cartCounter, setCartCounter] = useState(5);

  return (
    <>
      <section className="w-full p-5">
        <div className="w-full flex flex-col lg:flex-row lg:gap-10">
          <div className="w-full flex flex-col lg:w-[70%]">
            <div className="flex flex-col md:flex-row md:gap-5">
              <div className="w-full md:max-w-[410px]">
                <ShopSlider />
              </div>
              <div className="w-full py-5">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/shop">shop</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col items-start justify-start w-full gap-2 mt-5">
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-start gap-1">
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        (07 reviews)
                      </span>
                    </div>
                    <h1 className="text-xl font-semibold">Morbi vitae mi</h1>
                    <div className="flex gap-2 font-medium">
                      <span className="text-gray-400 text-lg relative">
                        $49.90
                        <hr className="absolute w-full top-[14px] left-0 border-gray-400 border-[1px]" />
                      </span>
                      <span className="text-red-700 text-lg">$39.90</span>
                    </div>
                    <p className="leading-5 text-gray-600 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minus, quia laudantium nam repellat error unde expedita, a
                      itaque ratione quae provident neque magnam magni non
                      commodi, sed repellendus. Tenetur, voluptates!
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-700">Color : </span>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-black"></span>
                        <span className="w-6 h-6 rounded-full bg-red-500"></span>
                        <span className="w-6 h-6 rounded-full bg-green-500"></span>
                        <span className="w-6 h-6 rounded-full bg-amber-500"></span>
                      </div>
                    </div>
                    <div className="flex items-center text-green-500 gap-2">
                      <FaCheck />
                      <span>In Stock</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2">
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
                          onClick={() =>
                            setCartCounter((prev: number) => prev + 1)
                          }
                          className="border p-1  font-bold cursor-pointer"
                        >
                          <GoPlus />
                        </span>
                      </div>
                      <button className="bg-red-700 py-2 px-4 uppercase text-sm text-white text-nowrap">
                        Add to cart
                      </button>
                      <button className="bg-red-700 py-2 px-4 uppercase text-sm text-white text-nowrap">
                        Buy Now
                      </button>
                    </div>
                    <div className="text-xl flex gap-5 text-gray-700 py-5">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FaRegHeart />
                        <p className="text-[17px] font-semibold">
                          Add to wishlist
                        </p>
                      </div>

                      <div className="flex items-center gap-2 cursor-pointer">
                        <IoShuffleSharp className="text-2xl" />
                        <p className="text-[17px] font-semibold">
                          Add to compare
                        </p>
                      </div>
                    </div>
                    <hr className="w-full" />
                    <div className="py-3 flex items-center gap-3">
                      <span className="font-bold text-gray-700">Share : </span>
                      <div className="flex items-center gap-2 text-2xl">
                        <FaFacebook className="text-blue-700 cursor-pointer" />
                        <RiInstagramFill className="text-pink-700 cursor-pointer" />
                        <FaXTwitter className="text-black cursor-pointer" />
                      </div>
                    </div>
                    <hr className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            {/* Accordian  */}
            <div className="w-full lg:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold text-gray-700">
                    Description
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-gray-500">
                      <h1 className="text-2xl font-semibold t mb-4">
                        River Island HR Jasper Blazer
                      </h1>

                      <p className="text-base  mb-4">
                        Coupling a blended linen construction with tailored
                        style, the River Island HR Jasper Blazer will imprint a
                        touch of dapper charm into your after-dark wardrobe.
                      </p>

                      <div className="mb-4">
                        <h2 className="text-lg font-medium -800">
                          Model Info:
                        </h2>
                        <ul className="list-disc pl-5">
                          <li>
                            <span className="font-semibold">Size:</span> Medium
                          </li>
                          <li>
                            <span className="font-semibold">Shirt Size:</span>{" "}
                            Medium/38L
                          </li>
                          <li>
                            <span className="font-semibold">Height:</span> 62
                            1/2 (189cm)
                          </li>
                          <li>
                            <span className="font-semibold">Chest:</span> 38 (96
                            cm)
                          </li>
                          <li>
                            <span className="font-semibold">Waist:</span> 31 (78
                            cm)
                          </li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-lg font-medium -800">
                          Product Details:
                        </h2>
                        <ul className="list-disc pl-5">
                          <li>
                            <span className="font-semibold">Length:</span> 74cm
                          </li>
                          <li>
                            <span className="font-semibold">Fit:</span> Regular
                            fit
                          </li>
                          <li>
                            <span className="font-semibold">Lapels:</span>{" "}
                            Notched lapels
                          </li>
                          <li>
                            <span className="font-semibold">
                              Front Fastening:
                            </span>{" "}
                            Twin button front fastening
                          </li>
                          <li>
                            <span className="font-semibold">Pockets:</span>{" "}
                            Front patch pockets; chest pocket
                          </li>
                          <li>
                            <span className="font-semibold">
                              Internal Pockets:
                            </span>{" "}
                            Yes
                          </li>
                          <li>
                            <span className="font-semibold">
                              Centre-back Vent:
                            </span>{" "}
                            Yes
                          </li>
                          <li>
                            <span className="font-semibold">
                              Care Instructions:
                            </span>{" "}
                            Please refer to the garment for care instructions.
                          </li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-lg font-medium -800">Material:</h2>
                        <p className="text-base -700">
                          Outer: 50% Linen & 50% Polyamide; Body Lining: 100%
                          Cotton; Lining: 100% Acetate
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-bold text-gray-700">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-bold text-gray-700">
                    Reviews
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-700">
                            ITEM RATING :
                          </span>
                          <div className="flex items-center text-xl">
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                          </div>
                        </div>
                        <p className="text-gray-500">
                          {" "}
                          4.4 average based on 7 ratings.{" "}
                        </p>
                      </div>
                      <hr className="mt-5" />
                      <div className="w-full flex flex-col">
                        <div className="py-5 border-b flex flex-col gap-5 ">
                          <div className="flex items-center gap-5 text-gray-500">
                            <div className="flex items-center text-xl">
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                            </div>
                            <span>Viper_Pilot_46</span>
                            <span>|</span>
                            <span>04/25/2023</span>
                          </div>
                          <div>
                            <h1 className="font-semibold text-lg text-gray-700">
                              This is title
                            </h1>
                            <p className="text-sm text-gray-600">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ullam ea labore ipsa ipsam omnis?
                              Accusantium nostrum quis nulla asperiores id!
                              Doloribus qui eaque quos perferendis officia animi
                              atque assumenda sunt.
                            </p>
                          </div>
                          <div className="flex items-center gap-5">
                            <span>Was this review helpful?</span>
                            <div className="flex items-center gap-2 text-3xl">
                              <AiOutlineDislike className="bg-gray-100 px-1 cursor-pointer" />
                              <AiOutlineLike className="bg-gray-100 px-1 cursor-pointer" />
                            </div>
                          </div>
                        </div>
                        <div className="py-5 border-b flex flex-col gap-5 ">
                          <div className="flex items-center gap-5 text-gray-500">
                            <div className="flex items-center text-xl">
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                            </div>
                            <span>Viper_Pilot_46</span>
                            <span>|</span>
                            <span>04/25/2023</span>
                          </div>
                          <div>
                            <h1 className="font-semibold text-lg text-gray-700">
                              This is title
                            </h1>
                            <p className="text-sm text-gray-600">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ullam ea labore ipsa ipsam omnis?
                              Accusantium nostrum quis nulla asperiores id!
                              Doloribus qui eaque quos perferendis officia animi
                              atque assumenda sunt.
                            </p>
                          </div>
                          <div className="flex items-center gap-5">
                            <span>Was this review helpful?</span>
                            <div className="flex items-center gap-2 text-3xl">
                              <AiOutlineDislike className="bg-gray-100 px-1 cursor-pointer" />
                              <AiOutlineLike className="bg-gray-100 px-1 cursor-pointer" />
                            </div>
                          </div>
                        </div>
                        <div className="py-5 border-b flex flex-col gap-5 ">
                          <div className="flex items-center gap-5 text-gray-500">
                            <div className="flex items-center text-xl">
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                            </div>
                            <span>Viper_Pilot_46</span>
                            <span>|</span>
                            <span>04/25/2023</span>
                          </div>
                          <div>
                            <h1 className="font-semibold text-lg text-gray-700">
                              This is title
                            </h1>
                            <p className="text-sm text-gray-600">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ullam ea labore ipsa ipsam omnis?
                              Accusantium nostrum quis nulla asperiores id!
                              Doloribus qui eaque quos perferendis officia animi
                              atque assumenda sunt.
                            </p>
                          </div>
                          <div className="flex items-center gap-5">
                            <span>Was this review helpful?</span>
                            <div className="flex items-center gap-2 text-3xl">
                              <AiOutlineDislike className="bg-gray-100 px-1 cursor-pointer" />
                              <AiOutlineLike className="bg-gray-100 px-1 cursor-pointer" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            {/* Tabs  */}
            <div className="w-full mt-10 hidden lg:block">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="border w-full">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="productDetails">
                    Product Details
                  </TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <div className="text-gray-500">
                    <h1 className="text-2xl font-semibold t mb-4">
                      River Island HR Jasper Blazer
                    </h1>

                    <p className="text-base  mb-4">
                      Coupling a blended linen construction with tailored style,
                      the River Island HR Jasper Blazer will imprint a touch of
                      dapper charm into your after-dark wardrobe.
                    </p>

                    <div className="mb-4">
                      <h2 className="text-lg font-medium -800">Model Info:</h2>
                      <ul className="list-disc pl-5">
                        <li>
                          <span className="font-semibold">Size:</span> Medium
                        </li>
                        <li>
                          <span className="font-semibold">Shirt Size:</span>{" "}
                          Medium/38L
                        </li>
                        <li>
                          <span className="font-semibold">Height:</span> 6.2 1/2
                          (189cm)
                        </li>
                        <li>
                          <span className="font-semibold">Chest:</span> 38 (96
                          cm)
                        </li>
                        <li>
                          <span className="font-semibold">Waist:</span> 31 (78
                          cm)
                        </li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-lg font-medium -800">
                        Product Details:
                      </h2>
                      <ul className="list-disc pl-5">
                        <li>
                          <span className="font-semibold">Length:</span> 74cm
                        </li>
                        <li>
                          <span className="font-semibold">Fit:</span> Regular
                          fit
                        </li>
                        <li>
                          <span className="font-semibold">Lapels:</span> Notched
                          lapels
                        </li>
                        <li>
                          <span className="font-semibold">
                            Front Fastening:
                          </span>{" "}
                          Twin button front fastening
                        </li>
                        <li>
                          <span className="font-semibold">Pockets:</span> Front
                          patch pockets; chest pocket
                        </li>
                        <li>
                          <span className="font-semibold">
                            Internal Pockets:
                          </span>{" "}
                          Yes
                        </li>
                        <li>
                          <span className="font-semibold">
                            Centre-back Vent:
                          </span>{" "}
                          Yes
                        </li>
                        <li>
                          <span className="font-semibold">
                            Care Instructions:
                          </span>{" "}
                          Please refer to the garment for care instructions.
                        </li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-lg font-medium -800">Material:</h2>
                      <p className="text-base -700">
                        Outer: 50% Linen & 50% Polyamide; Body Lining: 100%
                        Cotton; Lining: 100% Acetate
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="productDetails">
                  Product details goes here
                </TabsContent>
                <TabsContent value="reviews">
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-700">
                          ITEM RATING :
                        </span>
                        <div className="flex items-center text-xl">
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-gray-500">
                        {" "}
                        4.4 average based on 7 ratings.{" "}
                      </p>
                    </div>
                    <hr className="mt-5" />
                    <div className="w-full flex flex-col">
                      <div className="py-5 border-b flex flex-col gap-5 ">
                        <div className="flex items-center gap-5 text-gray-500">
                          <div className="flex items-center text-xl">
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                          </div>
                          <span>Viper_Pilot_46</span>
                          <span>|</span>
                          <span>04/25/2023</span>
                        </div>
                        <div>
                          <h1 className="font-semibold text-lg text-gray-700">
                            This is title
                          </h1>
                          <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ullam ea labore ipsa ipsam omnis? Accusantium
                            nostrum quis nulla asperiores id! Doloribus qui
                            eaque quos perferendis officia animi atque assumenda
                            sunt.
                          </p>
                        </div>
                        <div className="flex items-center gap-5">
                          <span>Was this review helpful?</span>
                          <div className="flex items-center gap-2 text-3xl">
                            <AiOutlineDislike className="bg-gray-100 px-1 cursor-pointer" />
                            <AiOutlineLike className="bg-gray-100 px-1 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                      <div className="py-5 border-b flex flex-col gap-5 ">
                        <div className="flex items-center gap-5 text-gray-500">
                          <div className="flex items-center text-xl">
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                          </div>
                          <span>Viper_Pilot_46</span>
                          <span>|</span>
                          <span>04/25/2023</span>
                        </div>
                        <div>
                          <h1 className="font-semibold text-lg text-gray-700">
                            This is title
                          </h1>
                          <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ullam ea labore ipsa ipsam omnis? Accusantium
                            nostrum quis nulla asperiores id! Doloribus qui
                            eaque quos perferendis officia animi atque assumenda
                            sunt.
                          </p>
                        </div>
                        <div className="flex items-center gap-5">
                          <span>Was this review helpful?</span>
                          <div className="flex items-center gap-2 text-3xl">
                            <AiOutlineDislike className="bg-gray-100 px-1 cursor-pointer" />
                            <AiOutlineLike className="bg-gray-100 px-1 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                      <div className="py-5 border-b flex flex-col gap-5 ">
                        <div className="flex items-center gap-5 text-gray-500">
                          <div className="flex items-center text-xl">
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                            <IoIosStar className="text-yellow-400" />
                          </div>
                          <span>Viper_Pilot_46</span>
                          <span>|</span>
                          <span>04/25/2023</span>
                        </div>
                        <div>
                          <h1 className="font-semibold text-lg text-gray-700">
                            This is title
                          </h1>
                          <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ullam ea labore ipsa ipsam omnis? Accusantium
                            nostrum quis nulla asperiores id! Doloribus qui
                            eaque quos perferendis officia animi atque assumenda
                            sunt.
                          </p>
                        </div>
                        <div className="flex items-center gap-5">
                          <span>Was this review helpful?</span>
                          <div className="flex items-center gap-2 text-3xl">
                            <AiOutlineDislike className="bg-gray-100 px-1 cursor-pointer" />
                            <AiOutlineLike className="bg-gray-100 px-1 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="w-full lg:w-[30%] flex flex-col py-5 gap-10">
            <div className="w-full flex flex-col gap-7">
              <div className="flex items-center gap-5">
                <MdOutlinePolicy className="text-5xl text-gray-500" />
                <p className="text-gray-500">
                  Security policy (Here goes our security policy module)
                </p>
              </div>
              <div className="flex items-center gap-5">
                <CiDeliveryTruck className="text-5xl text-gray-500" />
                <p className="text-gray-500">
                  Delivery policy (Here goes our delivery policy module)
                </p>
              </div>
              <div className="flex items-center gap-5">
                <RiMoneyDollarCircleLine className="text-5xl text-gray-500" />
                <p className="text-gray-500">
                  Return policy (Here goes our return policy module)
                </p>
              </div>
            </div>
            <div className="w-full">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/modules/axoncreator/img/banner-right.jpg"
                }
                alt="fashion"
                height={300}
                width={300}
                layout="responsive"
                className="max-w-[60%] mx-auto lg:max-w-[80%] lg:ml-0 lg:mr-auto"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-gray-700 py-3 border-b">
                Featured Products
              </h1>
              <div className="flex flex-col w-full py-5 gap-7">
                <div className="flex items-start gap-3">
                  <div className="w-[25%] max-w-[120px]">
                    <Image
                      src={
                        "https://akira-elementor.axonvip.com/24-home_default/morbi-vitae-mi.jpg"
                      }
                      alt="bag-image"
                      height={200}
                      width={200}
                      layout="responsive"
                    />
                  </div>
                  <div className="w-[75%] flex flex-col py-1 gap-2">
                    <h1 className="font-semibold text-gray-500">
                      New brand bag
                    </h1>
                    <div className="w-full flex items-center justify-start gap-1">
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        (07 reviews)
                      </span>
                    </div>
                    <div className="flex gap-2 font-medium">
                      <span className="text-gray-400 relative">
                        $49.90
                        <hr className="absolute w-full top-[10px] left-0 border-gray-400 border-[1px]" />
                      </span>
                      <span className="text-red-700">$39.90</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-[25%] max-w-[120px]">
                    <Image
                      src={
                        "https://akira-elementor.axonvip.com/24-home_default/morbi-vitae-mi.jpg"
                      }
                      alt="bag-image"
                      height={200}
                      width={200}
                      layout="responsive"
                    />
                  </div>
                  <div className="w-[75%] flex flex-col py-1 gap-2">
                    <h1 className="font-semibold text-gray-500">
                      New brand bag
                    </h1>
                    <div className="w-full flex items-center justify-start gap-1">
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        (07 reviews)
                      </span>
                    </div>
                    <div className="flex gap-2 font-medium">
                      <span className="text-gray-400 relative">
                        $49.90
                        <hr className="absolute w-full top-[10px] left-0 border-gray-400 border-[1px]" />
                      </span>
                      <span className="text-red-700">$39.90</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-[25%] max-w-[120px]">
                    <Image
                      src={
                        "https://akira-elementor.axonvip.com/24-home_default/morbi-vitae-mi.jpg"
                      }
                      alt="bag-image"
                      height={200}
                      width={200}
                      layout="responsive"
                    />
                  </div>
                  <div className="w-[75%] flex flex-col py-1 gap-2">
                    <h1 className="font-semibold text-gray-500">
                      New brand bag
                    </h1>
                    <div className="w-full flex items-center justify-start gap-1">
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <IoIosStar className="text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        (07 reviews)
                      </span>
                    </div>
                    <div className="flex gap-2 font-medium">
                      <span className="text-gray-400 relative">
                        $49.90
                        <hr className="absolute w-full top-[10px] left-0 border-gray-400 border-[1px]" />
                      </span>
                      <span className="text-red-700">$39.90</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-10 flex flex-col items-center justify-center gap-5">
          <h1 className="font-bold text-xl text-gray-700">
            Product Same Category
          </h1>
          <hr className="border border-blue-600 w-[60px]" />
          <div className="w-full">
            <SameCategorySlider />
          </div>
        </div>
      </section>
      <div className="bg-red-700 grid grid-cols-2 w-full py-10 px-5 place-content-center justify-items-center text-white gap-5 lg:grid-cols-4">
        <div className="w-full py-10 flex items-center justify-center flex-col text-center">
          <IoRocketOutline className="text-4xl" />
          <span className="font-semibold text-lg">Free Shipping</span>
          <p className="text-sm">orders $50 or more</p>
        </div>
        <div className="w-full py-10 flex items-center justify-center flex-col text-center">
          <FaArrowRotateLeft className="text-4xl" />
          <span className="font-semibold text-lg"> Free Returns </span>
          <p className="text-sm">within 30 days</p>
        </div>
        <div className="w-full py-10 flex items-center justify-center flex-col text-center">
          <IoAlertCircleOutline className="text-4xl" />
          <span className="font-semibold text-lg"> Get 20% Off 1 Item </span>
          <p className="text-sm">when you sign up</p>
        </div>
        <div className="w-full py-10 flex items-center justify-center flex-col text-center">
          <HiOutlineSupport className="text-4xl" />
          <span className="font-semibold text-lg"> We Support </span>
          <p className="text-sm">24/7 amazing services</p>
        </div>
      </div>
    </>
  );
}
