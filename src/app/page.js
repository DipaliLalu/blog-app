import Image from "next/image";
import Navbar from "./components/navbar/page";
import HeroSection from "./components/hero-section/page";
import AboutSection from "./components/about/page";
import BlogSection from "./components/blog/page";

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-black dark:text-white flex flex-col md:gap-36 gap-10">
      <div>
        <Navbar />
      </div>
      <div className="flex-1 grid grid-cols-1 gap-4 lg:gap-10">
        <HeroSection />
        <AboutSection />
        <BlogSection />
      </div>
    </div>
  );
}
