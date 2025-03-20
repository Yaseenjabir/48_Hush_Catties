"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ReactTyped } from "react-typed";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Cart from "../GlobalComponents/Cart/Cart";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "@/constants/constants";
// import Search from "./Search";
export default function Header() {
  const [isSlided, setIsSlided] = useState(true);

  const pathName = usePathname();

  const router = useRouter();

  const handleRedirection = () => {
    const token = getCookie("authToken");
    if (!token) {
      router.push("/auth?my-account");
      return;
    }
    router.push("/my-account");
    localStorage.setItem("nav", "Wishlist");
  };
  const menus = [
    { item: "Home", redirectTo: "/" },
    { item: "Shop", redirectTo: "/shop" },
    { item: "Cart", redirectTo: "/cart" },
    { item: "Contact", redirectTo: "/contact" },
    { item: "About", redirectTo: "/" },
    { item: "Find", redirectTo: "/shop" },
  ];

  return (
    <>
      {!pathName.startsWith("/my-account") &&
        !pathName.startsWith("/dashboard") && (
          <>
            <div className="w-full px-5 z-[1000] sticky top-0 py-2 flex items-center justify-center bg-red-700 text-white">
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
            <div className="w-full z-[999] bg-black sticky top-[40px]">
              <header className="py-3 px-5 max-w-[1200px] mx-auto text-white flex items-center justify-between">
                <RxHamburgerMenu
                  className="text-2xl cursor-pointer md:hidden"
                  onClick={() => setIsSlided(false)}
                />
                <div className="flex items-center justify-center">
                  <Link href={"/my-account"}>
                    <AiOutlineUser className="cursor-pointer hidden md:block text-2xl" />
                  </Link>
                  <IoMdHeartEmpty
                    onClick={handleRedirection}
                    className="cursor-pointer hidden md:block text-2xl text-red-500"
                  />
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
                    src={"/mainLogo.jpg"}
                    width={400}
                    height={400}
                    layout="responsive"
                    alt="logo"
                    className="rounded-full"
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
                  <Cart />
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
