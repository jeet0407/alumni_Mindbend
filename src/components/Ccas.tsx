"use client"

import Image from 'next/image'
import React from 'react'

function Ccas() {
  // CCAS data - corrected with proper details for Yug Rana
  const ccas = [
    {
      name: "YUG RANA",
      position: "CCAS",
      id: "U21CH056",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741645173/iq9uokwvf5jqn713m0yl.webp", 
    }
  ];

  return (
    <div className=" bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right blue circle */}
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl"></div>
        
        {/* Bottom left blue circle */}
        <div className="absolute bottom-[-20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-40 left-10 w-16 h-16 border-8 border-blue-200/40 rounded-full"></div>
        <div className="absolute top-60 right-20 w-24 h-24 border-2 border-blue-800/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-32 h-8 bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-md"></div>
        
        {/* Dots pattern */}
        <div className="absolute right-10 top-1/4 grid grid-cols-5 gap-4">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-800/10"></div>
          ))}
        </div>
        
        {/* Diagonal line */}
        <div className="absolute top-0 right-1/3 w-0.5 h-56 bg-gradient-to-b from-transparent via-blue-300/20 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-10 left-1/4 w-0.5 h-40 bg-gradient-to-b from-transparent via-blue-800/10 to-transparent transform -rotate-45"></div>
      </div>
 
      {/* CCAS Section */}
      <div className="mb-16 relative z-10">
        {/* CCAS Heading */}
        <div className="text-center mb-12 relative">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-black px-10">
              <span className="relative">
                CCAS
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-blue-600 to-black"></div>
              </span>
            </h2>
        
          
            {/* Decorative accents near heading */}
            <svg className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L20 10L10 20L0 10L10 0Z" />
            </svg>
            <svg className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L20 10L10 20L0 10L10 0Z" />
            </svg>
          </div>
          
          {/* Decorative lines */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>
        </div>
        
        {/* CCAS Card Container with enhanced styling */}
        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Subtle background shape */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-blue-50/50 blur-3xl -z-10"></div>
          
          {/* Single Card - Centered and Enhanced */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:translate-y-[-5px] group">
              {/* Student Image - Larger and more prominent */}
              <div className="relative h-72 w-full bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    <Image
                      src={ccas[0].image}
                      alt={ccas[0].name}
                      fill
                      className="rounded-full object-cover border-4 border-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                      onError={(e) => {
                        // Fallback for missing images
                        e.currentTarget.src = `https://placehold.co/400?text=${encodeURIComponent(ccas[0].name.charAt(0))}&font=montserrat`;
                      }}
                    />
                    <div className="absolute inset-0 rounded-full border-8 border-blue-400/10"></div>
                  </div>
                </div>
                
                {/* Enhanced decorative elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-800/40 rounded-tl-2xl group-hover:scale-110 transition-all duration-300"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-blue-800/40 rounded-br-2xl group-hover:scale-110 transition-all duration-300"></div>
                
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animated highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out"></div>
              </div>
              
              {/* Student Info - Enhanced with more details */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{ccas[0].name}</h3>
                <div className="text-md font-semibold text-black mb-1">{ccas[0].position}</div>
                <div className="text-sm font-medium text-blue-600 mb-3">{ccas[0].id}</div>
                
                {/* Bottom accent with animation */}
                <div className="mt-5 relative h-1">
                  <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-800 to-blue-600 rounded-full group-hover:w-32 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-400/50 blur-sm group-hover:w-16 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-800 via-transparent to-blue-600"></div>
    </div>
  )
}

export default Ccas