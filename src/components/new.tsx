"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"; // Added Navbar import

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
    instagramUrl: "",
    twitterUrl: "",
    githubUrl: "",
    websiteUrl: "",
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
    instagramUrl: string;
    twitterUrl: string;
    githubUrl: string;
    websiteUrl: string;
    bio: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Add Navbar */}
      <Navbar />
      
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

      <div className="flex items-center justify-center min-h-screen pt-20 p-4 relative z-10">
        <div className="w-full lg:w-1/3 space-y-6 pr-4">
          <h2 className="text-5xl font-bold relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
              Alumni
            </span>
            <br />
            <span className="text-black">Registration</span>
            <div className="absolute -bottom-6 left-8 w-20 h-1 bg-blue-300"></div>
            <div className="absolute -bottom-10 left-12 w-12 h-1 bg-blue-200"></div>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-blue-500 mt-4 rounded-full"></div>
          </h2>
          
          {/* Added decorative elements */}
          <div className="hidden lg:block relative mt-16">
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-50 rounded-full"></div>
            <div className="absolute top-10 left-10 w-40 h-40 border-4 border-dashed border-blue-200 rounded-full"></div>
            <div className="absolute top-20 left-20 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v10" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 border-4 border-black relative">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-800 -translate-x-4 -translate-y-4"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-800 translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-800 -translate-x-4 translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-800 translate-x-4 translate-y-4"></div>
          
          {/* Form with improved styling */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-sm font-semibold text-black mb-1">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  id={key}
                  value={formData[key as keyof FormDataType]}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400 bg-white/80"
                />
              </div>
            ))}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors duration-300 font-semibold"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}