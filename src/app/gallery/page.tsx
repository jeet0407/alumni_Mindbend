"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import UploadPhoto from "@/components/UploadPhoto";
import Footer from "@/components/footer";

function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Function to load images
  const loadImages = async () => {
    setLoading(true);
    try {

      const mockImages : any[] = [
        
      ];

      setImages(mockImages);
    } catch (error) {
      console.error("Error loading gallery images:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadImages();
  }, []);
  
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

          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <UploadPhoto/>
          </div>
        </div>
      </div>

      {/* Gallery section */}
      <div className="px-6 md:px-12 lg:px-20 mb-20">
        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Event Photos
            <span className="text-sm font-normal text-gray-500 ml-2">({images.length})</span>
          </h2>
            
            <button 
              onClick={loadImages}
              className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition"
              title="Refresh gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Gallery grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {images.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No photos yet</h3>
                <p className="mt-1 text-gray-500">Be the first to upload your Mindbend event photos!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 sm:h-56">
                      <div className="absolute inset-0">
                        <Image
                          src={image}
                          alt="Gallery image"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                
                  </div>
                ))}
              </div>
            )}
            
            {images.length > 0 && (
              <div className="flex justify-center mt-10">
                <button className="px-6 py-3 bg-blue-100 text-blue-700 font-medium rounded-md hover:bg-blue-200 transition">
                  Load More Photos
                </button>
              </div>
            )}
          </>
        )}

        <Footer/>
      </div>
  );
}

export default Gallery;