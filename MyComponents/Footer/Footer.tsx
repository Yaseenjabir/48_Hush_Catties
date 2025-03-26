"use client";
import { Input } from "@/components/ui/input";
import { categories, shopName } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Footer() {
  const pathName = usePathname();

  const data = [
    {
      id: 1,
      father: "Quick Links",
      children: [
        { name: "Home", redirectTo: "/" },
        { name: "Shop", redirectTo: "/shop" },
        { name: "About", redirectTo: "/" },
        { name: "Contact", redirectTo: "/contact" },
        { name: "Account", redirectTo: "/my-account" },
      ],
    },
    {
      id: 2,
      father: "Categories",
      children: categories,
    },
    {
      id: 3,
      father: "Polices",
      children: [
        { name: "Privacy Policy", redirectTo: "/" },
        { name: "Return Policy", redirectTo: "/" },
        { name: "Shipping Policy", redirectTo: "/" },
        { name: "Terms of Service", redirectTo: "/" },
        { name: "Exchange Policy", redirectTo: "/" },
      ],
    },
  ];

  return (
    !pathName.startsWith("/my-account") &&
    !pathName.startsWith("/dashboard") &&
    !pathName.startsWith("/studio") && (
      <footer className="py-10 px-5 bg-[#232323] text-white">
        <section className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-[1100px] mx-auto">
          {data.map((father: any, index: number) => {
            return (
              <div key={index} className="w-full">
                <h1 className="font-semibold">{father.father}</h1>
                <ul className="mt-5 px-3 text-sm text-gray-300 flex flex-col gap-5 list-disc">
                  {father.children.map((item, index: number) => {
                    if (father.father === "Categories") {
                      return (
                        <li
                          key={index}
                          className="cursor-pointer hover:underline"
                        >
                          <Link href={`/shop?categories=${item}`}>{item}</Link>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={index}
                          className="cursor-pointer hover:underline"
                        >
                          <Link href={item.redirectTo}>{item.name}</Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            );
          })}
          <div className="flex flex-col gap-3">
            <h1 className="uppercase">Join our newsletter</h1>
            <p className="text-sm text-gray-300">
              Subscribe to our newsletter to get latest updates.
            </p>
            <form
              onClick={(e) => {
                e.preventDefault();
                toast.success("Your email has been submitted successfully.");
              }}
              className="flex items-center justify-center gap-3 lg:flex-col"
            >
              <Input
                placeholder="Enter your email"
                className="flex-1 w-full lg:py-2"
              />
              <button className="bg-white lg:w-full text-black py-[6px] px-3 rounded">
                Submit
              </button>
            </form>
          </div>
        </section>
        <div className="mt-10 text-center text-sm">
          <h1>&#169; 2025 All rights reserved by {shopName}</h1>
          <span className="text-[12px]">
            Powered by{" "}
            <span className="font-semibold uppercase underline">
              MARK Digital Media Co.
            </span>
          </span>
        </div>
      </footer>
    )
  );
}
