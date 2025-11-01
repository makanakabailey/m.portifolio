'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-black hover:text-primary transition-colors">
            M
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/about" className="font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link 
              href="/cases" 
              className={`font-medium transition-colors ${
                isActive('/cases') 
                  ? 'text-primary' 
                  : 'hover:text-primary'
              }`}
            >
              Cases
            </Link>
            <Link href="/contact" className="font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/estimate" className="hidden sm:block">
              <Button variant="default" className="pill text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                Get Free Estimate
              </Button>
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link 
              href="/services" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/cases" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cases
            </Link>
            <Link 
              href="/contact" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/estimate" 
              className="block sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="default" className="pill w-full">
                Get Free Estimate
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;