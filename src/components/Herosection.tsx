"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const images = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/M.png",
];

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden z-2">
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
            quality={90}
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
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 tracking-wider">
          Welcome to Our Platform
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto mb-8">
          Discover amazing opportunities and connect with alumni, faculty and
          students.
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-300 font-semibold">
            Get Started
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300 font-semibold">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10">
      <div className="bg-blue-50 bg-opacity-95 backdrop-blur-sm px-20 py-4 rounded-t-[90px] flex flex-wrap justify-center gap-20 border-t-4 border-l-4 border-r-4 border-blue-800 shadow-lg z-12">
        <Link href="/events" className="px-8 py-3 bg-black text-white rounded-[40px] transition-all duration-300 font-bold text-lg transform hover:scale-105 hover:shadow-glow focus:outline-none relative overflow-hidden group border-3 border-blue-600">
          <span className="relative z-10">Upcoming Events</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </Link>

        <Link href="/mindbend" className="px-8 py-3 bg-black text-white rounded-[40px] transition-all duration-300 font-bold text-lg transform hover:scale-105 hover:shadow-glow focus:outline-none relative overflow-hidden group border-3 border-blue-600">
          <span className="relative z-10">Mindbend</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </Link>

        <Link href="/gallery" className="px-8 py-3 bg-black text-white rounded-[40px] transition-all duration-300 font-bold text-lg transform hover:scale-105 hover:shadow-glow focus:outline-none relative overflow-hidden group border-3 border-blue-600">
          <span className="relative z-10">Gallery</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </Link>

        <Link href="/alumni" className="px-8 py-3 bg-black text-white rounded-[40px] transition-all duration-300 font-bold text-lg transform hover:scale-105 hover:shadow-glow focus:outline-none relative overflow-hidden group border-3 border-blue-600">
          <span className="relative z-10">Connect</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;