import Footer from "@/components/footer";
import HeroSection from "@/components/Herosection";
import ImageGrid from "@/components/ImageGrid";
import Navbar from "@/components/Navbar";
import Tagline from "@/components/Tagline";
import Upcoming from "@/components/upcoming";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <HeroSection />
      <Tagline/>
      <ImageGrid/>
      <Upcoming />
      <Footer />
    </main>
  );
}
