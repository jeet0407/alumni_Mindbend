"use client"
import { useState, useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import ProfilePhotoSection from "@/components/ProfilePhoto"

type ProfileData = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  admissionNumber?: string
  graduationYear: number
  currentJobTitle?: string
  currentCompany?: string
  currentLocation?: string
  linkedinUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  githubUrl?: string
  websiteUrl?: string
  bio?: string
  profilePhotoUrl?: string
}

type Transaction = {
  id: string
  amount: number
  date: string
  name: string
  status: "completed" | "pending" | "failed"
  transactionId: string
  lastUpdated?: string
}

export default function AlumniDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [message, setMessage] = useState({ type: "", content: "" })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionLoading, setTransactionLoading] = useState(true)
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
  })

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/register")
  //   }
  // }, [status, router])

  // Fetch user profile data
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
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to fetch profile data")
          }

          const data = await response.json()

          if (!data || !data.user) {
            throw new Error("Invalid profile data received")
          }
          setProfileData(data.user)
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
          })
        } catch (error) {
          console.error("Error fetching profile:", error)
          setMessage({
            type: "error",
            content: error instanceof Error ? error.message : "Failed to load profile data. Please try again later.",
          })
        } finally {
          setLoading(false)
        }
      } else if (status !== "loading") {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [status, session])

  // Fetch transaction history
  useEffect(() => {
    const fetchTransactions = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          setTransactionLoading(true)
          const response = await fetch("/api/transaction", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to fetch transaction history")
          }

          const data = await response.json()
          console.log("Transactions data:", data) // Debug log

          // Map the API response to match the Transaction type
          interface ApiTransaction {
            id: string;
            firstName: string;
            transactionAmount: number;
            transactionDate: string;
            mindbendPosition: string;
            transactionId: string;
          }

          const formattedTransactions = data.map((item: ApiTransaction) => ({
            id: item.id,
            amount: item.transactionAmount || 0,
            date: item.transactionDate || new Date().toISOString(),
            name:item.firstName || "Anonymous",
            status: "completed",
            transactionId: item.transactionId || "Anonymous",
            lastUpdated: item.transactionDate || new Date().toISOString(),
          }))

          setTransactions(formattedTransactions || [])
        } catch (error) {
          console.error("Error fetching transactions:", error)
          // Show error message for transactions
          setMessage({
            type: "error",
            content: "Failed to load transaction history. Please try again later.",
          })
        } finally {
          setTransactionLoading(false)
        }
      }
    }

    fetchTransactions()
  }, [status, session])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-20">
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
              <ProfilePhotoSection
                formData={formData}
                setFormData={setFormData}
              />
{/* Update Profile Card - Right Side */}
<div className="w-full md:w-2/3">
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
      <div className="flex gap-3 flex-wrap">
        <Link href="/DashboardDetails">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 shadow-sm">
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

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center px-4 py-2 bg-white text-red-600 rounded-md hover:bg-red-50 transition duration-200 border border-red-500 shadow-sm"
          aria-label="Logout"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7 12.59L3.4 9l1.4-1.41L8 10.77V3h2v7.77l3.18-3.18L14.6 9 10 13.59z" 
              clipRule="evenodd" 
            />
          </svg>
          Logout
        </button>
      </div>
    </div>

    <div className="divide-y divide-gray-100">
      {/* Personal Information Section */}
      <div className="pb-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Full Name
              </h4>
              <p className="text-black text-lg font-medium">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            
            {/* Email Field (assuming email exists in formData) */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Email
              </h4>
              <p className="text-black flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2 text-gray-400" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {session?.user?.email || "Not provided"}
              </p>
            </div>
          </div>
          
          {/* Company Information Section */}
          <div>
            {/* Company Name Field */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Company
              </h4>
              <p className="text-black flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2 text-gray-400" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                {formData.currentCompany || "Not provided"}
              </p>
            </div>
            
            {/* Position/Job Title Field */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Position
              </h4>
              <p className="text-black flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2 text-gray-400" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                {formData.currentJobTitle || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
{/* Bio Section */}
<div className="pt-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-700">About Me</h3>
    
  </div>

  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100 shadow-sm">
    {formData.bio ? (
      <div className="relative">
        <svg className="absolute top-0 left-0 w-8 h-8 text-blue-300 transform -translate-x-4 -translate-y-4 opacity-50" 
          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
        </svg>
        <p className="text-gray-700 leading-relaxed text-justify pl-1">
          {formData.bio}
        </p>
        <svg className="absolute bottom-0 right-0 w-8 h-8 text-blue-300 transform translate-x-3 translate-y-3 opacity-50 rotate-180" 
          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
        </svg>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <svg className="w-12 h-12 text-blue-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
        <p className="text-gray-500 mb-2">No bio information provided.</p>
        <Link href="/DashboardDetails">
          <button className="text-blue-600 text-sm flex items-center hover:text-blue-800 transition duration-200">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            Add your bio now
          </button>
        </Link>
      </div>
    )}
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
                            <span className="text-gray-600">
                              Fields Completed
                            </span>
                            <span className="font-medium text-gray-900">
                              {Object.values(formData).filter(Boolean).length} /{" "}
                              {Object.keys(formData).length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-t border-gray-100">
                            <span className="text-gray-600">
                              Basic Information
                            </span>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900 mr-1">
                                {
                                  [
                                    "firstName",
                                    "lastName",
                                    "phone",
                                    "graduationYear",
                                  ].filter(
                                    (key) =>
                                      formData[key as keyof typeof formData]
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
                                    (key) =>
                                      formData[key as keyof typeof formData]
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
                                    (key) =>
                                      formData[key as keyof typeof formData]
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
                                    (key) =>
                                      formData[key as keyof typeof formData]
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
                        </div>
                </>
              )}
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
                  <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => router.push("/alumni")}>
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

                  <button
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
                    onClick={() => router.push("/contribution")}
                  >
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
            {/* Transaction History Section */}
          <div className="mt-8 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-green-600"
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
              Transaction History
            </h3>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {transactionLoading ? (
                <div className="p-8 flex justify-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Transaction ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.transactionId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ₹{transaction.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500">No transactions found</p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => router.push("/contribution")}
                  >
                    Make a Contribution
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

