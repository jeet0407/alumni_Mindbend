"use client";

import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";

// Instagram Posts Data
const instagramPosts = [
  "https://www.instagram.com/p/DHGkPbtNLh8/embed",
  "https://www.instagram.com/p/DG_CCSvNp3M/embed",
  "https://www.instagram.com/p/DG7x1kdSmpJ/embed",
  "https://www.instagram.com/p/DG3UHPbtWGs/embed",
  "https://www.instagram.com/p/DG0uj8TN2i5/embed",
  "https://www.instagram.com/p/DGsrTo0NslN/embed",
  "https://www.instagram.com/p/DGqdtzaNhAM/embed",
  "https://www.instagram.com/p/DGqFmtvNZ1L/embed",
  "https://www.instagram.com/p/DGpwXr_t_ka/embed",
  "https://www.instagram.com/p/DGpttUUtd1R/embed",
  "https://www.instagram.com/p/DGn52ZgSUEI/embed",
  "https://www.instagram.com/p/DGnGZ-8y6aI/embed",
  "https://www.instagram.com/p/DGlHK39tWUi/embed",
  "https://www.instagram.com/p/DF0EieLN22k/embed",
  "https://www.instagram.com/p/DFxaD3HylI1/embed",
  "https://www.instagram.com/p/DFqDTtyS3O1/embed",
  "https://www.instagram.com/p/DGizKZhtKRx/embed",
  "https://www.instagram.com/p/DGhmL4sytKo/embed",
  "https://www.instagram.com/p/DGdJjy3yub4/embed",
  "https://www.instagram.com/p/DGPtu0dNdm7/embed",
  "https://www.instagram.com/p/DGC01k2NXnX/embed",
];



function Upcoming() {
  // Load Instagram Embed Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="py-20 relative overflow-hidden bg-white" id="upcoming-events">

<div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-900/10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-blue-900/10 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-700/5"></div>
      
            
      <div className="absolute left-10 top-40 h-40 w-1 bg-gradient-to-b from-blue-900 to-blue-500 opacity-30"></div>
      <div className="absolute right-10 bottom-40 h-40 w-1 bg-gradient-to-b from-blue-500 to-blue-900 opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-10">
          {/* Section Heading */}
          <div className="w-full text-center">
            <h2 className="text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
                Upcoming
              </span>
              <span className="text-black ml-4">Events</span>
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-900 to-blue-500 mt-4 rounded-full"></div>
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative w-full max-w-8xl mx-auto">
            <div className="carousel-container w-full overflow-x-auto relative">
              <div className="carousel flex flex-nowrap gap-4 transition-transform duration-500" style={{ minWidth: "max-content" }}>
                {instagramPosts.map((post, index) => (
                  <div key={index} id={`item${index + 1}`} className="inline-block">
                    <div className="rounded-lg bg-white backdrop-blur-md p-2 shadow-lg border border-gray-300">
                      <div className="rsme-embed rsme-instagram-embed"
                        style={{
                          overflow: "hidden",
                          width: "328px",
                          height: "425px",
                          borderRadius: "3px",
                          position: "relative",
                        }}>
                        <style>{`
                          .rsme-embed .rsme-d-none {
                            display: none;
                          }
                          .rsme-embed .twitter-tweet {
                            margin: 0 !important;
                          }
                          .rsme-embed blockquote {
                            margin: 0 !important;
                            padding: 0 !important;
                          }
                          .rsme-embed.rsme-facebook-embed .fb-post iframe {
                            width: 100% !important;
                          }
                          .rsme-embed.rsme-facebook-embed .fb-post span {
                            width: 100% !important;
                          }
                        `}</style>
                        <iframe
                          className="instagram-media instagram-media-rendered"
                          src={`${post}?cr=1&v=14&wp=489&rd=https%3A%2F%2Fwww.mindbend-svnit.com&rp=%2F#%7B%22ci%22%3A${index}%2C%22os%22%3A8352.79999999702%2C%22ls%22%3A4512.10000000149%2C%22le%22%3A8344.60000000149%7D`}
                          // allowtransparency={true}
                          allowFullScreen
                          frameBorder="0"
                          height="614"
                          scrolling="no"
                          style={{
                            width: "100%",
                            backgroundColor: "white",
                            borderRadius: "3px",
                            border: "1px solid rgb(219, 219, 219)",
                            boxShadow: "none",
                            display: "block",
                            margin: "0px 0px 12px",
                          }}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
          <a  href="https://www.mindbend-svnit.com/"
          target="_blank"
          rel="noopener noreferrer" className="inline-flex items-center text-blue-800 font-medium hover:text-blue-600 transition-colors group">
            View All events from Mindbend Website
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;