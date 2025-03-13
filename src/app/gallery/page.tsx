"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

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
            <div className="bg-blue-50 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                Upload your Mindbend photos
              </h3>
              {/* <p className="text-gray-700 mb-6">Share your memorable moments from Mindbend events with the community.</p> */}

              <label className="flex flex-col items-center px-6 py-4 bg-white text-blue-600 rounded-lg tracking-wide border border-blue-300 cursor-pointer hover:bg-blue-50 transition-colors duration-300">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <span className="text-base font-medium">Select photos</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                />
              </label>

              <button className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105">
                Upload
              </button>
            </div>
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
