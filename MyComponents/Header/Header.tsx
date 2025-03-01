"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ReactTyped } from "react-typed";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Cart from "../GlobalComponents/Cart/Cart";
import { usePathname } from "next/navigation";
export default function Header() {
  const [isSlided, setIsSlided] = useState(true);

  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const pathName = usePathname();

  console.log(pathName);

  const menus = [
    { item: "Home", redirectTo: "/" },
    { item: "Shop", redirectTo: "/shop" },
    { item: "About", redirectTo: "" },
    { item: "Contact", redirectTo: "" },
    { item: "Arrivals", redirectTo: "" },
    { item: "Featured", redirectTo: "" },
  ];

  return (
    <>
      {!pathName.startsWith("/auth") && !pathName.startsWith("/my-account") && (
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
                <Link href={"/my-account"}>
                  <AiOutlineUser className="cursor-pointer hidden md:block text-2xl" />
                </Link>
                <FaHeart className="cursor-pointer hidden md:block text-2xl text-red-500" />
              </div>

              <div className="items-center justify-center hidden md:flex">
                <ul className="flex items-center justify-center gap-5">
                  {menus.slice(0, 3).map((item: any, index) => {
                    return (
                      <li
                        key={index}
                        className="hover:underline cursor-pointer"
                      >
                        <Link href={item.redirectTo}>{item.item}</Link>
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
                      <li
                        key={index}
                        className="hover:underline cursor-pointer"
                      >
                        <Link href={item.redirectTo}>{item.item}</Link>
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
                <Cart />
              </div>
              <div
                className={`bg-black text-white mx-auto ${
                  isSearchBarActive ? "max-h-screen" : "max-h-0 p-0"
                } absolute top-[128px] overflow-hidden left-0 w-full z-10 transition-all ease-in-out duration-700`}
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
                  {/* <div className="w-full flex flex-col items-center justify-center py-10 px-5 bg-black text-white h-[451px]">
                <span>
                  No results could be found. Please try again with a different
                  query.
                </span>
              </div> */}
                  <div className="bg-black flex flex-col lg:flex-row p-5 h-[451px] lg:gap-10">
                    <div className="w-full lg:w-[20%]">
                      <h1 className="uppercase font-thin border-b border-b-gray-500 py-2">
                        Suggestions
                      </h1>
                      <div className="w-full py-5 flex gap-3 flex-wrap">
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          Dress
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          clothes
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          Lawn
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          Abayas
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          collections
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          New Dresses
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          low prices
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          2025 best dress
                        </span>
                        <span className="w-min text-nowrap cursor-pointer hover:underline">
                          velvet
                        </span>
                      </div>
                    </div>
                    <div className="w-full lg:w-[80%]">
                      <h1 className="uppercase font-thin border-b border-b-gray-500 py-2">
                        Products
                      </h1>
                      <div className="w-full py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 overflow-auto max-h-[220px]">
                        <div className="flex items-center w-full justify-start gap-2 text-sm">
                          <div>
                            <Image
                              src={
                                "https://heerpret.com/cdn/shop/files/Eminence.webp?v=1739190116&width=100"
                              }
                              width={100}
                              height={100}
                              alt="fashion"
                              layout="responsive"
                            />
                          </div>
                          <div>
                            <h1 className="font-medium">
                              Eminence 2Pc -Pima Lawn
                            </h1>
                            <span className="text-red-500 font-thin">
                              Rs.2,995.00
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full justify-start gap-2 text-sm">
                          <div>
                            <Image
                              src={
                                "https://heerpret.com/cdn/shop/files/Eminence.webp?v=1739190116&width=100"
                              }
                              width={100}
                              height={100}
                              alt="fashion"
                              layout="responsive"
                            />
                          </div>
                          <div>
                            <h1 className="font-medium">
                              Eminence 2Pc -Pima Lawn
                            </h1>
                            <span className="text-red-500 font-thin">
                              Rs.2,995.00
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full justify-start gap-2 text-sm">
                          <div>
                            <Image
                              src={
                                "https://heerpret.com/cdn/shop/files/Eminence.webp?v=1739190116&width=100"
                              }
                              width={100}
                              height={100}
                              alt="fashion"
                              layout="responsive"
                            />
                          </div>
                          <div>
                            <h1 className="font-medium">
                              Eminence 2Pc -Pima Lawn
                            </h1>
                            <span className="text-red-500 font-thin">
                              Rs.2,995.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  <Link href={item.redirectTo}>{item.item}</Link>
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
      )}
    </>
  );
}
