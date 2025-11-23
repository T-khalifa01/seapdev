"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function BgCarousel({ images }) {
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-1500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="relative shrink-0 w-full h-full overflow-hidden"
          >
            {/* Zoom wrapper */}
            <div
              className={`relative w-full h-full transition-transform duration-8000 ease-out ${
                current === index ? "scale-130" : "scale-100"
              }`}
            >
              <Image
                src={src}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="hidden sm:absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 rounded-full hover:bg-black/70"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 rounded-full hover:bg-black/70"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="hidden sm:absolute bottom-6 w-full  justify-center space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
