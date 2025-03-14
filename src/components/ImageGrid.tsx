"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Greatly reduced number of images
const column1Images = [
  { id: 1, src: "/images/poster.jpg", alt: "Campus Life" },
  { id: 2, src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741893920/isjnsxr5faewzxvoxjwp.jpg", alt: "Campus Life" },
  { id: 3, src: "/images/aman.png", alt: "Campus Life" },
  { id: 4, src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741893925/ityxdubahmngfbakoyqg.jpg", alt: "Campus Life" },
  { id: 5, src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741893923/llflr0k6pdovxafqfhz0.jpg", alt: "Campus Life" },
];

const column2Images = [
  { id: 6, src: "/images/cookin.png", alt: "Graduation Day" },
  { id: 7, src: "/images/img5.jpg", alt: "Graduation Day" },
  { id: 8, src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741890347/ckghkxvwxopguuopxbcs.png", alt: "Graduation Day" },
  { id: 9, src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741890336/n2dsaxd8adbfwjynrdno.png", alt: "Graduation Day" },
];

const column3Images = [
  { id: 10, src: "/images/img8.jpg", alt: "Innovation Lab" },
  { id: 11, src: "/images/kart.png", alt: "Innovation Lab" },
  { id: 12, src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741893925/y4cw0rgbx02dstvq8kip.jpg", alt: "Innovation Lab" },
  { id: 13, src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741893922/zzgetv444ezhc539fx6i.jpg", alt: "Guest Lecture" },
];

function ImageGrid() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  // Use CSS animations instead of JavaScript animations
  useEffect(() => {
    // No JavaScript animation logic needed - using pure CSS
    return () => {
      // Clean up function
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Simplified background */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-900/5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-blue-900/10 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-700/5"></div>
      
      <div className="absolute left-10 top-40 h-40 w-1 bg-gradient-to-b from-blue-900 to-blue-500 opacity-30"></div>
      <div className="absolute right-10 bottom-40 h-40 w-1 bg-gradient-to-b from-blue-500 to-blue-900 opacity-30"></div>
     
      <div className="container mx-auto px-4 md:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-950 to-blue-500">
              Mindbend Moments
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Three-column image grid with CSS animations */}
        <div className="gap-2 h-[480px] md:h-[600px] overflow-hidden hidden lg:flex">
          {/* Column 1 - CSS animation upward */}
          <div className="w-1/3 overflow-hidden" ref={column1Ref}>
            <div className="animate-scrollUp">
              {column1Images.map((image) => (
                <div 
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      priority={false}
                      unoptimized={true} // Skip Next.js image optimization for faster load
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate for continuous loop */}
              {column1Images.map((image) => (
                <div 
                  key={`dup-${image.id}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 - CSS animation downward */}
          <div className="w-1/3 overflow-hidden" ref={column2Ref}>
            <div className="animate-scrollDown">
              {column2Images.map((image) => (
                <div 
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[4/5]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate for continuous loop */}
              {column2Images.map((image) => (
                <div 
                  key={`dup-${image.id}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[4/5]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 3 - CSS animation upward (faster) */}
          <div className="w-1/3 overflow-hidden" ref={column3Ref}>
            <div className="animate-scrollUpFast">
              {column3Images.map((image) => (
                <div 
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate for continuous loop */}
              {column3Images.map((image) => (
                <div 
                  key={`dup-${image.id}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gap-2 h-[480px] md:h-[600px] overflow-hidden hidden md:flex lg:hidden">
          {/* Column 1 - CSS animation upward */}
          <div className="w-1/2 overflow-hidden" ref={column1Ref}>
            <div className="animate-scrollUp">
              {column1Images.map((image) => (
                <div 
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      priority={false}
                      unoptimized={true} // Skip Next.js image optimization for faster load
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate for continuous loop */}
              {column1Images.map((image) => (
                <div 
                  key={`dup-${image.id}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 - CSS animation downward */}
          <div className="w-1/2 overflow-hidden" ref={column2Ref}>
            <div className="animate-scrollDown">
              {column2Images.map((image) => (
                <div 
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[4/5]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate for continuous loop */}
              {column2Images.map((image) => (
                <div 
                  key={`dup-${image.id}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[4/5]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      
        </div>

        <div className="flex gap-2 h-[480px] md:h-[600px] overflow-hidden md:hidden">
          {/* Column 1 - CSS animation upward */}
          <div className="w-1/1 overflow-hidden" ref={column1Ref}>
            <div className="animate-scrollUp">
              {column1Images.map((image) => (
                <div 
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      priority={false}
                      unoptimized={true} // Skip Next.js image optimization for faster load
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0  transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate for continuous loop */}
              {column1Images.map((image) => (
                <div 
                  key={`dup-${image.id}`}
                  className="relative rounded-lg overflow-hidden shadow-md mb-4"
                >
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
        {/* View More Link */}
        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center text-blue-800 font-medium hover:text-blue-600 transition-colors group"
          >
            View Complete Gallery
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ImageGrid;