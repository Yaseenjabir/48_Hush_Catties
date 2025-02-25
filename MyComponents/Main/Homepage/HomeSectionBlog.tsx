import Image from "next/image";
import React from "react";

export default function HomeSectionBlog() {
  return (
    <section
      style={{
        backgroundImage: "url('/hompage_aboutus.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="w-full py-10 px-5 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <h1 className="text-4xl uppercase text-gray-800">Blog</h1>
        <button className="py-1 px-3 rounded-full border-black border hover:bg-black hover:text-white transition-all ease-in-out duration-300">
          View All
        </button>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 max-w-[600px] lg:max-w-[1100px]">
        <div className="w-full">
          <div className="p-2 bg-gray-900">
            <Image
              src={
                "https://www.afrozeh.com/cdn/shop/files/600x600_banner_02.jpg?v=1740210166&width=800"
              }
              alt="blog-image"
              width={800}
              height={500}
              layout="responsive"
            />
          </div>
          <div className="text-center px-2 py-5 bg-white flex flex-col gap-2 shadow-lg rounded-b-lg">
            <h1 className="text-lg font-semibold underline cursor-pointer">
              19 Best Winter Outfit Ideas for a Chic and Cozy Winter Look in
              2025
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              obcaecati delectus. Esse asperiores accusamus facere molestias
              repudiandae explicabo earum reprehenderit ea! Laborum ducimus eius
              nobis, harum aspernatur cumque odio laboriosam.
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="p-2 bg-gray-900">
            <Image
              src={
                "https://www.afrozeh.com/cdn/shop/files/600x600_banner_02.jpg?v=1740210166&width=800"
              }
              alt="blog-image"
              width={800}
              height={500}
              layout="responsive"
            />
          </div>
          <div className="text-center px-2 py-5 bg-white flex flex-col gap-2 shadow-lg rounded-b-lg">
            <h1 className="text-lg font-semibold underline cursor-pointer">
              19 Best Winter Outfit Ideas for a Chic and Cozy Winter Look in
              2025
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              obcaecati delectus. Esse asperiores accusamus facere molestias
              repudiandae explicabo earum reprehenderit ea! Laborum ducimus eius
              nobis, harum aspernatur cumque odio laboriosam.
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="p-2 bg-gray-900">
            <Image
              src={
                "https://www.afrozeh.com/cdn/shop/files/600x600_banner_02.jpg?v=1740210166&width=800"
              }
              alt="blog-image"
              width={800}
              height={500}
              layout="responsive"
            />
          </div>
          <div className="text-center px-2 py-5 bg-white flex flex-col gap-2 shadow-lg rounded-b-lg">
            <h1 className="text-lg font-semibold underline cursor-pointer">
              19 Best Winter Outfit Ideas for a Chic and Cozy Winter Look in
              2025
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              obcaecati delectus. Esse asperiores accusamus facere molestias
              repudiandae explicabo earum reprehenderit ea! Laborum ducimus eius
              nobis, harum aspernatur cumque odio laboriosam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
