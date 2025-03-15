"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/hero/M2.png",
  "/images/hero/M3.png",
  "/images/hero/M4.png",
  "/images/hero/M.png",
];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20">
      <div
        className="relative w-full  overflow-hidden z-2 shadow-xl"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        {/* Background Images Carousel */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Hero background ${index + 1}`}
              fill
              priority={index === 0}
              quality={75}
              style={{
                objectFit: "cover",
                filter: "brightness(0.6)",
              }}
            />
          </div>
        ))}

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 max-w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-3 md:mb-4 tracking-wider">
            Mindbend Alumni Network
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Discover amazing opportunities and connect with alumni, faculty and
            students.
          </p>

          {/* Mobile only - Mindbend and Connect buttons with blur background */}
          <div className="md:hidden w-full flex justify-center mt-8">
            <div className="backdrop-blur-md bg-black/30  p-4 flex flex-col sm:flex-row gap-4 w-[90%] sm:w-auto">
              <a
                href="/mindbend"
                className="w-full sm:w-auto flex justify-center"
              >
                <button className="px-24 py-3 text-white transition-all duration-300 font-bold text-sm transform focus:outline-none relative overflow-hidden group border-2 flex items-center">
                  <span className="relative z-10">Mindbend</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
          <div className="md:hidden w-full flex justify-center mt-4">
            <div className="backdrop-blur-md bg-black/30  py-4 flex flex-col sm:flex-row gap-4 w-[90%] sm:w-auto">
              <a
                href="/alumni"
                className="w-full sm:w-auto flex justify-center"
              >
                <button className="px-24 py-3 text-white transition-all duration-300 font-bold text-sm transform focus:outline-none relative overflow-hidden group border-2 flex items-center">
                  <span className="relative z-10">Connect</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>

{/* Bottom Navigation Bar with enhanced responsiveness */}
<div className="absolute bottom-0 left-0 right-0 hidden md:block z-10">
  <div className="flex justify-center">
    <nav className="bg-blue-50 bg-opacity-95 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-14 py-3 lg:py-4
                  rounded-t-[40px] md:rounded-t-[60px] lg:rounded-t-[90px]
                  flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-10 xl:gap-16
                  border-t-4 border-l-4 border-r-4 border-blue-800 shadow-lg
                  max-w-[95%] md:max-w-[90%] overflow-x-auto">
      
      {/* Navigation links using array for better maintainability */}
      {[
        { href: "#upcoming-events", label: "Upcoming Events", isScroll: true },
        { href: "/mindbend", label: "Mindbend" },
        { href: "/gallery", label: "Gallery" },
        { href: "/alumni", label: "Connect" }
      ].map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="px-3 sm:px-4 md:px-5 lg:px-8 py-2 md:py-3
                   bg-black text-white 
                   rounded-[30px] md:rounded-[40px]
                   text-sm md:text-base lg:text-lg font-bold
                   whitespace-nowrap flex-shrink-0
                   border-2 md:border-3 border-blue-600
                   transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                   group relative overflow-hidden"
        >
          <span className="relative z-10">{link.label}</span>
          <span 
            className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 
                     group-hover:w-full transition-all duration-300 ease-in-out"
            aria-hidden="true"
          ></span>
        </Link>
      ))}
    </nav>
  </div>
</div>
      </div>
    </div>
  );
};

export default HeroSection;
