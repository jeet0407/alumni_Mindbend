"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Link from "next/link";

function Mindbend() {
  return (
    <>
      <Navbar />

      <div className="py-4 relative overflow-hidden mt-16">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>

          {/* Small decorative elements */}
          <div className="absolute top-20 right-10 w-12 h-12 border-4 border-blue-200/30 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-8 h-8 border-2 border-blue-800/20 rounded-full"></div>
          <div className="absolute bottom-40 right-1/4 w-24 h-4 bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-md"></div>
        </div>

        {/* About Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
            {/* Left side: Text Content */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              {/* Heading with decorative elements */}
              <div className="relative mb-16">
                <h2 className="text-3xl md:text-6xl font-bold text-blue-900 relative inline-block">
                  <span className="text-black">About&nbsp;</span>
                  MINDBEND
                  <div className="absolute -bottom-6 left-2 w-120 h-1 bg-blue-800"></div>
                  <div className="absolute -bottom-10 left-4 w-100 h-1 bg-blue-600"></div>
                </h2>
              </div>

              {/* Paragraph text with enhanced typography and styling */}
              <div className="text-black space-y-4 leading-relaxed font-bold">
                <p className="text-base md:text-lg mb-4">
                  <span className="font-semibold text-blue-900">Mindbend</span>{" "}
                  is Gujarat`&apos;`s largest Techno-Managerial fest, hosted
                  annually by SVNIT, Surat. The 2025 edition, themed
                  <span className="italic font-bold">
                    {" "}
                    &quot;Ecogenesis: Bharat`&apos;`s Journey from Roots to
                    Revolution&quot;
                  </span>{" "}
                  celebrates India`&apos;`s cultural heritage and technological
                  progress.
                </p>

                <p className="text-base md:text-lg mb-4">
                  Attracting over{" "}
                  <span className="font-semibold text-blue-800">
                    15,000 participants
                  </span>
                  , it features workshops, competitions, and engaging
                  activities. Past guest lectures have included notable figures
                  like Dr. G. Satheesh Reddy (Ex-Chairman, DRDO) and Captain
                  Yogendra Singh Yadav (Param Vir Chakra).
                </p>

                <p className="text-base md:text-lg">
                  The fest has also featured influential speakers like Aman
                  Dhattarwal, Shradha Khapra, and Sandeep Jain, who have
                  inspired and educated attendees.
                </p>
              </div>

              <div className="mt-10 flex space-x-4">
                {/* Core Committee Button */}
                {/* Button inside <a> for small screens */}
                <a href="/core" className="block md:hidden">
                  <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-blue-200/40 hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95">
                    <span className="absolute -end-10 -start-10 top-12 h-40 -translate-y-24 rotate-45 bg-white/20 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"></span>

                    <span className="relative flex items-center gap-2">
                      {/* Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>

                      {/* Text */}
                      <span className="font-medium tracking-wider">
                        <span className="block text-sm font-light opacity-90">
                          Checkout Our
                        </span>
                        <span className="text-lg font-bold -mt-1 block">
                          Core Committee
                        </span>
                      </span>
                    </span>

                    {/* Decorative corner accent */}
                    <span className="absolute right-1 top-1 h-3 w-3 border-t-0 border-r-2 border-b-0 border-l-0 border-white opacity-70 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"></span>
                    <span className="absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-t-0 border-r-0 border-white opacity-70 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"></span>
                  </button>
                </a>

                {/* Link for medium and larger screens */}
                <Link
                  href="/core"
                  className="hidden md:inline-flex group relative items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-blue-200/40 hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
                >
                  <span className="absolute -end-10 -start-10 top-12 h-40 -translate-y-24 rotate-45 bg-white/20 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"></span>

                  <span className="relative flex items-center gap-2">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {/* Text */}
                    <span className="font-medium tracking-wider">
                      <span className="block text-sm font-light opacity-90">
                        Checkout Our
                      </span>
                      <span className="text-lg font-bold -mt-1 block">
                        Core Committee
                      </span>
                    </span>
                  </span>

                  {/* Decorative corner accent */}
                  <span className="absolute right-1 top-1 h-3 w-3 border-t-0 border-r-2 border-b-0 border-l-0 border-white opacity-70 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"></span>
                  <span className="absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-t-0 border-r-0 border-white opacity-70 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"></span>
                </Link>

                {/* Mindbend website */}

                <Link
                  href="https://www.mindbend-svnit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-gray-700 to-gray-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-gray-200/40 hover:shadow-xl hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
                >
                  <span className="absolute -end-10 -start-10 top-12 h-40 -translate-y-24 rotate-45 bg-white/20 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"></span>

                  <span className="relative flex items-center gap-2">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {/* Text with two-layer design */}
                    <span className="font-medium tracking-wider">
                      <span className="block text-sm font-light opacity-90">
                        Checkout
                      </span>
                      <span className="text-lg font-bold -mt-1 block">
                        Mindbend Website
                      </span>
                    </span>
                  </span>

                  {/* Decorative corner accent */}
                  <span className="absolute right-1 top-1 h-3 w-3 border-t-0 border-r-2 border-b-0 border-l-0 border-white opacity-70 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"></span>
                  <span className="absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-t-0 border-r-0 border-white opacity-70 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"></span>
                </Link>
              </div>
            </div>

            {/* Right side: Image with decorative elements */}
            <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* Main image */}
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src="/images/mbpagehero.webp"
                    alt="Mindbend Festival"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-blue-800/30 rounded-tl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-blue-800/30 rounded-br-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual graphic element */}
        <div className="mt-10 relative">
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-blue-600"></div>
            <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
            </div>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-blue-600"></div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-24 relative">
          {/* Background decorative elements for theme section */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50/80 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-100/50 rounded-full blur-2xl"></div>
          </div>

          {/* Theme header with stacked text */}
          <div className="text-center relative mb-12">
            <h2 className="inline-block relative">
              <span className="block text-4xl md:text-5xl font-extrabold tracking-tight text-black">
                THEME :{" "}
              </span>
              <span className="block text-4xl md:text-6xl font-extrabold tracking-tight text-blue-800">
                ECOGENESIS
              </span>

              {/* Decorative underlines */}
              <div className="h-1 w-32 md:w-68 bg-blue-800 mx-auto mt-4"></div>
              <div className="h-1 w-24 md:w-48 bg-blue-600 mx-auto mt-2"></div>

              {/* Side decorative elements */}
              <div className="absolute -left-2 md:-left-6 top-1/2 w-4 h-4 md:w-6 md:h-6 bg-blue-100 rounded-full hidden md:block"></div>
              <div className="absolute -right-2 md:-right-6 top-1/2 w-4 h-4 md:w-6 md:h-6 bg-blue-100 rounded-full hidden md:block"></div>
            </h2>
          </div>

          {/* Theme description with enhanced styling */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-xl leading-relaxed text-black font-bold relative px-4 md:px-10">
              <span className="absolute -left-2 top-0 text-4xl text-blue-200 font-serif">
                &quot;
              </span>
              Welcome to{" "}
              <span className="font-semibold text-blue-900">
                MINDBEND`&apos;`s ECOGENESIS
              </span>
              —a celebration of Bharat`&apos;`s journey blending rich heritage
              with cutting-edge innovation. This theme captures India`&apos;`s
              rise, where tradition fuels progress, shaping a sustainable and
              dynamic future. Join us as we explore the fusion of ecology,
              sustainability, and innovation, honoring the past while building a
              greener tomorrow.
              <span className="absolute -right-2 bottom-0 text-4xl text-blue-200 font-serif">
                &quot;
              </span>
            </p>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-800 via-transparent to-blue-600"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-16">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-black p-6 bg-gray-50">
              Our Location
            </h3>
            <div className="aspect-w-16 aspect-h-9 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14883.048663936506!2d72.77672580474201!3d21.161861188332868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dee0c3c5311%3A0x7bd4e2f1cdf25f26!2sSVNIT%20Campus%2C%20Athwa%2C%20Surat%2C%20Gujarat%20395007!5e0!3m2!1sen!2sin!4v1741720349690!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-black p-6 bg-gray-50">
              Follow Us on Instagram
            </h3>
            <div className="aspect-w-16 aspect-h-9 h-[400px]">
              <iframe
                src="https://www.instagram.com/mindbend_nitsurat/embed"
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                // allowTransparency="t"
              ></iframe>
            </div>
            <div className="p-4 text-center">
              <a
                href="https://www.instagram.com/mindbend_nitsurat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-800 font-medium"
              >
                Visit our Instagram Profile
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 mb-2 flex flex-wrap justify-center gap-6">
          {/* First Phone Number */}
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-blue-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-blue-700">
              Ridhayu Gosai (JCCAS): +91 99741 88122
            </span>
          </div>

          {/* Second Phone Number */}
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-blue-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-blue-700">
              Darshit Desai (JCCAS): +91 78784 03838
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Mindbend;
