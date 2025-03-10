import React from "react";
import Heading from "../Heading";
// import { ImFileEmpty } from "react-icons/im";
// import MyCustomBtn from "../../../../../MyComponents/GlobalComponents/MyCustomBtn";
// import Link from "next/link";
import TableComp from "./Table";

export default function Wishlist() {
  return (
    <section className="w-full py-10 px-5">
      <Heading text="Wishlist" />
      {/* <div className="w-full bg-gray-50 flex flex-col p-5 border-t-[3px] border-t-black">
        <div className="flex items-center gap-2 ">
          <ImFileEmpty />
          <p className="text-sm">Your Wishlist is currently empty</p>
        </div>
      </div>
      <div className="w-min mt-5">
        <Link href={"/shop"}>
          <MyCustomBtn>Return to shop</MyCustomBtn>
        </Link>
      </div> */}
      <TableComp />
    </section>
  );
}
