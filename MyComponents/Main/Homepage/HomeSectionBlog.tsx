import { fetchBlogPosts } from "@/app/queries/fetchBlogPosts";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function HomeSectionBlog() {
  const data = await client.fetch(fetchBlogPosts);

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
          <Link href={"/blog"}>View All</Link>
        </button>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 max-w-[600px] lg:max-w-[1100px]">
        {data.length > 0 &&
          data.map((item: any) => {
            return (
              <div className="w-full hover:scale-110 transition-all ease-in-out duration-300">
                <div className="p-2 bg-gray-900">
                  <Image
                    src={urlFor(item.mainImage).width(800).height(500).url()}
                    alt="blog-image"
                    width={800}
                    height={500}
                    layout="responsive"
                  />
                </div>
                <div className="text-center px-2 py-5 bg-white flex flex-col gap-2 shadow-lg rounded-b-lg">
                  <h1 className="text-lg font-semibold underline cursor-pointer">
                    <Link href={item.slug.current}>
                      {item.title.slice(0, 50)}
                    </Link>
                  </h1>
                  <p>{item.summary.slice(0, 220)}</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
