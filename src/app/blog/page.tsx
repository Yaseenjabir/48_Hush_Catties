"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { fetchBlogPosts } from "../queries/fetchBlogPosts";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const [data, setData] = useState<any>();
  const [loader, setLoader] = useState(true);
  const [availability, setAvailability] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const res = await client.fetch(fetchBlogPosts);
        if (res.length > 0) {
          setData(res);
          setAvailability(true);
        } else {
          setData([]);
          setAvailability(false);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(data?.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {loader ? (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center">
          <Spinner variant="spinner" />
        </div>
      ) : !availability ? (
        <div className="flex items-center justify-center h-[50vh] w-full">
          <div>No data available</div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Blog
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div
                key={post.slug.current}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl   hover:scale-105 transition-all ease-in-out duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={urlFor(post.mainImage).width(400).url()}
                    alt={"blog post"}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:underline">
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.summary.length > 250
                      ? post.summary.slice(0, 250) + "..."
                      : post.summary}
                  </p>
                  <Link
                    href={`/blog/${post.slug.current}`} // Replace with your actual route
                    className="inline-block bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors duration-300"
                  >
                    View More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-700 hover:bg-red-800"
              } text-white`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-red-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-700 hover:bg-red-800"
              } text-white`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
