"use client"

import React, { useEffect, useState } from 'react'

type AlumniPerson = {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    name?: string;
    position?: string;
    company?: string;
    role?: string;
    image?: string;
    graduationYear: number;
    currentJobTitle?: string | null;
    currentCompany?: string | null;
    profilePhotoUrl?: string | null;
    mindbendPosition?: string;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    instagramUrl?: string | null;
    twitterUrl?: string | null;
    websiteUrl?: string | null;
  };

  type GroupedAlumni = Record<string, AlumniPerson[]>;

function AlumniCount() {

    const [selectedYear, setSelectedYear] = useState("2024");
          const [alumniData, setAlumniData] = useState<GroupedAlumni>({});
          const [isLoading, setIsLoading] = useState(true);
          const [error, setError] = useState<string | null>(null);
    console.log(selectedYear);
    console.log(isLoading);
    console.log(error);
            useEffect(() => {
              const fetchAlumni = async () => {
                try {
                  setIsLoading(true);
                  const response = await fetch("/api/alumnipage");
          
                  if (!response.ok) {
                    throw new Error(
                      `Failed to fetch alumni data: ${response.status} ${response.statusText}`
                    );
                  }
          
                  const data = await response.json();
          
                  // Safely process alumni data
                  if (data.alumni && typeof data.alumni === "object") {
                    // Transform API data to match our component's expected format
                    const transformedData: GroupedAlumni = {};
          
                    Object.keys(data.alumni).forEach((year) => {
                      transformedData[year] = data.alumni[year].map(
                        (alumni: AlumniPerson) => ({
                          id: alumni.id,
                          // Combine firstName and lastName into name
                          name: [alumni.firstName, alumni.lastName]
                            .filter(Boolean)
                            .join(" "),
                          position: alumni.currentJobTitle || "",
                          company: alumni.currentCompany || "",
                          image: alumni.profilePhotoUrl || "",
                          graduationYear: alumni.graduationYear,
                          // Keep original fields as well
                          firstName: alumni.firstName,
                          lastName: alumni.lastName,
                          currentJobTitle: alumni.currentJobTitle,
                          currentCompany: alumni.currentCompany,
                          profilePhotoUrl: alumni.profilePhotoUrl,
                          mindbendPosition: alumni.mindbendPosition,
                          linkedinUrl: alumni.linkedinUrl,
                          githubUrl: alumni.githubUrl,
                          instagramUrl: alumni.instagramUrl,
                          twitterUrl: alumni.twitterUrl,
                          websiteUrl: alumni.websiteUrl,
                        })
                      );
                    });
          
                    setAlumniData(transformedData);
          
                    // Set selected year to the most recent year with data if available
                    const years = Object.keys(transformedData);
                    if (years.length > 0) {
                      const sortedYears = years.sort((a, b) => Number(b) - Number(a));
                      setSelectedYear(sortedYears[0]);
                    }
                  } else {
                    throw new Error("Invalid alumni data format received from server");
                  }
                } catch (err) {
                  setError(err instanceof Error ? err.message : "An error occurred");
                  console.error("Error fetching alumni data:", err);
                } finally {
                  setIsLoading(false);
                }
              };
          
              fetchAlumni();
            }, []);
    
      const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
      };
    
      // Get available years from data, or fallback to default range
      const availableYears =
        Object.keys(alumniData).length > 0
          ? Object.keys(alumniData).sort((a, b) => Number(b) - Number(a))
          : Array.from({ length: 11 }, (_, i) => (2024 - i).toString());
  return (
    <div>
        <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">
                {Object.values(alumniData).reduce(
                  (count, yearGroup) => count + yearGroup.length,
                  0
                ) || "5000+"}
                  
                  
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">
                Alumni
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="text-3xl font-bold text-blue-600">
                {Object.keys(alumniData).length || "10+"}
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">
                Years
              </div>
            </div>
          </div>
    </div>
  )
}

export default AlumniCount