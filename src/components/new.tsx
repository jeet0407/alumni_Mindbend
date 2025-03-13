"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Sample gallery images with full Cloudinary URLs
const column1Images = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Campus Life",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Student Activities",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Research Lab",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Library",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Student Center",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Campus View",
  },
];

const column2Images = [
  {
    id: 7,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Graduation Day",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Sports Event",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Workshop",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Conference",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Cultural Fest",
  },
];

const column3Images = [
  {
    id: 12,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Innovation Lab",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Guest Lecture",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Research Presentation",
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Award Ceremony",
  },
  {
    id: 16,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Group Discussion",
  },
  {
    id: 17,
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741547976/cnhvi6tryyolycn3ro6y.jpg",
    alt: "Student Project",
  },
];


const mobileColumn1 = [...column1Images, ...column3Images.slice(0, 3)];
const mobileColumn2 = [...column2Images, ...column3Images.slice(3)];

// Duplicate images to ensure continuous loop
const duplicatedColumn1 = [...column1Images, ...column1Images];
const duplicatedColumn2 = [...column2Images, ...column2Images];
const duplicatedColumn3 = [...column3Images, ...column3Images];
const duplicatedMobileColumn1 = [...mobileColumn1, ...mobileColumn1];
const duplicatedMobileColumn2 = [...mobileColumn2, ...mobileColumn2];

