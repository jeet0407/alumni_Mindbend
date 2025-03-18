"use client";
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/footer';
import Link from 'next/link';

// Define types for alumni data
type AlumniPerson = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string;
  position?: string;
  company?: string;
  role?: string;
  image?: string;
  graduationYear: number;
  currentJobTitle?: string | null;
  currentCompany?: string | null;
  profilePhotoUrl?: string | null;
};

type GroupedAlumni = Record<string, AlumniPerson[]>;

// Sample carousel images
const alumniImages = [
  {
    src: 'https://res.cloudinary.com/dsh447lvk/image/upload/v1741891257/t6nfi7zbts8rrsxd52rl.png',
    alt: 'Alumni 1',
    batch: '2023'
  },
  {
    src: 'https://res.cloudinary.com/dsh447lvk/image/upload/v1741891257/t6nfi7zbts8rrsxd52rl.png',
    alt: 'Alumni 2',
    batch: '2019'
  },
  
];

export default function Alumni() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState('opacity-100');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [alumniData, setAlumniData] = useState<GroupedAlumni>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch alumni data from API
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/alumnipage');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch alumni data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Safely process alumni data
        if (data.alumni && typeof data.alumni === 'object') {
          // Transform API data to match our component's expected format
          const transformedData: GroupedAlumni = {};
          
          Object.keys(data.alumni).forEach(year => {
            transformedData[year] = data.alumni[year].map((alumni: AlumniPerson) => ({
              id: alumni.id,
              // Combine firstName and lastName into name
              name: [alumni.firstName, alumni.lastName].filter(Boolean).join(' '),
              position: alumni.currentJobTitle || '',
              company: alumni.currentCompany || '',
              image: alumni.profilePhotoUrl || '',
              graduationYear: alumni.graduationYear,
              // Keep original fields as well
              firstName: alumni.firstName,
              lastName: alumni.lastName,
              currentJobTitle: alumni.currentJobTitle,
              currentCompany: alumni.currentCompany,
              profilePhotoUrl: alumni.profilePhotoUrl
            }));
          });
          
          setAlumniData(transformedData);
          
          // Set selected year to the most recent year with data if available
          const years = Object.keys(transformedData);
          if (years.length > 0) {
            const sortedYears = years.sort((a, b) => Number(b) - Number(a));
            setSelectedYear(sortedYears[0]);
          }
        } else {
          throw new Error('Invalid alumni data format received from server');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching alumni data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlumni();
  }, []);

  // Image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFadeState('opacity-0');
      
      // Change image after fade out
      const timer = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === alumniImages.length - 1 ? 0 : prevIndex + 1
        );
        // Start fade in
        setFadeState('opacity-100');
      }, 500);

      return () => clearTimeout(timer);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  // Get available years from data, or fallback to default range
  const availableYears = Object.keys(alumniData).length > 0 
    ? Object.keys(alumniData).sort((a, b) => Number(b) - Number(a))
    : Array.from({ length: 11 }, (_, i) => (2024 - i).toString());

  // Generate initials for placeholder images - With null safety
  const getInitials = (name: string | undefined | null): string => {
    if (!name) return "AL"; // Default initials for Alumni if name is missing
    
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
                  onError={(e) => {
                    // Fallback for missing carousel images
                    const target = e.target as HTMLImageElement;
                    target.src = `/api/placeholder/600/600?text=Batch ${alumniImages[currentImageIndex].batch}`;
                  }}
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
            <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105">
              Join as Alumni
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">
                {Object.values(alumniData).reduce((count, yearGroup) => count + yearGroup.length, 0) || '5000+'}
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">Alumni</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">
                {Object.keys(alumniData).length || '10+'}
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Year selector section */}
      <div className="mt-16 mb-8 px-6 md:px-12 lg:px-20">
        <div className="bg-blue-50 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">Select Year</h2>
          <div className="relative max-w-xs">
            <select 
              value={selectedYear}
              onChange={handleYearChange}
              className="block text-black appearance-none w-full bg-white border border-blue-300 hover:border-blue-500 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              {availableYears.map((year) => (
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
        </div>
      </div>

      {/* Alumni Cards Section (Year-wise) */}
      <div className="mb-16 px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-12 relative">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-black px-10">
              <span className="relative">
                Class of {selectedYear}
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
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-800 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="text-center py-16 px-4">
            <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h3>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* No data state */}
        {!isLoading && !error && (!alumniData[selectedYear] || alumniData[selectedYear]?.length === 0) && (
          <div className="text-center py-16 bg-blue-50 rounded-xl">
            <svg className="w-16 h-16 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-bold text-blue-800 mb-2">No Alumni Data Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">There are no alumni records for the year {selectedYear}. Please select a different year or check back later.</p>
          </div>
        )}
        
        {/* Alumni grid */}
        {!isLoading && !error && alumniData[selectedYear] && alumniData[selectedYear]?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {alumniData[selectedYear].map((person) => (
              <div key={person.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:translate-y-[-5px]">
                {/* Profile image */}
                <div className="relative h-48 bg-gradient-to-r from-blue-100 to-blue-50">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name || 'Alumni'}
                      fill
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        // Fallback for missing profile images
                        const target = e.target as HTMLImageElement;
                        target.src = `/api/placeholder/400/300?text=${getInitials(person.name)}`;
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
                      <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                        {getInitials(person.name)}
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 to-blue-500"></div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{person.name || 'Unnamed Alumni'}</h3>
                  
                  {person.position && (
                    <p className="text-gray-600 text-sm mb-2">{person.position}</p>
                  )}
                  
                  {person.company && (
                    <p className="text-blue-700 font-medium text-sm mb-3">{person.company}</p>
                  )}
                  
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Class of {person.graduationYear}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}