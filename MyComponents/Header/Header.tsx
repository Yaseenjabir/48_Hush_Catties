"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ReactTyped } from "react-typed";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { Input } from "@/components/ui/input";
export default function Header() {
  const [isSlided, setIsSlided] = useState(true);

  const [isSearchBarActive, setIsSearchBarActive] = useState(true);

  const menus = [
    { item: "Home", value: "" },
    { item: "Shop", value: "" },
    { item: "About", value: "" },
    { item: "Contact", value: "" },
    { item: "Arrivals", value: "" },
    { item: "Featured", value: "" },
  ];

  return (
    <>
      <div className="w-full px-5 py-2 flex items-center justify-center bg-red-700 text-white">
        <ReactTyped
          strings={[
            "🔥 Where style meets confidence.",
            "🔥 Discover your next favorite look.",
            "🔥 Empowering women, one purchase at a time.",
          ]}
          loop
          typeSpeed={40}
          backSpeed={50}
        />
      </div>
      <div className="w-full bg-black">
        <header className="py-3 px-5 max-w-[1200px] mx-auto text-white flex items-center justify-between">
          <RxHamburgerMenu
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setIsSlided(false)}
          />
          <div className="flex items-center justify-center">
            <AiOutlineUser className="cursor-pointer hidden md:block text-2xl" />
            <FaHeart className="cursor-pointer hidden md:block text-2xl text-red-500" />
          </div>

          <div className="items-center justify-center hidden md:flex">
            <ul className="flex items-center justify-center gap-5">
              {menus.slice(0, 3).map((item: any, index) => {
                return (
                  <li key={index} className="hover:underline cursor-pointer">
                    {item.item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-16">
            <Image
              src={"/logo.png"}
              width={400}
              height={400}
              layout="responsive"
              alt="logo"
            />
          </div>
          <div className="items-center justify-center hidden md:flex">
            <ul className="flex items-center justify-center gap-5">
              {menus.slice(3, 6).map((item: any, index: number) => {
                return (
                  <li key={index} className="hover:underline cursor-pointer">
                    {item.item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center justify-center text-2xl gap-2">
            <IoIosSearch
              onClick={() => setIsSearchBarActive((prev: boolean) => !prev)}
              className="cursor-pointer"
            />
            <IoCartOutline className="cursor-pointer" />
          </div>
          <div
            className={`bg-black text-white mx-auto ${
              isSearchBarActive ? "h-[76px]" : "h-[0px] p-0"
            } absolute top-[128px] left-0 w-full z-10 transition-all ease-in-out duration-300 overflow-hidden`}
          >
            <div className="w-full max-w-[1200px] mx-auto">
              <div className="w-full p-5">
                <div className="flex items-center gap-2">
                  <IoIosSearch className="text-2xl cursor-pointer" />
                  <Input placeholder="Search here" />
                  <RxCross1
                    onClick={() => setIsSearchBarActive(false)}
                    className="cursor-pointer text-2xl"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center py-10 px-5 bg-black text-white">
                <span>
                  No results could be found. Please try again with a different
                  query.
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu  */}
      <div
        className={`fixed top-0 left-0 w-[90%] h-screen z-10 bg-slate-50 shadow-2xl p-5 flex flex-col transition-all ease-in-out duration-300 ${
          isSlided ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <RxCross1
          className="text-xl mt-5 cursor-pointer"
          onClick={() => setIsSlided(true)}
        />
        <ul className="mt-10 flex flex-col">
          {menus.map((item: any, index: number) => (
            <li key={index} className="border-b border-gray-400 py-4">
              {item.item}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-start absolute bottom-5 left-5 gap-3 cursor-pointer">
          <span className="font-light text-sm">Login</span>
          <AiOutlineUser className="cursor-pointer" />
          <span className="font-light text-sm">Wishlist</span>
          <FaHeart className="cursor-pointer text-red-500" />
        </div>
      </div>
    </>
  );
}
