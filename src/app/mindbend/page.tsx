"use client";

import FacultyAdvisor from "@/components/FacultyAdvisor";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

function Mindbend() {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 px-8 sm:px-16 md:px-24 lg:px-32">
        {/* Heading with animated underline */}
        <div className="relative text-center mb-16">
          <div className="relative text-center mb-16 group">
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter px-4 py-2">
                <span className="text-blue-800 mr-1 relative inline-block">
                  MINDBEND
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-800 rounded-full"></div>
                </span>

                <span className="text-blue-600 font-black mx-1 relative">
                  :
                </span>

                <span className="text-black ml-1 relative inline-block">
                  CORE COMMITTEE
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-black rounded-full"></div>
                </span>
              </h1>

              {/* Animated underline accent */}
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-black">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-white/30 blur-sm animate-pulse"></div>
              </div>

              {/* Additional decorative element */}
              <div className="absolute -top-5 -left-5 w-10 h-10 border-t-4 border-l-4 border-blue-800/30 rounded-tl-xl"></div>
              <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-4 border-r-4 border-blue-800/30 rounded-br-xl"></div>
            </div>
          </div>

          {/* Abstract decorative elements */}
          <div className="hidden md:block absolute -top-16 -left-16 w-32 h-32">
            <div className="absolute w-16 h-16 rounded-full border-4 border-blue-900/20 animate-float"></div>
            <div className="absolute top-10 left-10 w-10 h-10 rounded-full border-2 border-blue-600/20 animate-float-delayed"></div>
          </div>

          <div className="hidden md:block absolute -top-12 -right-12 w-28 h-28">
            <div className="absolute w-12 h-12 rounded-full border-4 border-black/10 animate-float-delayed"></div>
            <div className="absolute top-8 left-8 w-8 h-8 rounded-full border-2 border-blue-600/20 animate-float"></div>
          </div>
        </div>

        {/* Content placeholder - you can add your committee details here */}
        <div className="max-w-6xl mx-auto">
            <FacultyAdvisor/>
        </div>
      </div>
    </div>
  );
}

export default Mindbend;
