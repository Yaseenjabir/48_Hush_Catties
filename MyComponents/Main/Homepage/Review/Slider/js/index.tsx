"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
// import "../css/base.css";
import "../css/sandbox.css";
import "../css/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [
  {
    userName: "Aisha Marwat",
    review:
      "Absolutely love the elegant designs! The quality is amazing, and it's great to find modest fashion that is both stylish and comfortable. Highly recommend Hush Catties!",
    img: "https://i.pinimg.com/736x/29/c9/57/29c9577a4c788e65c212f598ab4886c9.jpg",
  },
  {
    userName: "Sofia Bilal",
    review:
      "Finally, a brand that blends tradition with modern fashion! The dresses fit perfectly, and the material feels premium. Customer service was also very helpful!",
    img: "https://i.pinimg.com/736x/9f/92/f0/9f92f093637e95b06eca295787c45015.jpg",
  },
  {
    userName: "Zara Saleh",
    review:
      "I’m so impressed with the collection! The outfits are modest yet trendy, and I always receive compliments when I wear them. Definitely my new favorite store!",
    img: "https://i.pinimg.com/736x/aa/04/94/aa0494bba49fa820b356c6b97dcc2ba4.jpg",
  },
  {
    userName: "Hana Louis",
    review:
      "Hush Catties has transformed my wardrobe! Their pieces are elegant and modest without compromising on style. Shipping was fast, and the fit was perfect!",
    img: "https://i.pinimg.com/736x/fa/38/e9/fa38e908c0f599d70a4e8511a3d88452.jpg",
  },
  {
    userName: "Mariam",
    review:
      "Great experience shopping here! The clothes are beautiful, modest, and high-quality. Perfect for any occasion. I’ll definitely be buying more!",
    img: "https://i.pinimg.com/736x/a8/7c/fa/a87cfa9af64f60406a999c382e3e0727.jpg",
  },
];
export function Slider() {
  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
}
