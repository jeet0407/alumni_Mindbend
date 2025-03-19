import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";
import AlumniCards from "@/components/AlumniCards";
import AlumniCount from "@/components/AlumniCount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Alumni | Mindbend',
  description: 'Connect with alumni from Mindbend, Gujarat\'s largest annual techfest hosted by Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat. Build professional connections, access mentorship opportunities, and stay updated with the tech community.',
  keywords: 'Mindbend, SVNIT, NIT Surat, Sardar Vallabhbhai National Institute of Technology, techfest, Mindbend Alumni website , mindbend alumni website, Mindbend Alumni,mindbend alumni, mindbend alumni network, Gujarat techfest, Surat engineering, tech community, svnit mindbend alumni website, svnit alumni, svnit alumni website , alumni connections',
  authors: [{ name: 'SVNIT Mindbend Team' }],
  creator: 'SVNIT Mindbend',
  publisher: 'Sardar Vallabhbhai National Institute of Technology',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mindbend Alumni Network | Connect with Gujarat\'s Largest Techno-Managerial fest Community',
    description: 'Join the alumni network of Mindbend, the premier technical festival of SVNIT Surat. Connect with tech professionals, access career opportunities, and stay involved with Gujarat\'s leading technical community.',
    type: 'website',
    url: 'https://alumni.mindbend-svnit.com',
    siteName: 'Mindbend Alumni Network',
    locale: 'en_IN',
    images: [
      {
        url: '/images/logomain.png',
        width: 1200,
        height: 630,
        alt: 'Mindbend Alumni Network Banner',
      },
    ],
  },
}

// Sample carousel images
const alumniImage = [
  {
    src: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741891257/t6nfi7zbts8rrsxd52rl.png",
    alt: "Alumni 1",
    batch: "2023",
  },
];

export default function Alumni() {
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
            <div className={`absolute inset-0 transition-opacity duration-500`}>
              {/* Image container */}
              <div className="relative w-full h-full">
                <Image
                  src={alumniImage[0].src}
                  alt={alumniImage[0].alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <p className="text-white font-semibold">
                    Batch of {alumniImage[0].batch}
                  </p>
                </div>
              </div>
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
          <AlumniCount />
        </div>
      </div>

      {/* Alumni list */}
      <AlumniCards />

      <Footer />
    </div>
  );
}
