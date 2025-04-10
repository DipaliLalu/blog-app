'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../theme-toggler/page";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const route=useRouter();
  const handleLogin=()=>{
      route.push('/login')
  }
  return (
    <nav className="w-full p-4 shadow-md px-16 backdrop-blur-lg fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Logo
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <ThemeToggle/>
          <Link href="/about" className="hover:text-gray-500">
            About
          </Link>
          <Link href="/blog" className="hover:text-gray-500">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-500">
            Contact
          </Link>
          <Button onClick={handleLogin} className='cursor-pointer'>Login</Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col space-y-6 p-6 items-center">
            <Link href="/about" className="hover:text-gray-500">
              About
            </Link>
            <Link href="/blog" className="hover:text-gray-500">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-500">
              Contact
            </Link>
            <Button onClick={handleLogin} className='cursor-pointer'>Login</Button>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
