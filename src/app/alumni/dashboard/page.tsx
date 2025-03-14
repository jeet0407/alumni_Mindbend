"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

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
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/register');
    }
  }, [status, router]);
  
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
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      const data = await response.json();
      setProfileData(data.user);
      setMessage({
        type: 'success',
        content: 'Profile updated successfully!'
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', content: '' });
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'error',
        content: error instanceof Error ? error.message : 'Failed to update profile. Please try again.'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Alumni Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                {session?.user?.email}
              </span>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message display */}
        {message.content && (
          <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.content}
          </div>
        )}
        
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              Profile Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Update your alumni profile details and social media links
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Photo */}
              <div className="md:col-span-2 flex flex-col items-center sm:items-start">
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300">
                  {formData.profilePhotoUrl ? (
                    <Image 
                      src={formData.profilePhotoUrl} 
                      alt="Profile"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold">
                      {formData.firstName && formData.firstName[0]}
                      {formData.lastName && formData.lastName[0]}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="profilePhotoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo URL
                  </label>
                  <input
                    type="text"
                    name="profilePhotoUrl"
                    id="profilePhotoUrl"
                    value={formData.profilePhotoUrl}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
              </div>
              
              {/* Basic Information */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  id="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Professional Information */}
              <div>
                <label htmlFor="currentJobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Job Title
                </label>
                <input
                  type="text"
                  name="currentJobTitle"
                  id="currentJobTitle"
                  value={formData.currentJobTitle}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="currentCompany" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  id="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Location
                </label>
                <input
                  type="text"
                  name="currentLocation"
                  id="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City, Country"
                />
              </div>
              
              {/* Bio Section */}
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself, your journey since graduation..."
                />
              </div>
              
              {/* Social Media Links */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Social Media & Online Presence</h4>
              </div>
              
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <div>
                <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter Profile
                </label>
                <input
                  type="url"
                  name="twitterUrl"
                  id="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              
              <div>
                <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram Profile
                </label>
                <input
                  type="url"
                  name="instagramUrl"
                  id="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://instagram.com/yourusername"
                />
              </div>
              
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              
              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Personal Website
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  id="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Alumni Network Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Profile Completion</h3>
            <div className="relative pt-1">
              {/* Calculate completion based on filled fields */}
              {profileData && (
                <>
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        {Object.values(formData).filter(Boolean).length} / {Object.keys(formData).length} fields
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {Math.round((Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div 
                      style={{ width: `${Math.round((Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>  
  );
}