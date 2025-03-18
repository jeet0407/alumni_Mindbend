"use client"

import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


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

function DashboardDetails() {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [message, setMessage] = useState({ type: "", content: "" });
    console.log(profileData);
    console.log(message);

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      graduationYear: "",
      currentJobTitle: "",
      currentCompany: "",
      currentLocation: "",
      linkedinUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      githubUrl: "",
      websiteUrl: "",
      bio: "",
      profilePhotoUrl: "",
    });

      useEffect(() => {
        if (status === 'unauthenticated') {
          router.push('/register');
        }
      }, [status, router]);


      useEffect(() => {
        const fetchProfileData = async () => {
          if (status === "authenticated" && session?.user?.email) {
            try {
              const response = await fetch("/api/profile", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                // Add credentials to ensure cookies are sent
                credentials: "include",
              });
    
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch profile data");
              }
    
              const data = await response.json();
    
              if (!data || !data.user) {
                throw new Error("Invalid profile data received");
              }
    
              setProfileData(data.user);
    
              // Initialize form with existing data
              setFormData({
                firstName: data.user.firstName || "",
                lastName: data.user.lastName || "",
                phone: data.user.phone || "",
                graduationYear: data.user.graduationYear?.toString() || "",
                currentJobTitle: data.user.currentJobTitle || "",
                currentCompany: data.user.currentCompany || "",
                currentLocation: data.user.currentLocation || "",
                linkedinUrl: data.user.linkedinUrl || "",
                instagramUrl: data.user.instagramUrl || "",
                twitterUrl: data.user.twitterUrl || "",
                githubUrl: data.user.githubUrl || "",
                websiteUrl: data.user.websiteUrl || "",
                bio: data.user.bio || "",
                profilePhotoUrl: data.user.profilePhotoUrl || "",
              });
            } catch (error) {
              console.error("Error fetching profile:", error);
              setMessage({
                type: "error",
                content:
                  error instanceof Error
                    ? error.message
                    : "Failed to load profile data. Please try again later.",
              });
            } finally {
              setLoading(false);
            }
          } else if (status !== "loading") {
            setLoading(false);
          }
        };
    
        fetchProfileData();
      }, [status, session]);
    
      // Handle form input changes
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
    
        try {
          const response = await fetch("/api/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update profile");
          }
    
          const data = await response.json();
          setProfileData(data.user);
          setMessage({
            type: "success",
            content: "Profile updated successfully!",
          });
    
          // Clear message after 3 seconds
          setTimeout(() => {
            setMessage({ type: "", content: "" });
          }, 3000);
        } catch (error) {
          console.error("Error updating profile:", error);
          setMessage({
            type: "error",
            content:
              error instanceof Error
                ? error.message
                : "Failed to update profile. Please try again.",
          });
        } finally {
          setSaving(false);
        }
      };
    
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
        <div className="bg-white shadow-lg sm:rounded-xl overflow-hidden border border-gray-100 transition-all hover:shadow-md">
          <div className="px-6 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 mr-2"
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
              <h3 className="text-xl font-bold leading-6 text-gray-900">
                Profile Information
              </h3>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              Update your alumni profile details and social media links
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="space-y-8">
              {/* Basic Information */}

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
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Basic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="px-4 py-2.5 bg-white border text-black  border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg shadow-sm w-full transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="px-4 py-2.5 bg-white border  text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg shadow-sm w-full transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-black"
                    >
                      Phone Number
                    </label>
                    <div className="mt-1 flex rounded-lg shadow-sm overflow-hidden">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2.5 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="graduationYear"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Graduation Year <span className="text-rose-500">*</span>
                    </label>
                    <div className="mt-1 flex rounded-lg shadow-sm overflow-hidden">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                      </span>
                      <input
                        type="number"
                        name="graduationYear"
                        id="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        min="1950"
                        max={new Date().getFullYear()}
                        className="flex-1 min-w-0 block  text-black w-full px-3 py-2.5 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information - Enhanced */}
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Professional Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group">
                    <label
                      htmlFor="currentJobTitle"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors"
                    >
                      Current Job Title
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="currentJobTitle"
                        id="currentJobTitle"
                        value={formData.currentJobTitle}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="currentCompany"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors"
                    >
                      Current Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="currentCompany"
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2.5 bg-white border text-black border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="e.g. Google"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 group">
                    <label
                      htmlFor="currentLocation"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors"
                    >
                      Current Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="currentLocation"
                        id="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2.5 bg-white border text-black border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="e.g. Banglore, India"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Please include both city and country
                    </p>
                  </div>

                  {/* Bio Section */}
                  <div className="md:col-span-2 mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bio
                      </label>
                      <span className="text-xs text-gray-500">
                        {formData.bio ? formData.bio.length : 0}/500 characters
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        name="bio"
                        id="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        className="px-4 py-3 border border-gray-300 text-black rounded-lg w-full focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="Tell us about yourself, your journey since graduation..."
                        maxLength={500}
                      />
                      <div className="absolute top-3 right-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Share your professional journey, achievements, and
                      interests
                    </p>
                  </div>
                </div>
              </div>
              {/* Social Media Links */}
              <div className="pt-2">
                <div className="md:col-span-2 flex items-center space-x-2 mb-6">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900">
                    Social Media & Online Presence
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LinkedIn */}
                  <div className="relative group">
                    <label
                      htmlFor="linkedinUrl"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors"
                    >
                      LinkedIn Profile
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <svg
                          className="h-4 w-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </span>
                      <input
                        type="url"
                        name="linkedinUrl"
                        id="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full text-black px-3 py-2.5 rounded-none rounded-r-lg border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 invisible group-hover:visible transition-opacity">
                      Add your LinkedIn URL to connect with professional
                      networks
                    </p>
                  </div>

                  {/* Twitter */}
                  <div className="relative group">
                    <label
                      htmlFor="twitterUrl"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors"
                    >
                      Twitter Profile
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <svg
                          className="h-4 w-4 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.038 10.038 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </span>
                      <input
                        type="url"
                        name="twitterUrl"
                        id="twitterUrl"
                        value={formData.twitterUrl}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full text-black px-3 py-2.5 rounded-none rounded-r-lg border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="twitter.com/yourusername"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 invisible group-hover:visible transition-opacity">
                      Share your Twitter handle to connect with the community
                    </p>
                  </div>

                  {/* Instagram */}
                  <div className="relative group">
                    <label
                      htmlFor="instagramUrl"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors"
                    >
                      Instagram Profile
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <svg
                          className="h-4 w-4 text-pink-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                        </svg>
                      </span>
                      <input
                        type="url"
                        name="instagramUrl"
                        id="instagramUrl"
                        value={formData.instagramUrl}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block text-black w-full px-3 py-2.5 rounded-none rounded-r-lg border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="instagram.com/yourusername"
                      />
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="relative group">
                    <label
                      htmlFor="githubUrl"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors"
                    >
                      GitHub Profile
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        <svg
                          className="h-4 w-4 text-gray-800"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </span>
                      <input
                        type="url"
                        name="githubUrl"
                        id="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block text-black w-full px-3 py-2.5 rounded-none rounded-r-lg border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="github.com/yourusername"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 invisible group-hover:visible transition-opacity">
                      Share your code repositories and projects
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="websiteUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Personal Website
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      id="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 text-black rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                      placeholder="http://localhost:3000 :)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                onClick={() => router.push("/alumni/dashboard")}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default DashboardDetails