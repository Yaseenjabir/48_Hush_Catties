"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCheck, FaExpandArrowsAlt, FaRegHeart } from "react-icons/fa";
import { IoShuffleSharp } from "react-icons/io5";
import PaginationWrapper from "./PaginationWrapper";
import Filter from "./Filter";
import Link from "next/link";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";

export default function Page() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <BreadCrumb crumb="shop" title="Shop" />
      <section className="w-full py-10 px-5 max-w-[1100px] mx-auto">
        {/* filters  */}
        <div className="w-full grid grid-cols-2">
          <div>
            <span
              onClick={() => setShowFilter(true)}
              className="uppercase font-semibold border-b-black border-b py-1 text-sm cursor-pointer hover:text-red-700 hover:border-b-red-700 transition-all ease-in-out duration-300"
            >
              Filter +
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* items listing  */}
        <div className="w-full grid grid-cols-1 py-10 gap-10">
          <div className="flex w-full">
            <div className="max-w-[225px]">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/24-home_default/morbi-vitae-mi.jpg"
                }
                height={200}
                width={200}
                alt="bag"
                layout="responsive"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-2 md:flex-row px-5">
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center justify-start gap-1">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <span className="text-sm text-gray-600">(07 reviews)</span>
                </div>
                <Link href={"/shop/slug"} className="text-sm">
                  Morbi vitae mi
                </Link>
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
                  itaque ratione quae provident neque magnam magni non commodi,
                  sed repellendus. Tenetur, voluptates!
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-red-700 py-2 px-4 uppercase text-sm text-white text-nowrap">
                  Add to cart
                </button>
                <div className="text-xl flex gap-5 text-gray-700">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FaExpandArrowsAlt className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Quick Review</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FaRegHeart className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IoShuffleSharp className="cursor-pointer text-2xl" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to compare list</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div>
                  <div className="flex items-center text-green-500 gap-2">
                    <FaCheck />
                    <span>In Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="max-w-[225px]">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/24-home_default/morbi-vitae-mi.jpg"
                }
                height={200}
                width={200}
                alt="bag"
                layout="responsive"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-2 md:flex-row px-5">
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center justify-start gap-1">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <span className="text-sm text-gray-600">(07 reviews)</span>
                </div>
                <Link href={"/shop/slug"} className="text-sm">
                  Morbi vitae mi
                </Link>
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
                  itaque ratione quae provident neque magnam magni non commodi,
                  sed repellendus. Tenetur, voluptates!
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-red-700 py-2 px-4 uppercase text-sm text-white text-nowrap">
                  Add to cart
                </button>
                <div className="text-xl flex gap-5 text-gray-700">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FaExpandArrowsAlt className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Quick Review</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FaRegHeart className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IoShuffleSharp className="cursor-pointer text-2xl" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to compare list</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div>
                  <div className="flex items-center text-green-500 gap-2">
                    <FaCheck />
                    <span>In Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="max-w-[225px]">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/24-home_default/morbi-vitae-mi.jpg"
                }
                height={200}
                width={200}
                alt="bag"
                layout="responsive"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-2 md:flex-row px-5">
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center justify-start gap-1">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <span className="text-sm text-gray-600">(07 reviews)</span>
                </div>
                <Link href={"/shop/slug"} className="text-sm">
                  Morbi vitae mi
                </Link>
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
                  itaque ratione quae provident neque magnam magni non commodi,
                  sed repellendus. Tenetur, voluptates!
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-red-700 py-2 px-4 uppercase text-sm text-white text-nowrap">
                  Add to cart
                </button>
                <div className="text-xl flex gap-5 text-gray-700">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FaExpandArrowsAlt className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Quick Review</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FaRegHeart className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IoShuffleSharp className="cursor-pointer text-2xl" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to compare list</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div>
                  <div className="flex items-center text-green-500 gap-2">
                    <FaCheck />
                    <span>In Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <PaginationWrapper />
        </div>
      </section>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
    </>
  );
}
