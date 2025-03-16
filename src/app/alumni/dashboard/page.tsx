"use client";


import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";




type ProfileData = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  admissionNumber?: string;
  graduationYear: number;
  currentJobTitle?: string;
  currentCompany?: string;
  currentLocation?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  bio?: string;
  profilePhotoUrl?: string;
};

export default function AlumniDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    graduationYear: '',
    currentJobTitle: '',
    currentCompany: '',
    currentLocation: '',
    linkedinUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    githubUrl: '',
    websiteUrl: '',
    bio: '',
    profilePhotoUrl: ''
  });

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/register');
  //   }
  // }, [status, router]);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            // Add credentials to ensure cookies are sent
            credentials: 'include',
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch profile data');
          }
          
          const data = await response.json();
          
          if (!data || !data.user) {
            throw new Error('Invalid profile data received');
          }
          
          setProfileData(data.user);
          
          // Initialize form with existing data
          setFormData({
            firstName: data.user.firstName || '',
            lastName: data.user.lastName || '',
            phone: data.user.phone || '',
            graduationYear: data.user.graduationYear?.toString() || '',
            currentJobTitle: data.user.currentJobTitle || '',
            currentCompany: data.user.currentCompany || '',
            currentLocation: data.user.currentLocation || '',
            linkedinUrl: data.user.linkedinUrl || '',
            instagramUrl: data.user.instagramUrl || '',
            twitterUrl: data.user.twitterUrl || '',
            githubUrl: data.user.githubUrl || '',
            websiteUrl: data.user.websiteUrl || '',
            bio: data.user.bio || '',
            profilePhotoUrl: data.user.profilePhotoUrl || ''
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
          setMessage({
            type: 'error',
            content: error instanceof Error ? error.message : 'Failed to load profile data. Please try again later.'

          });
        } finally {
          setLoading(false);
        }

      } else if (status !== 'loading') {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [status, session]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div>

    <Navbar/>

    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Header */}
      <header className="relative z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 flex items-center bg-red-500 space-x-1 hover:bg-gray-100 text-black border border-gray-300 rounded-lg shadow-sm transition-all hover:shadow focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Sign Out</span>

              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message display */}
        {message.content && (

          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message.content}
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Photo */}
            <div className="border-b border-gray-100 pb-6">
              <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Profile Photo
              </h4>
              <div className="md:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative group">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-white shadow-md transition-transform group-hover:scale-105">
                    {formData.profilePhotoUrl ? (
                      <Image
                        src={formData.profilePhotoUrl}
                        alt="Profile"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 text-5xl font-bold">
                        {formData.firstName && formData.firstName[0]}
                        {formData.lastName && formData.lastName[0]}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Profile Card - Right Side */}
            <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
               
              </h2>
              <Link href="/DashboardDetails">
              <button
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Edit Profile
              </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {formData.firstName}
                  </h3>
                  
                </div>

                
              </div>

              <div className="col-span-2">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Bio
                  </h3>
                  <p className="text-gray-800">{formData.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>

        <div className="mt-8 mb-4">
          {/* Section title */}
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Dashboard Statistics
          </h3>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Completion Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Profile Completion
                </h3>
              </div>

              <div className="relative">
                {/* Completion stats */}
                {profileData && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-grow">
                        <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${Math.round(
                                (Object.values(formData).filter(Boolean)
                                  .length /
                                  Object.keys(formData).length) *
                                  100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 border-2 border-blue-100">
                        <span className="text-sm font-bold text-blue-700">
                          {Math.round(
                            (Object.values(formData).filter(Boolean).length /
                              Object.keys(formData).length) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>

                    {/* Stats breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1 border-t border-gray-100">
                        <span className="text-gray-600">Fields Completed</span>
                        <span className="font-medium text-gray-900">
                          {Object.values(formData).filter(Boolean).length} /{" "}
                          {Object.keys(formData).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-t border-gray-100">
                        <span className="text-gray-600">Basic Information</span>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-1">
                            {
                              [
                                "firstName",
                                "lastName",
                                "phone",
                                "graduationYear",
                              ].filter(
                                (key) => formData[key as keyof typeof formData]
                              ).length
                            }
                            /4
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${
                              [
                                "firstName",
                                "lastName",
                                "phone",
                                "graduationYear",
                              ].filter(
                                (key) => formData[key as keyof typeof formData]
                              ).length === 4
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d={
                                [
                                  "firstName",
                                  "lastName",
                                  "phone",
                                  "graduationYear",
                                ].filter(
                                  (key) =>
                                    formData[key as keyof typeof formData]
                                ).length === 4
                                  ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  : "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              }
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1 border-t border-gray-100">
                        <span className="text-gray-600">Social Links</span>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-1">
                            {
                              [
                                "linkedinUrl",
                                "twitterUrl",
                                "instagramUrl",
                                "githubUrl",
                                "websiteUrl",
                              ].filter(
                                (key) => formData[key as keyof typeof formData]
                              ).length
                            }
                            /5
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${
                              [
                                "linkedinUrl",
                                "twitterUrl",
                                "instagramUrl",
                                "githubUrl",
                                "websiteUrl",
                              ].filter(
                                (key) => formData[key as keyof typeof formData]
                              ).length >= 2
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d={
                                [
                                  "linkedinUrl",
                                  "twitterUrl",
                                  "instagramUrl",
                                  "githubUrl",
                                  "websiteUrl",
                                ].filter(
                                  (key) =>
                                    formData[key as keyof typeof formData]
                                ).length >= 2
                                  ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  : "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              }
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Quick action buttons */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                        Add missing info
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                        View public profile
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional stats cards - can be added here */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Network Activity
                </h3>
              </div>
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm">
                  Connect with alumni to see activity
                </p>
                <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Explore Network
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Support Mindbend
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                      <Image
                        src="/images/mbpagehero.webp"
                        alt="Mindbend Icon"
                        width={30}
                        height={30}
                        className="h-12 w-12 rounded-xl object-contain"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-semibold text-gray-900">
                        Mindbend 2025
                      </p>
                      <p className="text-sm text-gray-700">
                        Techno-Managerial Fest
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
                onClick={()=>router.push("/contribution")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Contribute to Mindbend
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>

    </div>
  );
}

