import Image from "next/image";
import React from "react";
import Heading from "./Heading";

export default function Orders({ data }) {
  const products = data?.orders?.flatMap((item) =>
    item.products.map((product) => ({
      product, // The product itself
      createdAt: item.createdAt,
      amountTotal: item.amountTotal,
    }))
  );

  return (
    <section className="w-full py-10 px-5 flex flex-col gap-10">
      <Heading text="Orders" />
      {products.map((item, index) => {
        return (
          <div
            key={index}
            style={{ boxShadow: "-3px 7px 15px 0px rgba(0, 0, 0, 0.33)" }}
            className="w-full flex items-center justify-center p-5 rounded-lg shadow-lg relative gap-5"
          >
            <div className="w-[20%]">
              <Image
                src={item.product.images[0]}
                height={100}
                width={100}
                alt="fashion"
                className="rounded-lg"
              />
            </div>
            <div className="w-[80%] text-sm flex flex-col gap-2">
              <h1 className="font-semibold text-base">
                Created at{" "}
                {
                  new Date(item.createdAt)
                    .toISOString()
                    .replace("T", " ")
                    .split(".")[0]
                }
              </h1>
              <p>Status - Processing </p>
              <p>
                € {item.amountTotal / 100} for {item.product.quantity} item{" "}
              </p>
              {/* <span className="md:absolute top-5 right-5">View</span> */}
            </div>
          </div>
        );
      })}
    </section>
  );
}
