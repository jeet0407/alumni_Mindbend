"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import UploadPhoto from "@/components/UploadPhoto";

function Gallery() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main header section */}
      <div className="pt-28 px-6 md:px-12 lg:px-20 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Heading */}
          <div className="w-full md:w-2/3 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-black">
                MINDBEND Gallery
              </span>

              <div className="mt-2 h-1 w-3/4 bg-gradient-to-r from-blue-600 to-black rounded-full"></div>
            </h1>
            <p className="text-lg text-blue-600 font-bold mt-4">
              Share your memorable moments from Mindbend events with the
              community.
            </p>
          </div>

          {/* Right side - Upload section */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            
              <UploadPhoto/>
            
          </div>
        </div>
      </div>

      {/* Placeholder for gallery images */}
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">
                  Gallery Image {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
