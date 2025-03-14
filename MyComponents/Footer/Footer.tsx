"use client";
import { Input } from "@/components/ui/input";
import { shopName } from "@/constants/constants";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Footer() {
  const pathName = usePathname();

  const data = [
    {
      id: 1,
      father: "Quick Links",
      children: ["Home", "Shop", "About", "Contact", "Account"],
    },
    {
      id: 2,
      father: "Categories",
      children: ["Abayas", "Tops", "Coats", "Jackets", "Purse"],
    },
    {
      id: 3,
      father: "Polices",
      children: [
        "Privacy Policy",
        "Return Policy",
        "Shipping Policy",
        "Terms of Service",
        "Exchange Policy",
      ],
    },
  ];

  return (
    !pathName.startsWith("/my-account") &&
    !pathName.startsWith("/dashboard") && (
      <footer className="py-10 px-5 bg-[#232323] text-white">
        <section className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-[1100px] mx-auto">
          {data.map((item: any, index: number) => {
            return (
              <div key={index} className="w-full">
                <h1 className="font-semibold">{item.father}</h1>
                <ul className="mt-5 px-3 text-sm text-gray-300 flex flex-col gap-5 list-disc">
                  {item.children.map((item: string, index: number) => (
                    <li key={index} className="cursor-pointer hover:underline">
                      {item}
                    </li>
                  ))}
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
