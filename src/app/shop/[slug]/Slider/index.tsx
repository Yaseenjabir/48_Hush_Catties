// index.tsx
"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./css/embla.css";

const OPTIONS: EmblaOptionsType = {};

const ShopSlider: React.FC<{ IMAGES: string[] }> = ({ IMAGES }) => (
  <>
    <EmblaCarousel slides={IMAGES} options={OPTIONS} />
  </>
);

export default ShopSlider;
