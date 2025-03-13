import Footer from "@/components/footer";
import HeroSection from "@/components/Herosection";
import ImageGrid from "@/components/ImageGrid";
import Navbar from "@/components/Navbar";
import Tagline from "@/components/Tagline";
import Upcoming from "@/components/upcoming";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mindbend Alumni Network - SVNIT Surat | Gujarat\'s Largest Techno-Managerial Fest Community',
  description: 'Connect with alumni from Mindbend, Gujarat\'s largest annual techfest hosted by Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat. Build professional connections, access mentorship opportunities, and stay updated with the tech community.',
  keywords: 'Mindbend, SVNIT, NIT Surat, Sardar Vallabhbhai National Institute of Technology, techfest, Mindbend Alumni website , mindbend alumni website, Mindbend Alumni,mindbend alumni, mindbend alumni network, Gujarat techfest, Surat engineering, tech community, svnit mindbend alumni website, svnit alumni, svnit alumni website , alumni connections',
  authors: [{ name: 'SVNIT Mindbend Team' }],
  creator: 'SVNIT Mindbend',
  publisher: 'Sardar Vallabhbhai National Institute of Technology',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mindbend Alumni Network | Connect with Gujarat\'s Largest Techno-Managerial fest Community',
    description: 'Join the alumni network of Mindbend, the premier technical festival of SVNIT Surat. Connect with tech professionals, access career opportunities, and stay involved with Gujarat\'s leading technical community.',
    type: 'website',
    url: 'https://mindbend-alumni.svnit.ac.in',
    siteName: 'Mindbend Alumni Network',
    locale: 'en_IN',
    images: [
      {
        url: '/images/mindbend-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Mindbend Alumni Network Banner',
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Tagline/>
      <ImageGrid/>
      <Upcoming />
      <Footer />
    </>
  );
}
