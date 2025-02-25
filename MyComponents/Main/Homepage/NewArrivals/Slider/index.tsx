import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// Import required modules
import { Autoplay } from "swiper/modules";
import TiktokComp from "../TiktokComp";

export default function Slider() {
  return (
    <>
      <div className="w-full px-5">
        <Swiper
          slidesPerView={2} // Default: 2 slides for larger screens
          spaceBetween={20} // Space between slides
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            // When the screen width is >= 640px, show 1 slide
            640: {
              slidesPerView: 1,
            },
            // When the screen width is >= 768px, show 2 slides
            768: {
              slidesPerView: 3,
            },
            // When the screen width is >= 1024px, show 3 slides (default)
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          <SwiperSlide>
            <TiktokComp />
          </SwiperSlide>
          <SwiperSlide>
            <TiktokComp />
          </SwiperSlide>
          <SwiperSlide>
            <TiktokComp />
          </SwiperSlide>
          <SwiperSlide>
            <TiktokComp />
          </SwiperSlide>
          <SwiperSlide>
            <TiktokComp />
          </SwiperSlide>
          <SwiperSlide>
            <TiktokComp />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
