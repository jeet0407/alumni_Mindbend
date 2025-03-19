// File: app/thank-you/page.tsx
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/alumni/dashboard"); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Donation!</h1>
          
          <p className="text-gray-600 mb-6">
            Your transaction has been recorded successfully. Your contribution will help support our alumni network and activities.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800">
              You will be redirected to your profile in {countdown} seconds.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
            <Link
              href="/alumni/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Go to My Profile
            </Link>
            
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Return to Home
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            If you have any questions about your donation, please contact us at{" "}
            <a
              href="mailto:mindbend@svnit.ac.in"
              className="text-blue-600 hover:underline"
            >
              mindbend@svnit.ac.in
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}