"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function TiktokComp() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const setTimeInterval = setTimeout(() => {
      captureThumbnail();
    }, 2000);

    return () => clearTimeout(setTimeInterval);
  }, []);

  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Ensure both video and canvas are not null
    if (video && canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Set the canvas size to match the video's size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame onto the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL
        const imageUrl = canvas.toDataURL("image/png");

        // Set the captured thumbnail as the source for the image
        setThumbnail(imageUrl);
      }
    }
  };

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(45deg, #6e492e, #91714d, #704a32, #c19a6b)",
        }}
        className="text-white p-2 flex flex-col gap-3 h-[380px] max-w-[188px]"
      >
        <div className="">
          {/* Video component */}
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            loop
            autoPlay
            muted
            onPlay={captureThumbnail}
          >
            <source src="/model_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-2 flex flex-col gap-2 bg-white rounded-md shadow-xl border border-[#232323] text-black relative">
          <div className="flex gap-2">
            <div className="w-10">
              {/* Dynamically generated thumbnail */}
              <Image
                src={thumbnail || "/images/default-thumbnail.jpg"} // Default thumbnail if no screenshot taken
                alt="video-thumbnail"
                height={150}
                width={150}
                className="object-cover"
              />
            </div>
            <div className="text-[12px] flex flex-col justify-evenly">
              <h1>Dark Olive S...</h1>
              <span>Rs 5000</span>
            </div>
          </div>

          <div className="w-full flex items-start justify-center gap-1">
            <button className="bg-black text-[12px] text-white py-1 w-full rounded-lg">
              Add to cart
            </button>
            <button className="bg-black text-[12px] flex-1 py-[7px] px-3 text-white w-full rounded-lg">
              <FaShoppingCart />
            </button>
          </div>

          {/* Button to capture screenshot */}
        </div>
      </div>

      {/* Hidden canvas element to capture video frame */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </>
  );
}
