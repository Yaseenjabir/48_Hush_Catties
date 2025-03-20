import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

export const revalidate = 60;

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const query = `
*[_type == "post"]{
  title,
  summary,
  slug,
  mainImage
}
`;
  const posts = await client.fetch(query);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await client.fetch(`
*[_type == "post" && slug.current == "${slug}"]{
  title,
  body,
  mainImage
}[0]`);

  return (
    data !== undefined && (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96">
            <Image
              src={urlFor(data?.mainImage).width(950).height(460).url()}
              alt={data?.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="w-full bg-white py-10 px-3">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
              {data?.title}
            </h1>
            <section className="blog-content">
              <PortableText value={data?.body} />
            </section>
          </div>
        </div>
      </div>
    )
  );
}
