"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full lg:w-1/3 space-y-6">
      
        <h2 className="text-5xl font-bold relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
            Alumni
          </span>
          <br />
          <span className="text-black">Registeration</span>
          <div className="absolute -bottom-6 left-8 w-20 h-1 bg-blue-300"></div>
          <div className="absolute -bottom-10 left-12 w-12 h-1 bg-blue-200"></div>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-blue-500 mt-4 rounded-full"></div>
        </h2>
      </div>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 border-4 border-black">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-semibold text-black">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key as keyof FormDataType]}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
