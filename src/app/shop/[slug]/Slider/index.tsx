// index.tsx
"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./css/embla.css";

// Array of image URLs
const IMAGES = [
  "https://akira-elementor.axonvip.com/28-large_default/morbi-vitae-mi.jpg",
  "https://akira-elementor.axonvip.com/29-large_default/morbi-vitae-mi.jpg",
  "https://akira-elementor.axonvip.com/30-large_default/morbi-vitae-mi.jpg",
  "https://akira-elementor.axonvip.com/31-large_default/morbi-vitae-mi.jpg",
  "https://akira-elementor.axonvip.com/29-large_default/morbi-vitae-mi.jpg",
];

const OPTIONS: EmblaOptionsType = {};

const ShopSlider: React.FC = () => (
  <>
    <EmblaCarousel slides={IMAGES} options={OPTIONS} />
  </>
);

export default ShopSlider;
