import Image from "next/image";
import React from "react";
import Heading from "./Heading";

export default function Orders() {
  return (
    <section className="w-full py-10 px-5 flex flex-col gap-10">
      <Heading text="Orders" />
      <div
        style={{ boxShadow: "-3px 7px 15px 0px rgba(0, 0, 0, 0.33)" }}
        className="w-full flex items-center justify-center p-5 rounded-lg shadow-lg relative gap-5"
      >
        <div className="w-[20%]">
          <Image
            src={
              "https://zainbia.com/wp-content/uploads/2024/04/IMG_6964-100x100.jpg"
            }
            height={100}
            width={100}
            alt="fashion"
            className="rounded-lg"
          />
        </div>
        <div className="w-[80%] text-sm flex flex-col gap-2">
          <h1 className="font-semibold text-base">February 28, 2025</h1>
          <p>Status - Processing </p>
          <p>Rs 4,250 for 1 item </p>
          <span className="md:absolute top-5 right-5">View</span>
        </div>
      </div>
      <div
        style={{ boxShadow: "-3px 7px 15px 0px rgba(0, 0, 0, 0.33)" }}
        className="w-full flex items-center justify-center p-5 rounded-lg shadow-lg relative gap-5"
      >
        <div className="w-[20%]">
          <Image
            src={
              "https://zainbia.com/wp-content/uploads/2024/04/IMG_6964-100x100.jpg"
            }
            height={100}
            width={100}
            alt="fashion"
            className="rounded-lg"
          />
        </div>
        <div className="w-[80%] text-sm flex flex-col gap-2">
          <h1 className="font-semibold text-base">February 28, 2025</h1>
          <p>Status - Processing </p>
          <p>Rs 4,250 for 1 item </p>
          <span className="md:absolute top-5 right-5">View</span>
        </div>
      </div>
      <div
        style={{ boxShadow: "-3px 7px 15px 0px rgba(0, 0, 0, 0.33)" }}
        className="w-full flex items-center justify-center p-5 rounded-lg shadow-lg relative gap-5"
      >
        <div className="w-[20%]">
          <Image
            src={
              "https://zainbia.com/wp-content/uploads/2024/04/IMG_6964-100x100.jpg"
            }
            height={100}
            width={100}
            alt="fashion"
            className="rounded-lg"
          />
        </div>
        <div className="w-[80%] text-sm flex flex-col gap-2">
          <h1 className="font-semibold text-base">February 28, 2025</h1>
          <p>Status - Processing </p>
          <p>Rs 4,250 for 1 item </p>
          <span className="md:absolute top-5 right-5">View</span>
        </div>
      </div>
    </section>
  );
}
