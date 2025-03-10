"use client";

import React from "react";
import Slider from "./Slider";
import MainHeadings from "@/constants/ReusableComponents/MainHeadings";

export default function NewArrivals() {
  return (
    <>
      <section className="py-10 px-5">
        <MainHeadings
          title="New Arrivals"
          paragraph="Do not miss to check out our new arrivals"
        />
      </section>
      <Slider />
    </>
  );
}
