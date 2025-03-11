"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('');
  
  useEffect(() => {
    if (pathname === '/') setActiveItem('Home');
    else if (pathname === '/alumni') setActiveItem('Alumni');
    else if (pathname === '/register') setActiveItem('Register');
    else if (pathname === '/faculty') setActiveItem('Faculty');
    else if (pathname === '/about-us') setActiveItem('About');
  }, [pathname]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div 
        className="flex items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        onClick={() => {
          router.push("/");
          setActiveItem('Home');
        }}
      >
        <Image 
          src="/images/logo.png" 
          alt="Logo" 
          width={50} 
          height={50} 
          className="rounded-full object-cover"
        />
      </div>
      
      <div className="hidden md:flex space-x-12 mr-8">
        <button
          onClick={() => {
            router.push("/");
            setActiveItem('Home');
          }}
          className={`px-3 py-1 transition-all duration-300 relative overflow-hidden group ${
            activeItem === 'Home' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">Home</span>
          {activeItem === 'Home' ? (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
          ) : (
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
          )}
        </button>
        
        <button
          onClick={() => {
            router.push("/alumni");
            setActiveItem('Alumni');
          }}
          className={`px-3 py-1 transition-all duration-300 relative overflow-hidden group ${
            activeItem === 'Alumni' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">Alumni</span>
          {activeItem === 'Alumni' ? (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
          ) : (
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
          )}
        </button>

        <button
          onClick={() => {
            router.push("/register");
            setActiveItem('Register');
          }}
          className={`px-3 py-1 transition-all duration-300 relative overflow-hidden group ${
            activeItem === 'Register' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">Alumni Registration</span>
          {activeItem === 'Register' ? (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
          ) : (
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
          )}
        </button>
        
        <button
          onClick={() => {
            router.push("/faculty");
            setActiveItem('Faculty');
          }}
          className={`px-3 py-1 transition-all duration-300 relative overflow-hidden group ${
            activeItem === 'Faculty' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">Faculty</span>
          {activeItem === 'Faculty' ? (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
          ) : (
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
          )}
        </button>
        
        {/* <button
          onClick={() => {
            router.push("/about-us");
            setActiveItem('About');
          }}
          className={`px-3 py-1 transition-all duration-300 relative overflow-hidden group ${
            activeItem === 'About' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">About</span>
          {activeItem === 'About' ? (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
          ) : (
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
          )}
        </button> */}
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