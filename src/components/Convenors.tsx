"use client"

import Image from 'next/image'

function Convenors() {

  // Faculty advisors data
  const convenors = [
    {
        name: "RAJ VADODARIYA",
        position: "U22CS077",
        image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741711054/b6aoxbn9qncjrypzedup.jpg",
    },
    {
        name: "K D BARAIYA",
        position: "U22CE020",
        image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741644181/nsfrugxvvgnnbykrocm0.jpg",
    },
    {
      name: "TEJ HOTHI",
      position: "U22EC146",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741644186/m81j3bsognkcdrbedsa8.jpg", 
    },
    {
      name: "VATSAL KOISA",
      position: "U22CS123",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741644322/o9pmku3zjtzmbeel1vui.jpg",
    },
    {
      name: "VAISHVI JAGIWALA",
      position: "U22CE010",
      image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741642407/vaqhgllofcsre6azmmve.jpg",
    },
    {
        name: "RONAK DANGAR",
        position: "U22CS057",
        image: "https://res.cloudinary.com/dsh447lvk/image/upload/v1741643894/pfrmhqyrfgesaakfphod.jpg",
      }
  ];

  return (
    <div className=" bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right blue circle */}
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl"></div>
        
        {/* Bottom left blue circle */}
        <div className="absolute bottom-[-20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-40 left-10 w-16 h-16 border-8 border-blue-200/40 rounded-full"></div>
        <div className="absolute top-60 right-20 w-24 h-24 border-2 border-blue-800/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-32 h-8 bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-md"></div>
        
        {/* Dots pattern */}
        <div className="absolute right-10 top-1/4 grid grid-cols-5 gap-4">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-800/10"></div>
          ))}
        </div>
        
        {/* Diagonal line */}
        <div className="absolute top-0 right-1/3 w-0.5 h-56 bg-gradient-to-b from-transparent via-blue-300/20 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-10 left-1/4 w-0.5 h-40 bg-gradient-to-b from-transparent via-blue-800/10 to-transparent transform -rotate-45"></div>
      </div>

 
      {/* Faculty Advisors Section */}
      <div className="mt-24 mb-16 relative z-10">
        {/* Faculty Advisors Heading */}
        <div className="text-center mb-12 relative">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-black px-10">
              <span className="relative">
                CONVENORS
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-blue-600 to-black"></div>
              </span>
            </h2>
          
            {/* Decorative accents near heading */}
            <svg className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L20 10L10 20L0 10L10 0Z" />
            </svg>
            <svg className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L20 10L10 20L0 10L10 0Z" />
            </svg>
          </div>
          
          {/* Decorative lines */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>
        </div>
        
        {/* Faculty Cards Container with subtle background */}
        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Subtle background shape */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-blue-50/50 blur-3xl -z-10"></div>
          
          {/* Top Row - 3 cards */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            {convenors.slice(0, 3).map((convenors, index) => (
              <div key={index} className="w-full sm:w-72 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                {/* Faculty Image */}
                <div className="relative h-72 w-full bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={convenors.image}
                      alt={convenors.name}
                      width={240}
                      height={240}
                      className="rounded-full object-cover border-4 border-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                      onError={(e) => {
                        // Fallback for missing images
                        e.currentTarget.src = "https://placehold.co/400?text=" + encodeURIComponent(convenors.name.charAt(0)) + "&font=montserrat";
                      }}
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-blue-800/30 rounded-tl-xl group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-blue-800/30 rounded-br-xl group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Faculty Info */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-blue-800 mb-1">{convenors.name}</h3>
                  <div className="text-sm font-semibold text-black mb-2">{convenors.position}</div>
                  
                  {/* Bottom accent */}
                  <div className="mt-4 w-16 h-1 mx-auto bg-gradient-to-r from-blue-800 to-blue-600 rounded-full group-hover:w-24 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Row - 3 cards */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {convenors.slice(3, 6).map((convenors, index) => (
              <div key={index} className="w-full sm:w-72 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                {/* Faculty Image */}
                <div className="relative h-72 w-full bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={convenors.image}
                      alt={convenors.name}
                      width={240}
                      height={240}
                      className="rounded-full object-cover border-4 border-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                      onError={(e) => {
                        // Fallback for missing images
                        e.currentTarget.src = "https://placehold.co/400?text=" + encodeURIComponent(convenors.name.charAt(0)) + "&font=montserrat";
                      }}
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-blue-800/30 rounded-tl-xl group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-blue-800/30 rounded-br-xl group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Faculty Info */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-blue-800 mb-1">{convenors.name}</h3>
                  <div className="text-sm font-semibold text-black mb-2">{convenors.position}</div>
                  
                  {/* Bottom accent */}
                  <div className="mt-4 w-16 h-1 mx-auto bg-gradient-to-r from-blue-800 to-blue-600 rounded-full group-hover:w-24 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-800 via-transparent to-blue-600"></div>

      
    </div>

  )
}

export default Convenors