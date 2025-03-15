"use client";

import React, { useEffect, useState } from 'react';

// Define types for the Cloudinary widget
interface CloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
  tags?: string[];
  sources?: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  clientAllowedFormats?: string[];
  resourceType?: string;
  styles?: {
    palette?: {
      window?: string;
      windowBorder?: string;
      tabIcon?: string;
      menuIcons?: string;
      textDark?: string;
      textLight?: string;
      link?: string;
      action?: string;
      inactiveTabIcon?: string;
      error?: string;
      inProgress?: string;
      complete?: string;
      sourceBg?: string;
    };
    fonts?: {
      default?: string | null;
    };
  };
  text?: {
    [language: string]: {
      menu?: {
        [key: string]: string;
      };
      buttons?: {
        [key: string]: string;
      };
    };
  };
  showSkipCropButton?: boolean;
  croppingAspectRatio?: number;
  showPoweredBy?: boolean;
  language?: string;
  form?: Record<string, string | number | boolean>;
  context?: Record<string, string>;
}

interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
    format: string;
    width: number;
    height: number;
    tags: string[];
  };
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: CloudinaryWidgetOptions,
        callback: (error: Error | null, result: CloudinaryResult | null) => void
      ) => {
        open: () => void;
        close: () => void;
      };
    };
  }
}

const UploadPhoto = () => {
  const [widget, setWidget] = useState<{ open: () => void; close: () => void } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load the Cloudinary widget script
    if (!document.getElementById('cloudinary-widget-script')) {
      setIsLoading(true);
      const script = document.createElement('script');
      script.id = 'cloudinary-widget-script';
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => setIsLoading(false);
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (widget) {
        widget.close();
      }
    };
  }, [widget]);

  const initializeWidget = () => {
    if (window.cloudinary) {
      const uploadWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
          folder: 'mindbend_alumni', // All user uploads will go to this folder
          tags: ['mindbend', 'alumni'], // Add tags to help organize images
          sources: ['local', 'url', 'camera', 'google_drive', 'dropbox'], // Allowed upload sources
          multiple: true, // Allow uploading multiple files
          maxFiles: 10, // Maximum number of files per upload session
          maxFileSize: 10000000, // Limit to 10MB per file
          clientAllowedFormats: ['image'], // Only allow images
          resourceType: 'image',
          styles: {
            palette: {
              window: "#FFFFFF", // Widget background
              windowBorder: "#90A0B3", // Widget border color
              tabIcon: "#0076DE", // Tab icons
              menuIcons: "#5A616A", // Menu icons
              textDark: "#000000", // Text dark
              textLight: "#FFFFFF", // Text light
              link: "#0078FF", // Links
              action: "#3366FF", // Button color
              inactiveTabIcon: "#0E2F5A", // Inactive tab icon
              error: "#F44235", // Error notifications
              inProgress: "#0078FF", // In progress status
              complete: "#20B832", // Success status
              sourceBg: "#E4EBF1" // Background of source buttons
            },
            fonts: {
              default: null, // Use the site's default font
            }
          },
          text: {
            en: {
              menu: {
                files: 'My Device',
                url: 'Web Address',
                camera: 'Camera'
              },
              buttons: {
                confirm: 'Upload'
              }
            }
          },
          showSkipCropButton: false, // Force users to crop their images
          croppingAspectRatio: 16/9, // Set aspect ratio for cropping
          showPoweredBy: false, // Hide "Powered by Cloudinary" 
          language: "en", // Language for the widget
          // Optional pre-fill form fields to collect metadata
          form: {
            heading: 'Mindbend Photo Submission'
          },
          context: {
            alt: 'Mindbend Alumni Upload',
            caption: '',
            uploadedBy: 'alumni_website'
          }
        },
        (error, result) => {
          // Handle the response from Cloudinary
          if (!error && result && result.event === "success") {
            console.log("Upload complete! Image URL:", result.info.secure_url);
            
            // Optional: Notify your backend about the new upload
            fetch('/api/record-upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                publicId: result.info.public_id,
                url: result.info.secure_url,
                format: result.info.format,
                width: result.info.width,
                height: result.info.height,
                tags: result.info.tags
              }),
            }).catch(err => console.error("Error recording upload:", err));
            
            // You can add a notification here if you want
            // toast.success("Image uploaded successfully!");
          }
          
          if (error) {
            console.error("Upload error:", error);
            // toast.error("Upload failed. Please try again.");
          }
        }
      );
      
      setWidget(uploadWidget);
      return uploadWidget;
    }
  };

  const openWidget = () => {
    if (!widget) {
      const newWidget = initializeWidget();
      newWidget?.open();
    } else {
      widget.open();
    }
  };

  return (
    <div className="w-full md:w-1/1 mt-8 md:mt-0">
      <div className="bg-blue-50 p-8 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          Upload your Mindbend photos
        </h3>
        <p className="text-gray-700 mb-6">
          Share your memorable moments from Mindbend events with the community.
        </p>
        
        <button
          onClick={openWidget}
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-6 py-4 rounded-lg transition-all duration-300 font-semibold shadow-md ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:scale-105"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            <span className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              Upload Photos
            </span>
          )}
        </button>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          You can upload up to 10 images, max 10MB each.
          We accept JPG, PNG, and WEBP formats.
        </p>
      </div>
    </div>
  );
};

export default UploadPhoto;