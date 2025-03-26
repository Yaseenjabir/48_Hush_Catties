import { shopLocation, shopName } from "@/constants/constants";
import MainHeadings from "@/constants/ReusableComponents/MainHeadings";
import Image from "next/image";
import React from "react";

export default function Aboutus() {
  return (
    <section
      style={{
        background:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/hompage_aboutus.png')",
        backgroundAttachment: "fixed",
      }}
      className="flex flex-col py-10 lg:py-16 xl:py-20 px-8 mt-20"
    >
      <MainHeadings
        title="About Us"
        paragraph={`Discover ${shopName}, where fashion meets affordability, offering unique designs that empower and inspire women everywhere.`}
      />
      <div className="w-full flex flex-col gap-24 mt-10 text-[14px] lg:flex-row-reverse">
        <div className="w-full flex lg:w-[40%]">
          <div className="w-full translate-y-10 translate-x-7">
            <Image
              src={
                "https://www.shauryasanadhya.com/cdn/shop/files/DSC1977_e0680e6b-d818-4f79-80ec-9f27a1f7403f_360x.jpg?v=1674472383"
              }
              alt="fashion-image"
              height={300}
              width={200}
              layout="responsive"
            />
          </div>
          <div className="w-full">
            <Image
              src={
                "https://www.shauryasanadhya.com/cdn/shop/files/DSC6350_360x.jpg?v=1700127821"
              }
              alt="fashion-image"
              height={300}
              width={200}
              layout="responsive"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:w-[60%]">
          <p>
            {shopName} is a dynamic and rapidly growing company that proudly
            represents the essence of youthful energy and modernity. We are
            driven by a passion to offer high-quality products designed
            specifically for women who seek both style and affordability. Our
            brand is built on the foundation of offering not only great value
            but also designs that truly resonate with the vibrant, confident,
            and fashion-forward women of today. Our dedicated team works
            relentlessly to bring fresh and innovative designs to life, ensuring
            that every collection is a reflection of the latest trends in
            fashion, while maintaining a strong focus on comfort, elegance, and
            uniqueness. At {shopName}, we believe that fashion should be
            inclusive, and we are committed to offering something special for
            every woman.
          </p>
          <p>
            Our design team, led by a visionary and successful fashion
            enthusiast, is constantly inspired by global trends, local culture,
            and the diverse needs of our customers. This collaboration allows us
            to create a wide array of products in a palette of bold, stunning
            colors, and contemporary styles that cater to various preferences.
            Each product we offer is meticulously crafted, blending creativity
            with functionality, ensuring that our customers experience not just
            a product, but a story—a story that speaks of passion, attention to
            detail, and dedication to providing the best.
          </p>
          <p>
            At {shopName}, our mission goes beyond just selling products; we aim
            to create a seamless and delightful shopping experience for every
            customer, no matter where they are in {shopLocation}. From browsing
            our collections to receiving your purchase at your doorstep, we want
            you to feel valued and appreciated every step of the way. With our
            ever-expanding range of designs, sizes, and options, there is
            something for everyone. We are constantly evolving, listening to
            feedback, and adapting to ensure that your shopping experience is as
            enjoyable as possible. We are not just about fashion; we are about
            making you feel confident, beautiful, and empowered with every piece
            you choose.
          </p>
        </div>
      </div>
    </section>
  );
}
