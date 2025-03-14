"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Vasu() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push("/alumni/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error(
        `Error logging in: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
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
          <span className="text-black">Login</span>
          <div className="absolute -bottom-6 left-8 w-20 h-1 bg-blue-300"></div>
          <div className="absolute -bottom-10 left-12 w-12 h-1 bg-blue-200"></div>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-blue-500 mt-4 rounded-full"></div>
        </h2>
      </div>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border-4 border-black">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{" "}
            <a href="/register" className="text-blue-700 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}