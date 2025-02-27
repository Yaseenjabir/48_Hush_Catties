"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";

export default function SameCategorySlider() {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        autoplay={{ disableOnInteraction: false, delay: 2000 }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="w-full pb-5">
            <div className="w-full">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/60-home_default/sed-viverra-felis.jpg"
                }
                alt="fashion"
                height={200}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="p-5 text-center">
              <h1 className="text-gray-700">Sed Viverra Felis</h1>
              <span className="text-red-700 text-sm">11.90$</span>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1 mt-3">
                <div className="w-full flex items-center justify-center md:w-min">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600 text-nowrap">
                  (07 reviews)
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full pb-5">
            <div className="w-full">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/60-home_default/sed-viverra-felis.jpg"
                }
                alt="fashion"
                height={200}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="p-5 text-center">
              <h1 className="text-gray-700">Sed Viverra Felis</h1>
              <span className="text-red-700 text-sm">11.90$</span>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1 mt-3">
                <div className="w-full flex items-center justify-center md:w-min">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600 text-nowrap">
                  (07 reviews)
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full pb-5">
            <div className="w-full">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/60-home_default/sed-viverra-felis.jpg"
                }
                alt="fashion"
                height={200}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="p-5 text-center">
              <h1 className="text-gray-700">Sed Viverra Felis</h1>
              <span className="text-red-700 text-sm">11.90$</span>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1 mt-3">
                <div className="w-full flex items-center justify-center md:w-min">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600 text-nowrap">
                  (07 reviews)
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full pb-5">
            <div className="w-full">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/60-home_default/sed-viverra-felis.jpg"
                }
                alt="fashion"
                height={200}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="p-5 text-center">
              <h1 className="text-gray-700">Sed Viverra Felis</h1>
              <span className="text-red-700 text-sm">11.90$</span>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1 mt-3">
                <div className="w-full flex items-center justify-center md:w-min">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600 text-nowrap">
                  (07 reviews)
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full pb-5">
            <div className="w-full">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/60-home_default/sed-viverra-felis.jpg"
                }
                alt="fashion"
                height={200}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="p-5 text-center">
              <h1 className="text-gray-700">Sed Viverra Felis</h1>
              <span className="text-red-700 text-sm">11.90$</span>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1 mt-3">
                <div className="w-full flex items-center justify-center md:w-min">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600 text-nowrap">
                  (07 reviews)
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full pb-5">
            <div className="w-full">
              <Image
                src={
                  "https://akira-elementor.axonvip.com/60-home_default/sed-viverra-felis.jpg"
                }
                alt="fashion"
                height={200}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="p-5 text-center">
              <h1 className="text-gray-700">Sed Viverra Felis</h1>
              <span className="text-red-700 text-sm">11.90$</span>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1 mt-3">
                <div className="w-full flex items-center justify-center md:w-min">
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                  <IoIosStar className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600 text-nowrap">
                  (07 reviews)
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
