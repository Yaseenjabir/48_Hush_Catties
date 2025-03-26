"use client";
import { Input } from "@/components/ui/input";
import { getCookie } from "@/constants/constants";
import useStore from "@/store/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import Search from "./Search";
import Cart from "../GlobalComponents/Cart/Cart";
import { IoIosHeartEmpty } from "react-icons/io";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header2() {
  const router = useRouter();

  const [isSlided, setIsSlided] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [filteredData, setFilteredData] = useState<any>([]);

  const pathName = usePathname();

  const { items, globalData } = useStore();

  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleRedirection = () => {
    if (!authenticated) {
      router.push("/auth?my-account");
      return;
    }
    router.push("/my-account");
    localStorage.setItem("nav", "Wishlist");
  };

  function handleOnChange(val: string) {
    if (!val.trim()) {
      setFilteredData([]); // or setFilteredData(globalData) to show all data
      setInputVal("");
      return;
    }

    setInputVal(val);
    // Convert the search term to lowercase for case-insensitive matching
    const searchTerm = val.toLowerCase();

    // Filter the globalData array
    const filtered = globalData.filter((item) => {
      // Check if the name or description includes the search term
      const isNameMatched = item.name.toLowerCase().includes(searchTerm);
      const isDescriptionMatched = item.description
        .toLowerCase()
        .includes(searchTerm);

      // Return true if either condition is met
      return isNameMatched || isDescriptionMatched;
    });

    // Update the filtered data state
    setFilteredData(filtered);
  }

  const menus = [
    { item: "Home", redirectTo: "/" },
    { item: "Shop", redirectTo: "/shop" },
    { item: "Cart", redirectTo: "/cart" },
    { item: "Contact", redirectTo: "/contact" },
    { item: "About", redirectTo: "/about" },
    { item: "Blog", redirectTo: "/blog" },
  ];

  return (
    !pathName.startsWith("/my-account") &&
    !pathName.startsWith("/dashboard") &&
    !pathName.startsWith("/studio") && (
      <header className="w-full flex flex-col xl:pb-0 xl:px-0 bg-red-700 text-white border-b md:border-none sticky top-0 z-50">
        <div className="w-full flex flex-col gap-7 md:flex-row py-4 px-5 md:py-5 items-center justify-center max-w-[1200px] mx-auto">
          <div className="items-center justify-center hidden lg:flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Link href={"/my-account"}>
                    <AiOutlineUser className="cursor-pointer hidden md:block text-2xl" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>My account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <IoIosHeartEmpty
                    onClick={handleRedirection}
                    className="cursor-pointer hidden md:block text-2xl "
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div
            onClick={() => router.push("/")}
            className="w-full text-center md:text-start"
          >
            <h1 className="font-extrabold text-3xl cursor-pointer">
              Hush <span className="">Catties</span>
            </h1>
            <p className="text-sm ">A place for fashion</p>
          </div>
          <div className="w-full flex items-center justify-between md:justify-end">
            <RxHamburgerMenu
              onClick={() => setIsSlided(false)}
              className="text-xl cursor-pointer md:hidden"
            />
            <div className="flex items-center justify-center gap-4 relative">
              <div className="relative">
                <Input
                  value={inputVal}
                  onChange={(e) => handleOnChange(e.target.value)}
                  placeholder="Search..."
                  className="placeholder:text-sm rounded-full h-8 placeholder:text-white"
                />
                <IoSearch className="text-3xl top-[1px] absolute bg-white text-black p-1 rounded-full right-0" />
              </div>
              <div className="flex items-center justify-center gap-3">
                {/* <div
                  onClick={() => router.push("/cart")}
                  className="h-8 p-[4px] cursor-pointer w-8 rounded-full relative "
                > */}
                <Cart />
                {/* </div> */}
                <p className="uppercase hidden md:block font-bold text-nowrap">
                  Shopping Cart
                </p>
                <p className="text-sm hidden text-nowrap lg:block">
                  {items.length} item - €{" "}
                  {items.reduce((accumulatorr, currItem) => {
                    return (
                      accumulatorr +
                      Number(currItem.productId.price * currItem.quantity)
                    );
                  }, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-2 px-5 bg-[#232323] hidden md:block lg:p-0">
          <RxHamburgerMenu className="text-white text-2xl cursor-pointer lg:hidden " />
          <ul className="w-full py-1 items-center gap-2 justify-start px-2 text-white hidden lg:flex max-w-[1200px] mx-auto">
            {menus.map((item, index) => (
              <li
                key={index}
                className={`py-2 px-2 font-extralight cursor-pointer ${pathName === item.redirectTo ? " border-b-1 rounded-br border-white" : " border-none"}`}
              >
                <Link href={item.redirectTo}>{item.item}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile Menu  */}
        <div
          className={`fixed top-0 left-0 w-[90%] h-screen text-black z-10 bg-slate-50 shadow-2xl p-5 flex flex-col transition-all ease-in-out duration-300 ${
            isSlided ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <RxCross1
            className="text-xl mt-5 cursor-pointer"
            onClick={() => setIsSlided(true)}
          />
          <ul className="mt-10 flex flex-col">
            {menus.map((item: any, index: number) => (
              <li
                onClick={() => setIsSlided(true)}
                key={index}
                className="border-b border-gray-400 py-4"
              >
                <Link href={item.redirectTo}>{item.item}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-start absolute bottom-5 left-5 gap-3 cursor-pointer">
            {authenticated ? (
              <span
                className="font-light text-sm"
                onClick={() => {
                  setIsSlided(true);
                  router.push("/my-account");
                }}
              >
                Dashboard
              </span>
            ) : (
              <span
                onClick={() => router.push("/auth")}
                className="font-light text-sm"
              >
                Login
              </span>
            )}

            <AiOutlineUser className="cursor-pointer" />
            <span className="font-light text-sm">Wishlist</span>
            <FaHeart className="cursor-pointer text-red-500" />
          </div>
        </div>
        {inputVal.length > 0 && (
          <Search
            setFilteredData={setFilteredData}
            handleOnChange={handleOnChange}
            filteredData={filteredData}
            valLength={inputVal.length}
            setInputVal={setInputVal}
          />
        )}
      </header>
    )
  );
}
