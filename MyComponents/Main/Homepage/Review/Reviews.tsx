import MainHeadings from "@/constants/ReusableComponents/MainHeadings";
import React from "react";
import { Slider } from "./Slider/js/index";

export default function Reviews() {
  return (
    <section className="w-full py-20">
      <MainHeadings
        title="Happy Costumer"
        paragraph="See what our costumer says about products"
      />
      <div className="mt-10">
        <Slider />
      </div>
    </section>
  );
}
