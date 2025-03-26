import React from "react";
import { Playfair_Display } from "next/font/google";
export const playfairDisplay = Playfair_Display({
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Heading({ text }: { text: string }) {
  return (
    <h1 className={`${playfairDisplay.className} text-3xl font-bold mb-10`}>
      {text}
    </h1>
  );
}
