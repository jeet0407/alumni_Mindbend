"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AlumniRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    admissionNumber: "",
    graduationYear: "",
    currentJobTitle: "",
    currentCompany: "",
    currentLocation: "",
    linkedinUrl: "",
    githubUrl: "",
    bio: "",
  });

  interface FormDataType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    admissionNumber: string;
    graduationYear: string;
    currentJobTitle: string;
    currentCompany: string;
    currentLocation: string;
    linkedinUrl: string;
    githubUrl: string;
    bio: string;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  interface RegistrationResponse {
    error?: string;
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          graduationYear: parseInt(formData.graduationYear, 10) || null,
        }),
      });
      const result: RegistrationResponse = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/");
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        `Error submitting form: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-white p-4 mt-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient circles */}
        <div className="absolute top-[-10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/40 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-40 right-20 w-24 h-24 border-8 border-blue-100/40 rounded-full"></div>
        <div className="absolute bottom-60 left-20 w-32 h-32 border-2 border-blue-800/10 rounded-full"></div>
        
        {/* Abstract geometric elements */}
        <div className="absolute top-1/4 left-10 w-16 h-16 bg-blue-50 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-1/4 right-10 w-12 h-24 bg-blue-100/30 rounded-full"></div>
        
        {/* Diagonal lines */}
        <div className="absolute top-0 left-1/3 w-0.5 h-40 bg-gradient-to-b from-transparent via-blue-300/20 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/4 w-0.5 h-60 bg-gradient-to-b from-transparent via-blue-800/10 to-transparent transform -rotate-45"></div>
        
        {/* Dots pattern */}
        <div className="absolute left-10 top-1/3 grid grid-cols-6 gap-3">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-800/10"></div>
          ))}
        </div>
      </div>
      
      {/* Title Section */}
      <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 mb-8 lg:mb-0 px-4 lg:mt-36 ">
        <h2 className="text-4xl sm:text-5xl font-bold relative mt-10 lg:mt-36">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
            Alumni
          </span>
          <br />
          <span className="text-black">Registration</span>
          <div className="absolute -bottom-6 left-8 w-20 h-1 bg-blue-300"></div>
          <div className="absolute -bottom-10 left-12 w-12 h-1 bg-blue-200"></div>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-blue-500 mt-4 rounded-full"></div>
        </h2>
        
        {/* Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block mt-20">
          
          <Link href="/" className="flex items-center text-blue-800 hover:text-blue-600 mt-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-black relative">
        <div className="max-h-[80vh] overflow-y-auto px-2"> {/* Added wrapper with max-height */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            {/* Section dividers for better organization on mobile */}
            <div className="col-span-1 sm:col-span-2 border-b border-gray-200 pb-2 mb-2">
              <h3 className="text-lg font-semibold text-blue-900">Personal Information</h3>
            </div>
            
            {/* Personal info fields */}
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-semibold text-black">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-semibold text-black">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold text-black">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-semibold text-black">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="admissionNumber" className="text-sm font-semibold text-black">
                Admission Number
              </label>
              <input
                type="text"
                name="admissionNumber"
                id="admissionNumber"
                value={formData.admissionNumber}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            {/* Education and Career Section */}
            <div className="col-span-1 sm:col-span-2 border-b border-gray-200 pb-2 mb-2 mt-4">
              <h3 className="text-lg font-semibold text-blue-900">Education & Career</h3>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="graduationYear" className="text-sm font-semibold text-black">
                Graduation Year
              </label>
              <input
                type="number"
                name="graduationYear"
                id="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="currentJobTitle" className="text-sm font-semibold text-black">
                Current Job Title
              </label>
              <input
                type="text"
                name="currentJobTitle"
                id="currentJobTitle"
                value={formData.currentJobTitle}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="currentCompany" className="text-sm font-semibold text-black">
                Current Company
              </label>
              <input
                type="text"
                name="currentCompany"
                id="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="currentLocation" className="text-sm font-semibold text-black">
                Current Location
              </label>
              <input
                type="text"
                name="currentLocation"
                id="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="linkedinUrl" className="text-sm font-semibold text-black">
                LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedinUrl"
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="githubUrl" className="text-sm font-semibold text-black">
                GitHub URL
              </label>
              <input
                type="text"
                name="githubUrl"
                id="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
            
            {/* Bio section */}
            <div className="col-span-1 sm:col-span-2 border-b border-gray-200 pb-2 mb-2 mt-4">
              <h3 className="text-lg font-semibold text-blue-900">About You</h3>
            </div>
            
            <div className="col-span-1 sm:col-span-2 flex flex-col">
              <label htmlFor="bio" className="text-sm font-semibold text-black">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 resize-none bg-white"
                placeholder="Tell us about yourself, your achievements, interests, and how you'd like to contribute to the alumni network..."
              />
            </div>
            
            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors duration-300 w-full sm:w-auto"
              >
                Register
              </button>
            </div>
            
            {/* Mobile-only login link */}
            <div className="col-span-1 sm:col-span-2 text-center mt-2 lg:hidden">
              <p className="text-sm text-gray-600">
                Already registered? <Link href="/login" className="text-blue-800 hover:text-blue-600 font-medium">Sign in</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Corner accents - moved outside scroll area */}
        <div className="absolute top-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-t-4 border-l-4 border-blue-800 -translate-x-4 -translate-y-4"></div>
        <div className="absolute top-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-t-4 border-r-4 border-blue-800 translate-x-4 -translate-y-4"></div>
        <div className="absolute bottom-0 left-0 w-4 sm:w-6 h-4 sm:h-6 border-b-4 border-l-4 border-blue-800 -translate-x-4 translate-y-4"></div>
        <div className="absolute bottom-0 right-0 w-4 sm:w-6 h-4 sm:h-6 border-b-4 border-r-4 border-blue-800 translate-x-4 translate-y-4"></div>
      </div>
    </div>
  );
}