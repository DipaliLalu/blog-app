import Image from "next/image";
import HeroSection from "./sections/hero-section/page";
import Navbar from "./sections/navbar/page";
import AboutSection from "./sections/about/page";
import BlogSection from "./sections/blog/page";


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
