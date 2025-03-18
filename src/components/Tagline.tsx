import Link from "next/link";
import React from "react";

function Tagline() {
  return (
    <div>
      <section className="container mx-auto py-20 px-4 md:px-8 bg-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-900 rounded-full opacity-10 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-800 rounded-full opacity-5 translate-y-1/2 blur-3xl"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 hidden md:block">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-6 left-6"></div>
        </div>
        <div className="absolute bottom-20 left-20 hidden md:block">
          <div className="w-20 h-1 bg-blue-800 rounded-full"></div>
          <div className="w-12 h-1 bg-blue-800 rounded-full mt-2"></div>
          <div className="w-8 h-1 bg-blue-800 rounded-full mt-2"></div>
        </div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-40 pointer-events-none"></div>

        {/* Main content with blue edge accent */}
        <div className="relative border-l-4 border-blue-800 pl-4 md:pl-8 py-2">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Left side content */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center">
                <div className="h-8 w-2 bg-blue-900 mr-4"></div>
                <h2 className="text-5xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">
                    MINDBEND&apos;s ECOGENESIS
                  </span>
                </h2>
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 leading-tight">
                Bharat&apos;s Journey from Roots to Revolution
              </h3>
              <p className="text-gray-600 text-lg relative">
                <span className="absolute -left-8 top-0 h-full w-1 bg-blue-200 hidden md:block"></span>
                Explore the transformative journey of innovation and
                sustainability that&apos;s reshaping &apos;s future. Join us as
                we showcase groundbreaking ideas and revolutionary concepts.
              </p>
              <div className="relative">
                <Link
                  href="https://www.mindbend-svnit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </Link>

                <div className="absolute -bottom-6 left-8 w-20 h-1 bg-blue-300"></div>
                <div className="absolute -bottom-10 left-12 w-12 h-1 bg-blue-200"></div>
              </div>
            </div>

            {/* Right side YouTube video */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="rounded-xl overflow-hidden shadow-xl shadow-blue-900/20 transform hover:scale-[1.02] transition-all duration-300 border-2 border-blue-700/30 bg-white relative">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-600"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-600"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-600"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-600"></div>

                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  {" "}
                  {/* 16:9 aspect ratio */}
                  <iframe
                    src="https://www.youtube.com/embed/rmYQGQB1On8"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>

              {/* Video control elements */}
              <div className="mt-4 flex justify-between items-center px-2">
                <div className="h-1 w-1/3 bg-gradient-to-r from-blue-900 to-transparent rounded-full"></div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full border-2 border-blue-700 flex items-center justify-center">
                    <div className="h-2 w-2 bg-blue-700 rounded-full"></div>
                  </div>
                </div>
                <div className="h-1 w-1/3 bg-gradient-to-l from-blue-900 to-transparent rounded-full"></div>
              </div>

              {/* Additional blue elements */}
              <div className="mt-2 flex justify-end">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tagline;
