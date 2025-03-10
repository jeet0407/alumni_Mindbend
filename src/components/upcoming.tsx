"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Google Drive image URLs
// These are formatted using the Google Drive file IDs
// Format: https://drive.google.com/uc?export=view&id=FILE_ID

// You need to extract these file IDs from your Google Drive links
// For example, from a link like:
// https://drive.google.com/file/d/1abc123def456/view
// The file ID would be: 1abc123def456

const events = [
  {
    id: 1,
    title: "Botkicks",
    date: "April 15, 2025",
    image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547978/r48zcntmz9xzy196guom.jpg",
  },
  {
    id: 2,
    title: "Annual Hackathon",
    date: "May 8, 2025",
    image: "https://lh3.googleusercontent.com/d/1ouL7lfWeQVf6KFd20c6jWeZF6n5IxEau=w1000",
  },
  {
    id: 3,
    title: "IPL Auction",
    date: "June 22, 2025",
    image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
  },
  {
    id: 4,
    title: "National Conference",
    date: "July 10, 2025",
    image: "https://lh3.googleusercontent.com/d/1bueWHRhnWhbqlBeuoVl1TlhfLgZGwsYv=w1000",

  }
];

function Upcoming() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [driveImages, setDriveImages] = useState<{id: number, title: string, date: string, image: string}[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch images from Google Drive
  useEffect(() => {
    // This would typically be an API call, but for direct Google Drive links, 
    // we'll just use the events array defined above
    // In a real implementation, you might fetch this data from your backend
    setDriveImages(events);
    setImagesLoaded(true);
  }, []);

  // Auto-change image
  useEffect(() => {
    if (isAutoPlay && imagesLoaded && driveImages.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % driveImages.length);
      }, 5000); // Change image every 5 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, imagesLoaded, driveImages.length]);

  // Pause autoplay when user interacts with controls
  const handleNavigation = (direction: 'prev' | 'next') => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsAutoPlay(false);
    }

    // Navigate to previous or next image
    if (direction === 'prev') {
      setCurrentIndex(prevIndex => (prevIndex === 0 ? driveImages.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex(prevIndex => (prevIndex + 1) % driveImages.length);
    }
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlay(true);
    }, 10000);
  };

  return (
    <div className="py-20 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-blue-900/10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-blue-900/10 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-700/5"></div>
      
      <div className="absolute left-0 top-1/4 h-40 w-1 bg-gradient-to-b from-blue-900 to-blue-500 opacity-30"></div>
      <div className="absolute right-0 bottom-1/4 h-40 w-1 bg-gradient-to-b from-blue-500 to-blue-900 opacity-30"></div>
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          
          {/* Left Section with Image Carousel */}
          <div className="w-full lg:w-2/3 md:px-6 relative">
            {!imagesLoaded ? (
              <div className="flex justify-center items-center aspect-video rounded-2xl bg-blue-50 border-4 border-blue-100">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : driveImages.length > 0 ? (
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl" 
                style={{ aspectRatio: "16/9" }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Image wrapper with blue border gradient */}
                <div className="absolute inset-0 rounded-lg p-[3px] bg-gradient-to-r from-blue-800 to-blue-400"></div>
                
                {/* Image container */}
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  {/* Event Information Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-6 text-white z-10">
                    <h3 className="text-2xl font-bold">{driveImages[currentIndex].title}</h3>
                    <p className="text-blue-200">{driveImages[currentIndex].date}</p>
                  </div>
                  
                  {/* Current Image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={driveImages[currentIndex].image}
                      alt={driveImages[currentIndex].title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-opacity duration-500"
                      unoptimized={true} // Important for external URLs like Google Drive
                    />
                  </div>
                </div>
                
                {/* Navigation Controls - Only visible on hover */}
                <div className={`absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'} z-10`}>
                  <button 
                    onClick={() => handleNavigation('prev')}
                    className="bg-blue-900/50 hover:bg-blue-800/80 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 transform hover:scale-110"
                    aria-label="Previous event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleNavigation('next')}
                    className="bg-blue-900/50 hover:bg-blue-800/80 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 transform hover:scale-110"
                    aria-label="Next event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Dot indicators - Always visible */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-10">
                  {driveImages.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoPlay(false);
                        setTimeout(() => setIsAutoPlay(true), 10000);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to event ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center aspect-video rounded-2xl bg-blue-50 border-4 border-blue-100">
                <p className="text-blue-800">No images available</p>
              </div>
            )}
          </div>

          {/* right Section with Heading */}
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="text-5xl font-bold relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
                Upcoming
              </span>
              <br />
              <span className="text-black">Events</span>
              <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-blue-500 mt-4 rounded-full"></div>
            </h2>
            
            <p className="text-gray-600 text-lg mt-6">
              Join us for exciting events coming soon. Expand your network, learn new skills,
              and stay updated with the latest in technology and innovation.
            </p>
            
            <div className="mt-8">
              <a href="#all-events" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
                View All Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Upcoming;