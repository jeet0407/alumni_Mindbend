"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
        <Image 
          src="/images/logo.png" 
          alt="Logo" 
          width={50} 
          height={50} 
          className="rounded-full object-cover"
        />
      </Link>
      
      <div className="hidden md:flex space-x-12 mr-8">
        <Link href="/" className="px-3 py-1 transition-all duration-200 relative overflow-hidden group">
          <span className="relative z-10">Home</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200 ease-in-out"></span>
        </Link>
        <Link href="/alumni" className="px-3 py-1 transition-all duration-200 relative overflow-hidden group">
          <span className="relative z-10">Alumni</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200 ease-in-out"></span>
        </Link>
        <Link href="/register" className="px-3 py-1 transition-all duration-200 relative overflow-hidden group">
          <span className="relative z-10">Alumni Register</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200 ease-in-out"></span>
        </Link>
        <Link href="/faculty" className="px-3 py-1 transition-all duration-200 relative overflow-hidden group">
          <span className="relative z-10">Faculty</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200 ease-in-out"></span>
        </Link>
      </div>
      
      <div className="md:hidden">
        <button className="p-2 hover:bg-gray-800 rounded-md transition-colors duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;