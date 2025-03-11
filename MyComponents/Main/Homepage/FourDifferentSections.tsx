import React from "react";
import { GiAmpleDress } from "react-icons/gi";
import { MdLocalOffer, MdLock } from "react-icons/md";
import { TbAwardFilled } from "react-icons/tb";
export default function FourSections() {
  return (
    <section className="py-10 px-5 gap-10 lg:gap-0 bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div className="w-full flex flex-col items-center justify-center border-b-[2px] lg:border-r-[2px] lg:border-b-0 border-white px-5 py-10">
        <TbAwardFilled className="text-8xl text-red-500 border-[2px] border-red-500 rounded-full p-1" />
        <div className="text-white text-center mt-5">
          <h1 className="font-semibold text-2xl">Exceptional Quality</h1>
          <p>
            Experience top-notch products crafted with precision and care,
            ensuring long-lasting durability.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center border-b-[2px] lg:border-r-[2px] lg:border-b-0 border-white px-5 py-10">
        <GiAmpleDress className="text-8xl text-red-500 border-[2px] border-red-500 rounded-full p-1" />
        <div className="text-white text-center mt-5">
          <h1 className="font-semibold text-2xl">Best Quality</h1>
          <p>
            Enhance your shopping with our guarantee of top-notch quality fabric
            products.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center border-b-[2px] lg:border-r-[2px] lg:border-b-0 border-white px-5 py-10">
        <MdLocalOffer className="text-8xl text-red-500 border-[2px] border-red-500 rounded-full p-1" />
        <div className="text-white text-center mt-5">
          <h1 className="font-semibold text-2xl">Best Offers</h1>
          <p>Discover unbeatable deals with our exclusive offer symbol.</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center border-b-[2px]  lg:border-b-0 border-white px-5 py-10">
        <MdLock className="text-8xl text-red-500 border-[2px] border-red-500 rounded-full p-1" />
        <div className="text-white text-center mt-5">
          <h1 className="font-semibold text-2xl">Secure Payments</h1>
          <p>
            Unlock secure transactions with confidence your gateway to seamless
            payments.
          </p>
        </div>
      </div>
    </section>
  );
}
