import React from "react";
import Heading from "./Heading";
import { Playfair_Display } from "next/font/google";
const playfairDisplay = Playfair_Display({
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Addresses() {
  return (
    <section className="w-full py-10 px-5">
      <Heading text="Addresses" />
      <p className="text-sm md:text-base">
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="w-full flex flex-col items-center justify-center gap-10 mt-5 lg:flex-row">
        <div className="w-full border">
          <div className="w-full bg-[#f1f1f173] p-5 border-b-[2px]">
            <h1
              className={`${playfairDisplay.className} text-2xl font-bold mb-10`}
            >
              Billing Address
            </h1>
            <p className="text-end w-full text-sm">Edit Billing Address</p>
          </div>
          <div className="p-5 italic text-gray-600 text-sm">
            <ul className="flex flex-col gap-2">
              <li>Yaseen Jabir</li>
              <li>Street 1</li>
              <li>Street 2</li>
              <li>Islamabad</li>
              <li>23200</li>
            </ul>
          </div>
        </div>
        <div className="w-full border">
          <div className="w-full bg-[#f1f1f173] p-5 border-b-[2px]">
            <h1
              className={`${playfairDisplay.className} text-2xl font-bold mb-10`}
            >
              Shipping Address
            </h1>
            <p className="text-end w-full text-sm">Edit Shipping Address</p>
          </div>
          <div className="p-5 italic text-gray-600 text-sm">
            <ul className="flex flex-col gap-2">
              <li>Yaseen Jabir</li>
              <li>Street 1</li>
              <li>Street 2</li>
              <li>Islamabad</li>
              <li>23200</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
