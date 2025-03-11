"use client";
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Mock alumni data - replace with your actual alumni images
const alumniImages = [
  {
    src: '/alumni/alumni1.jpg',
    alt: 'Alumni 1',
    batch: '2018'
  },
  {
    src: '/alumni/alumni2.jpg',
    alt: 'Alumni 2',
    batch: '2019'
  },
  {
    src: '/alumni/alumni3.jpg',
    alt: 'Alumni 3',
    batch: '2020'
  },
  {
    src: '/alumni/alumni4.jpg',
    alt: 'Alumni 4',
    batch: '2021'
  },
  {
    src: '/alumni/alumni5.jpg',
    alt: 'Alumni 5',
    batch: '2022'
  }
];

export default function Alumni() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState('opacity-100');

  // Image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFadeState('opacity-0');
      
      // Change image after fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === alumniImages.length - 1 ? 0 : prevIndex + 1
        );
        // Start fade in
        setFadeState('opacity-100');
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Format for "2025-03-10 17:05:08"
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      
      setCurrentDate(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    };
    
    updateDate();
    const timer = setInterval(updateDate, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main content */}
      <div className="pt-28 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-8 items-center">
        {/* Left section - Alumni Photos */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg border border-gray-200">
            {/* Main rotating image */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${fadeState}`}>
              {/* Image container */}
              <div className="relative w-full h-full">
                <Image
                  src={alumniImages[currentImageIndex].src}
                  alt={alumniImages[currentImageIndex].alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <p className="text-blue-200">Batch of {alumniImages[currentImageIndex].batch}</p>
                </div>
              </div>
            </div>
            
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {alumniImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  aria-label={`View alumni ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Decorative elements - subtle in white theme */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10"></div>
        </div>
        
        {/* Right section - Heading and content */}
        <div className="w-full md:w-1/2 text-black">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">
              Connect with the
            </span>
            <br />
            <span className="relative inline-block text-black">
              Alumni Network of Minbend
              <div className="absolute -bottom-3 left-0 h-1 w-3/4 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Explore a network of successful graduates who have made their mark in various fields. 
            Our alumni community offers opportunities for mentorship, networking, and professional growth.
          </p>
          
          {/* Call to action buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105">
              Join as Alumni
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <div className="text-3xl font-bold text-blue-600">5000+</div>
              <div className="text-sm text-gray-600">Alumni</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <div className="text-3xl font-bold text-blue-600">25+</div>
              <div className="text-sm text-gray-600">Years</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}