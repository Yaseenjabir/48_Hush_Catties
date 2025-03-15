import { shopLocation, shopName } from "@/constants/constants";
import Image from "next/image";
import React from "react";

export default function OurBestSelling() {
  return (
    <section className="w-full flex flex-col lg:flex-row max-w-[1200px] mx-auto">
      <div className="lg:w-[50%]">
        <Image
          src={"/ourBestSelling.jpg"}
          alt="brand-selling-image"
          height={430}
          width={600}
          layout="responsive"
        />
      </div>
      <div className="px-5 py-8 flex flex-col gap-10 lg:w-[50%] lg:px-20 lg:py-20">
        <div className="text-center flex flex-col gap-5">
          <h1 className="uppercase font-semibold text-xl">
            Shop the Best Women Clothing Brand in {shopLocation}
          </h1>
          <p className="text-gray-700 font-light">
            Finding the perfect outfit Should not be Difficult. That is why{" "}
            <span className="font-semibold underline">{shopName}</span>, one of
            the{" "}
            <span className="font-semibold underline">
              top online clothing stores
            </span>{" "}
            in {shopLocation}, offers a seamless shopping experience. So our
            collection of{" "}
            <span className="font-semibold underline">
              women ready-to-wear in {shopLocation}
            </span>{" "}
            is designed for modern women who love fashion but also value comfort
            and quality.
          </p>
        </div>
        <div className="text-center flex flex-col gap-5">
          <h1 className="uppercase font-semibold text-xl">
            Trendy Styles, Premium Quality, Affordable Price in {shopName}
          </h1>
          <p className="text-gray-700 font-light">
            We bring you trendy styles, high-quality fabrics, and Affordable
            Rates all at prices that make style easy to access. When it comes to{" "}
            <span className="font-semibold underline">
              women clothing brands in Pakistan
            </span>
            , Heer Pret stands out with fashion that speaks to every woman.
          </p>
        </div>
      </div>
    </section>
  );
}
