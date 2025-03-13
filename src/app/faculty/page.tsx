"use client"

import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer';

function FacultyAdvisor() {
  // Faculty advisors data with chairperson separated
  const chairperson = {
    name: "DR. A.K. MUNGRAY",
    position: "CHAIRPERSON",
    image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741644917/ktj68n4e8h6agfvvoyqg.jpg"
  };

  // Co-Chairpersons data
  const coChairpersons = [
    {
      name: "DR. SARITA KALLA",
      position: "CO-CHAIRPERSON",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741645172/lxiwhjyn7qn7btnl7bud.jpg",
    },
    {
      name: "DR. KISHOR P UPLA",
      position: "CO-CHAIRPERSON",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741645174/rdnkksloud492o8z1tvq.jpg",
    },
    {
      name: "DR. SURESH DAHIYA",
      position: "CO-CHAIRPERSON",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741645505/jybihikophnqz1reny38.webp",
    },
    {
      name: "DR. VIVEK D. KALYANKAR",
      position: "CO-CHAIRPERSON",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741645513/tmnypxzweb9o5tk8yuap.jpg",
    }
  ];

  // Component for section headings with consistent styling
  const SectionHeading = ({ title }: { title: string }) => (
    <div className="text-center mb-12 relative">
      <div className="relative inline-block">
        <h2 className="text-3xl md:text-4xl font-bold text-black px-10">
          <span className="relative">
            {title}
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
  );

  // Reusable faculty card component
  const FacultyCard = ({ faculty }: { faculty: typeof chairperson }) => (
    <div className="w-full sm:w-72 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
      {/* Faculty Image */}
      <div className="relative h-72 w-full bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={faculty.image}
            alt={faculty.name}
            width={240}
            height={240}
            className="rounded-full object-cover border-4 border-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
            onError={(e) => {
              // Fallback for missing images
              e.currentTarget.src = "https://placehold.co/400?text=" + encodeURIComponent(faculty.name.charAt(0)) + "&font=montserrat";
            }}
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-blue-800/30 rounded-tl-xl group-hover:scale-110 transition-transform duration-300"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-blue-800/30 rounded-br-xl group-hover:scale-110 transition-transform duration-300"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Faculty Info */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-blue-800 mb-1">{faculty.name}</h3>
        <div className="text-sm font-semibold text-black mb-2">{faculty.position}</div>
        
        {/* Bottom accent */}
        <div className="mt-4 w-16 h-1 mx-auto bg-gradient-to-r from-blue-800 to-blue-600 rounded-full group-hover:w-24 transition-all duration-300"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />

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

      {/* Main Page Content */}
      <div className="pt-28 pb-16 relative z-10">
        {/* Faculty Advisors Main Heading */}
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-blue-800 to-blue-600">
              Faculty Advisors
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-blue-950 rounded-full"></div>
            <div className="h-1 w-20 bg-blue-700 rounded-full"></div>
            <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Chairperson Section */}
        <div className="mb-20 max-w-6xl mx-auto px-4 relative">
          <SectionHeading title="Chairperson" />
          
          {/* Centered Chairperson Card */}
          <div className="flex justify-center">
            <FacultyCard faculty={chairperson} />
          </div>
        </div>
        
        {/* Co-Chairpersons Section */}
        <div className="mb-16 max-w-6xl mx-auto px-4 relative">
          <SectionHeading title="Co-Chairpersons" />
          
          {/* Co-Chairpersons Cards in Grid */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {coChairpersons.map((faculty, index) => (
              <FacultyCard key={index} faculty={faculty} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-800 via-transparent to-blue-600"></div>

      <Footer/>
    </div>
  )
}

export default FacultyAdvisor