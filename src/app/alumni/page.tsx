"use client";
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/footer';
import Link from 'next/link';

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
  const [selectedYear, setSelectedYear] = useState('2024');

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

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900 rounded-full opacity-10 transform translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-600 rounded-full opacity-5 transform -translate-x-40"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-black rounded-full opacity-5 transform translate-x-48"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full opacity-10"></div>
      <div className="absolute top-1/4 left-1/2 w-48 h-48 bg-white border-2 border-blue-200 rounded-full opacity-20 transform -translate-x-1/2"></div>
      
      <Navbar />
      
      {/* Main content */}
      <div className="pt-28 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-8 items-center relative z-10">
        {/* Left section - Alumni Photos */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl border border-gray-200">
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
                  <p className="text-blue-200 font-semibold">Batch of {alumniImages[currentImageIndex].batch}</p>
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
          
          {/* Enhanced decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-4 right-1/4 w-20 h-20 bg-blue-900 rounded-full opacity-20"></div>
          <div className="absolute top-1/3 -left-6 w-12 h-12 bg-black rounded-full opacity-10"></div>
        </div>
        
        {/* Right section - Heading and content */}
        <div className="w-full md:w-1/2 text-black relative">
          {/* Decorative elements for right section */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-full opacity-5"></div>
          <div className="absolute bottom-10 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-10"></div>
          
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
            <Link href="/register"  className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105">
              Join as Alumni
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">5000+</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Alumni</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">10+</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Year selector section */}
      <div className="mt-16 mb-16 px-6 md:px-12 lg:px-20">
        <div className="bg-blue-50 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">Select Year</h2>
          <div className="relative max-w-xs">
            <select 
              value={selectedYear}
              onChange={handleYearChange}
              className="block text-black appearance-none w-full bg-white border border-blue-300 hover:border-blue-500 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              {Array.from({ length: 11 }, (_, i) => 2014 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-700">Alumni from {selectedYear}</h3>
            <p className="mt-2 text-gray-700">
              Displaying alumni information for the year {selectedYear}.
            </p>
          </div>
        </div>
      </div>


      <Footer/>

    </div>
  );
}