function ImageGrid() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  const mobileColumn1Ref = useRef<HTMLDivElement>(null);
  const mobileColumn2Ref = useRef<HTMLDivElement>(null);

  // Animation positions for each column
  const [column1Pos, setColumn1Pos] = useState(0);
  const [column2Pos, setColumn2Pos] = useState(0);
  const [column3Pos, setColumn3Pos] = useState(0);

  const [mobileColumn1Pos, setMobileColumn1Pos] = useState(0);
  const [mobileColumn2Pos, setMobileColumn2Pos] = useState(0);

  // Animation speed for each column (pixels per frame)
  const column1Speed = 0.5; // Slow
  const column2Speed = -0.8; // Medium (negative for opposite direction)
  const column3Speed = 0.65; // Fast

  const mobileColumn1Speed = 1.5;
  const mobileColumn2Speed = 1.8;

  // Height values for resetting the animation loop
  const [column1Height, setColumn1Height] = useState(0);
  const [column2Height, setColumn2Height] = useState(0);
  const [column3Height, setColumn3Height] = useState(0);

  const [mobileColumn1Height, setMobileColumn1Height] = useState(0);
  const [mobileColumn2Height, setMobileColumn2Height] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkWindowWidth();

    // Add resize listener
    window.addEventListener("resize", checkWindowWidth);

    return () => window.removeEventListener("resize", checkWindowWidth);
  }, []);

  // Initialize column heights after rendering
  useEffect(() => {
    if (column1Ref.current) {
      const height =
        column1Ref.current.querySelector(".image-container")?.clientHeight;
      if (height) setColumn1Height(height / 2);
    }

    if (column2Ref.current) {
      const height =
        column2Ref.current.querySelector(".image-container")?.clientHeight;
      if (height) setColumn2Height(height / 2);
    }

    if (column3Ref.current) {
      const height =
        column3Ref.current.querySelector(".image-container")?.clientHeight;
      if (height) setColumn3Height(height / 2);
    }

    // Mobile columns
    if (mobileColumn1Ref.current) {
      const height =
        mobileColumn1Ref.current.querySelector(
          ".image-container"
        )?.clientHeight;
      if (height) setMobileColumn1Height(height / 2);
    }

    if (mobileColumn2Ref.current) {
      const height =
        mobileColumn2Ref.current.querySelector(
          ".image-container"
        )?.clientHeight;
      if (height) setMobileColumn2Height(height / 2);
    }
  },
  
   [isMobile]);

  // Animation loop - no longer has pause functionality
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // Desktop column animations
      setColumn1Pos(prevPos => {
        let newPos = prevPos + column1Speed;
        if (column1Height > 0 && newPos > column1Height) newPos = 0;
        return newPos;
      });
      
      setColumn2Pos(prevPos => {
        let newPos = prevPos + column2Speed;
        if (column2Height > 0) {
          if (newPos < -column2Height) newPos = 0;
          if (newPos > column2Height) newPos = -column2Height;
        }
        return newPos;
      });
      
      setColumn3Pos(prevPos => {
        let newPos = prevPos + column3Speed;
        if (column3Height > 0 && newPos > column3Height) newPos = 0;
        return newPos;
      });
      
      // Mobile column animations
      setMobileColumn1Pos(prevPos => {
        let newPos = prevPos + mobileColumn1Speed;
        if (mobileColumn1Height > 0 && newPos > mobileColumn1Height) newPos = 0;
        return newPos;
      });
      
      setMobileColumn2Pos(prevPos => {
        let newPos = prevPos + mobileColumn2Speed;
        if (mobileColumn2Height > 0) {
          if (newPos < -mobileColumn2Height) newPos = 0;
          if (newPos > mobileColumn2Height) newPos = -mobileColumn2Height;
        }
        return newPos;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Clean up
    return () => cancelAnimationFrame(animationId);
  }, [column1Height, column2Height, column3Height, mobileColumn1Height, mobileColumn2Height]);


  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-900/10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-blue-900/10 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-700/5"></div>

      <div className="absolute left-10 top-40 h-40 w-1 bg-gradient-to-b from-blue-900 to-blue-500 opacity-30"></div>
      <div className="absolute right-10 bottom-40 h-40 w-1 bg-gradient-to-b from-blue-500 to-blue-900 opacity-30"></div>

      <div className="container mx-auto px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-950 to-blue-500">
              Mindbend Moments
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="gap-2 h-[480px] md:h-[600px] overflow-hidden hidden lg:flex">
          {/* Column 1 - Slow upward scroll */}
          <div className="w-1/3 overflow-hidden" ref={column1Ref}>
            <div
              className="image-container transition-transform duration-100 ease-linear"
              style={{ transform: `translateY(-${column1Pos}px)` }}
            >
              {duplicatedColumn1.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-blue-400/0 hover:border-blue-400/40 transition-colors duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Medium downward scroll */}
          <div className="w-1/3 overflow-hidden" ref={column2Ref}>
            <div
              className="image-container transition-transform duration-100 ease-linear"
              style={{ transform: `translateY(${column2Pos}px)` }}
            >
              {duplicatedColumn2.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-blue-400/0 hover:border-blue-400/40 transition-colors duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - Fast upward scroll */}
          <div className="w-1/3 overflow-hidden" ref={column3Ref}>
            <div
              className="image-container transition-transform duration-100 ease-linear"
              style={{ transform: `translateY(-${column3Pos}px)` }}
            >
              {duplicatedColumn3.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-blue-400/0 hover:border-blue-400/40 transition-colors duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gap-2 h-[480px] md:h-[600px] overflow-hidden hidden md:flex lg:hidden">
          {/* Column 1 - Slow upward scroll */}
          <div className="w-1/2 overflow-hidden" ref={mobileColumn1Ref}>
            <div
              className="image-container transition-transform duration-100 ease-linear"
              style={{ transform: `translateY(-${mobileColumn1Pos}px)` }}
            >
              {duplicatedMobileColumn1.map((image, index) => (
                <div
                  key={`mobile1-${image.id}-${index}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-2"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="50vw"
                      loading={index < 4 ? "eager" : "lazy"}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white">
                        <p className="font-medium text-xs">{image.alt}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border border-blue-400/0 hover:border-blue-400/40 transition-colors duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="w-1/2 overflow-hidden" ref={mobileColumn2Ref}>
            <div
              className="image-container transition-transform duration-100 ease-linear"
              style={{ transform: `translateY(-${mobileColumn2Pos}px)` }}
            >
              {duplicatedMobileColumn2.map((image, index) => (
                <div
                  key={`mobile1-${image.id}-${index}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-2"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="50vw"
                      loading={index < 4 ? "eager" : "lazy"}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white">
                        <p className="font-medium text-xs">{image.alt}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border border-blue-400/0 hover:border-blue-400/40 transition-colors duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        <div className="flex gap-2 h-[480px] md:h-[600px] overflow-hidden md:hidden">
          {/* Column 1 - Slow upward scroll */}
          <div className="w-1/1 overflow-hidden" ref={mobileColumn1Ref}>
            <div
              className="image-container transition-transform duration-100 ease-linear"
              style={{ transform: `translateY(-${mobileColumn1Pos}px)` }}
            >
              {duplicatedMobileColumn1.map((image, index) => (
                <div
                  key={`mobile-${image.id}-${index}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-2 sm:mb-3"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      loading={index < 4 ? "eager" : "lazy"}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                        <p className="font-medium text-xs sm:text-sm">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 border border-blue-400/0 hover:border-blue-400/40 transition-colors duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* View More Link */}
        <div className="text-center mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center text-blue-800 font-medium hover:text-blue-600 transition-colors group"
          >
            View Complete Gallery
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ImageGrid;
