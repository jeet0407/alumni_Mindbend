"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";

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
  mindbendPosition?: string;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  websiteUrl?: string | null;
};

type GroupedAlumni = Record<string, AlumniPerson[]>;

// Sample carousel images
const alumniImages = [
  {
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741891257/t6nfi7zbts8rrsxd52rl.png",
    alt: "Alumni 1",
    batch: "2023",
  }
];

export default function Alumni() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState("opacity-100");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [alumniData, setAlumniData] = useState<GroupedAlumni>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch alumni data from API
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/alumnipage");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch alumni data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        // Safely process alumni data
        if (data.alumni && typeof data.alumni === "object") {
          // Transform API data to match our component's expected format
          const transformedData: GroupedAlumni = {};

          Object.keys(data.alumni).forEach((year) => {
            transformedData[year] = data.alumni[year].map(
              (alumni: AlumniPerson) => ({
                id: alumni.id,
                // Combine firstName and lastName into name
                name: [alumni.firstName, alumni.lastName]
                  .filter(Boolean)
                  .join(" "),
                position: alumni.currentJobTitle || "",
                company: alumni.currentCompany || "",
                image: alumni.profilePhotoUrl || "",
                graduationYear: alumni.graduationYear,
                // Keep original fields as well
                firstName: alumni.firstName,
                lastName: alumni.lastName,
                currentJobTitle: alumni.currentJobTitle,
                currentCompany: alumni.currentCompany,
                profilePhotoUrl: alumni.profilePhotoUrl,
                mindbendPosition: alumni.mindbendPosition,
                linkedinUrl: alumni.linkedinUrl,
                githubUrl: alumni.githubUrl,
                instagramUrl: alumni.instagramUrl,
                twitterUrl: alumni.twitterUrl,
                websiteUrl: alumni.websiteUrl,
              })
            );
          });

          setAlumniData(transformedData);

          // Set selected year to the most recent year with data if available
          const years = Object.keys(transformedData);
          if (years.length > 0) {
            const sortedYears = years.sort((a, b) => Number(b) - Number(a));
            setSelectedYear(sortedYears[0]);
          }
        } else {
          throw new Error("Invalid alumni data format received from server");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching alumni data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  // Image rotation logic
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Start fade out
  //     setFadeState("opacity-0");

  //     // Change image after fade out
  //     const timer = setTimeout(() => {
  //       setCurrentImageIndex((prevIndex) =>
  //         prevIndex === alumniImages.length - 1 ? 0 : prevIndex + 1
  //       );
  //       // Start fade in
  //       setFadeState("opacity-100");
  //     }, 500);

  //     return () => clearTimeout(timer);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  // Get available years from data, or fallback to default range
  const availableYears =
    Object.keys(alumniData).length > 0
      ? Object.keys(alumniData).sort((a, b) => Number(b) - Number(a))
      : Array.from({ length: 11 }, (_, i) => (2024 - i).toString());

  // Generate initials for placeholder images - With null safety
  const getInitials = (name: string | undefined | null): string => {
    if (!name) return "AL"; // Default initials for Alumni if name is missing

    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
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
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${fadeState}`}
            >
              {/* Image container */}
              <div className="relative w-full h-full">
                <Image
                  src={alumniImages[currentImageIndex].src}
                  alt={alumniImages[currentImageIndex].alt}
                  fill
                  style={{ objectFit: "cover" }}
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
                  <p className="text-blue-200 font-semibold">
                    Batch of {alumniImages[currentImageIndex].batch}
                  </p>
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
                    index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
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
            Explore a network of successful graduates who have made their mark
            in various fields. Our alumni community offers opportunities for
            mentorship, networking, and professional growth.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105"
            >
              Join as Alumni
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">
                {Object.values(alumniData).reduce(
                  (count, yearGroup) => count + yearGroup.length,
                  0
                ) || "5000+"}
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">
                Alumni
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">
                {Object.keys(alumniData).length || "10+"}
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">
                Years
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year selector section */}
      <div className="mt-16 mb-8 px-6 md:px-12 lg:px-20">
        <div className="bg-blue-50 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
            Select Year
          </h2>
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
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
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
            <svg
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-800"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0L20 10L10 20L0 10L10 0Z" />
            </svg>
            <svg
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
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
            <svg
              className="w-16 h-16 mx-auto text-red-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Error Loading Data
            </h3>
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
        {!isLoading &&
          !error &&
          (!alumniData[selectedYear] ||
            alumniData[selectedYear]?.length === 0) && (
            <div className="text-center py-16 bg-blue-50 rounded-xl">
              <svg
                className="w-16 h-16 mx-auto text-blue-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                No Alumni Data Available
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                There are no alumni records for the year {selectedYear}. Please
                select a different year or check back later.
              </p>
            </div>
          )}

        {/* Alumni grid */}

        {!isLoading &&
          !error &&
          alumniData[selectedYear] &&
          alumniData[selectedYear]?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {alumniData[selectedYear].map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-700 hover:border-blue-300 h-115 perspective-1000 group w-80"
                >
                  {/* Card with flip effect */}
                  <div className="relative w-full h-full  transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* Front side of card */}
                    <div className="absolute w-full h-full backface-hidden">
                      {/* Profile image */}
                      <div className="relative h-102 bg-gradient-to-r from-blue-100 to-blue-50">
                        {person.image ? (
                          <Image
                            src={person.image}
                            alt={person.name || "Alumni"}
                            fill
                            style={{ objectFit: "cover" }}
                            onError={(e) => {
                              // Fallback for missing profile images
                              const target = e.target as HTMLImageElement;
                              target.src = `/api/placeholder/400/300?text=${getInitials(
                                person.name
                              )}`;
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
                            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                              {getInitials(person.name)}
                            </div>
                          </div>
                        )}

                        {/* Overlay with name and details on the photo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                          <h3 className="text-xl font-bold mb-1">
                            {person.name || "Unnamed Alumni"}
                          </h3>
                          {person.position && (
                            <p className="text-white/90 text-l font-medium">
                              {person.position}
                            </p>
                          )}
                          {person.company && (
                            <p className="text-white/80 font-bold text-xl">
                              {person.company}
                            </p>
                          )}
                        </div>

                        {/* Decorative top accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 to-blue-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 to-blue-500"></div>
                      </div>

                      {/* Additional content */}
                      <div className="p-2">

                        {person.mindbendPosition && (
                          <div className="mt-2 text-[1.2rem] text-blue-900 font-bold">
                            <span className="font-bold text-black">Mindbend:</span>{" "}
                            {person.mindbendPosition}
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Back side of card - Simplified with just LinkedIn and GitHub links */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-600 to-indigo-800 flex flex-col items-center justify-center p-6 rounded-xl">
                      <div className="text-center text-white mb-6">
                        <h3 className="text-xl font-bold mb-2">
                          {person.name || "Unnamed Alumni"}
                        </h3>
                      </div>

                      {/* Social links arranged vertically (up and down) */}
                      <div className="flex flex-col gap-4 w-full max-w-[200px]">
                        {person.linkedinUrl && (
                          <a
                            href={person.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center gap-3 transition-colors group"
                            aria-label="LinkedIn Profile"
                          >
                            <div className="bg-white p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                              <svg
                                className="w-6 h-6 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </div>
                            <span className="text-white text-sm font-medium">
                              LinkedIn
                            </span>
                          </a>
                        )}

                        {person.githubUrl && (
                          <a
                            href={person.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center gap-3 transition-colors group"
                            aria-label="GitHub Profile"
                          >
                            <div className="bg-white p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                              <svg
                                className="w-6 h-6 text-gray-800"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </div>
                            <span className="text-white text-sm font-medium">
                              GitHub
                            </span>
                          </a>
                        )}

                        {person.websiteUrl && (
                          <a
                            href={person.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center gap-3 transition-colors group"
                            aria-label="Personal Website"
                          >
                            <div className="bg-white p-2 rounded-full group-hover:bg-green-100 transition-colors">
                              <svg
                                className="w-6 h-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z" />
                              </svg>
                            </div>
                            <span className="text-white text-sm font-medium">
                              Website
                            </span>
                          </a>
                        )}

                        {person.instagramUrl && (
                          <a
                            href={person.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center gap-3 transition-colors group"
                            aria-label="Instagram Profile"
                          >
                            <div className="bg-white p-2 rounded-full group-hover:bg-pink-100 transition-colors">
                              <svg
                                className="w-6 h-6 text-pink-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                              </svg>
                            </div>
                            <span className="text-white text-sm font-medium">
                              Instagram
                            </span>
                          </a>
                        )}

                        {/* Placeholder when no links available */}
                        {!person.linkedinUrl &&
                          !person.githubUrl &&
                          !person.websiteUrl &&
                          !person.instagramUrl &&
                          !person.twitterUrl && (
                            <div className="text-white/70 text-center bg-white/10 p-4 rounded-lg">
                              <svg
                                className="w-10 h-10 mx-auto mb-2 text-white/50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a3 3 0 010-4.243m-4.95-4.95a9 9 0 010 12.728m3.536-3.536a3 3 0 010-4.243"
                                />
                              </svg>
                              <p>No social links available</p>
                            </div>
                          )}
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
