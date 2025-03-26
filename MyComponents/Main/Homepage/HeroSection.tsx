"use client";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
function HeroSection() {
  const images = [
    "https://jazmin.pk/cdn/shop/files/wb1_7ceebccf-9330-4636-8a19-6a56477d87cf.jpg?v=1740202338&width=1400",
    "https://jazmin.pk/cdn/shop/files/wb-2_3c115f3c-cc1d-4bc0-a0f6-8120c493bbe6.jpg?v=1740202357&width=1400",
    "https://jazmin.pk/cdn/shop/files/wb-4_61cd3aa1-d279-49c9-bdfa-80c44fa60def.jpg?v=1740202406&width=1400",
  ];

  return (
    <div className="w-full mx-auto">
      <Zoom
        scale={1.4}
        cssClass="myClass"
        arrows={false}
        pauseOnHover={false}
        duration={2000}
      >
        {images.map((each, index) => (
          <div
            key={index}
            className="h-[100vh]"
            style={{
              backgroundImage: `url('${each}')`,
              backgroundPosition: "bottom",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        ))}
      </Zoom>
    </div>
  );
}

export default HeroSection;
