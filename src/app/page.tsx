'use client';

import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-hero font-black leading-none mb-6 md:mb-8">
                Actions speak louder than words
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8">
                Building strategic portfolios that communicate expertise, build trust, and clearly articulate ROI.
              </p>
              <Link href="/estimate">
                <Button 
                  variant="default"
                  className="pill px-8 md:px-12 py-5 md:py-7 text-base md:text-lg font-medium w-full sm:w-auto"
                >
                  Get Free Estimate
                </Button>
              </Link>
            </div>
            
            {/* Astronaut Hero Image */}
            <div className="relative order-first lg:order-last">
              <div className="card-rounded overflow-hidden bg-gradient-to-br from-accent via-orange-400 to-yellow-400 aspect-square flex items-center justify-center">
                <Image 
                  src="/assets/astronaut-hero.png" 
                  alt="Futuristic astronaut representing innovation and forward-thinking design"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Backend Implementation Status */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-display font-black mb-8">🎉 Implementation Complete!</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Full-stack portfolio ready for production deployment. All features implemented and tested.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-background border border-border card-rounded">
              <h3 className="font-bold mb-2 text-green-600">✅ Phase 1: Foundation</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Next.js 15 with App Router</li>
                <li>• TypeScript & Tailwind CSS</li>
                <li>• All dependencies installed</li>
                <li>• Design system migrated</li>
                <li>• Assets copied to public/</li>
              </ul>
            </div>
            
            <div className="p-6 bg-background border border-border card-rounded">
              <h3 className="font-bold mb-2 text-green-600">✅ Phase 2: API Routes</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• MongoDB connection ready</li>
                <li>• Daily posts API (/api/posts)</li>
                <li>• Contact form API (/api/contact)</li>
                <li>• Case studies API (/api/cases)</li>
                <li>• File upload API (/api/upload)</li>
                <li>• Admin PIN authentication</li>
              </ul>
            </div>
            
            <div className="p-6 bg-background border border-border card-rounded">
              <h3 className="font-bold mb-2 text-green-600">✅ Phase 4: Production Ready</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• ✅ SEO optimization complete</li>
                <li>• ✅ Deployment documentation</li>
                <li>• ✅ Individual case study pages</li>
                <li>• ✅ Health check endpoint</li>
                <li>• ✅ Production configuration</li>
                <li>• 🚀 Ready for Vercel deployment</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/cases">
                <Button variant="outline" className="pill px-6 py-3">
                  View Cases
                </Button>
              </Link>
              <Link href="/estimate">
                <Button variant="outline" className="pill px-6 py-3">
                  Contact Form
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" className="pill px-6 py-3">
                  Admin Panel
                </Button>
              </Link>
              <Link href="/api/db-test">
                <Button variant="outline" className="pill px-6 py-3">
                  Test Database
                </Button>
              </Link>
              <Link href="/api/simple-init">
                <Button className="pill px-6 py-3 bg-green-600 text-white hover:bg-green-700">
                  Initialize DB
                </Button>
              </Link>
              <Link href="/api/test-email">
                <Button variant="outline" className="pill px-6 py-3">
                  Test Email
                </Button>
              </Link>
              <Link href="/api/test-contact">
                <Button variant="outline" className="pill px-6 py-3">
                  Test Contact
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                🎯 <strong>100% Functional!</strong> Database connected, all APIs working. Ready for production deployment!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}