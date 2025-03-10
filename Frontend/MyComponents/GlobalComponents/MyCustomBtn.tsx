import React from "react";

export default function MyCustomBtn({ children }: { children: any }) {
  return (
    <button
      className="w-full py-2 rounded-full bg-red-700 text-white font-semibold
  border border-red-700 hover:bg-transparent hover:text-red-700
  transition-all ease-in-out duration-300 text-nowrap px-5"
    >
      {children}
    </button>
  );
}
