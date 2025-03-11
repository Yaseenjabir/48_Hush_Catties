import MainHeadings from "@/constants/ReusableComponents/MainHeadings";
import Image from "next/image";
import React from "react";

interface DATA {
  img: string;
  title: string;
}

export default function OurCollections() {
  const data: DATA[] = [
    {
      img: "https://jazmin.pk/cdn/shop/files/7_86c1a904-4201-4fe4-9b7e-c3a53395dcd2.jpg?v=1738836950&width=500",
      title: "UNSTITCHED SUMMER",
    },
    {
      img: "https://jazmin.pk/cdn/shop/files/g_83f810c3-c82f-4d2d-ad33-ffc0fe9de9a3.jpg?v=1727415368&width=500",
      title: "VELVET",
    },
    {
      img: "https://jazmin.pk/cdn/shop/files/12_4cb3bf58-beb2-470d-9b3c-2bc867d787ae.jpg?v=1738904956&width=500",
      title: "READY TO WEAR",
    },
    {
      img: "https://jazmin.pk/cdn/shop/files/14_4dbaca0b-5fe2-4990-b043-709966e77b4d.jpg?v=1733121201&width=500",
      title: "SEMI FORMALS",
    },
  ];

  return (
    <section className="w-full py-10 px-5 lg:px-10">
      <MainHeadings
        title="OUR LATEST COLLECTIONS"
        paragraph="A collection that offers a symphony of colors and textures."
      />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mt-10">
        {data.map((item: DATA, index) => {
          return (
            <div
              key={index}
              className="w-full flex flex-col gap-5 text-center items-center justify-center"
            >
              <div className="w-full">
                <Image
                  className="w-full"
                  src={item.img}
                  alt="shopping-image"
                  height={500}
                  width={500}
                />
              </div>
              <h1 className="text-xl">{item.title}</h1>
              <button className="bg-black py-3 px-4 w-min text-nowrap text-white text-sm border border-transparent hover:border-black hover:text-black hover:bg-white transition-all ease-in-out duration-300">
                SHOP NOW
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
