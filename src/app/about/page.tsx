import Navigation from "@/components/Navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-display font-black mb-6">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We're passionate about creating digital experiences that drive real business results.
            </p>
          </div>

          {/* Profile Section */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
            <div>
              <div className="relative">
                <Image
                  src="/assets/past-forward-2020s.jpg"
                  alt="Mkanaka Bailey - Web Developer & Designer"
                  width={500}
                  height={600}
                  className="w-full card-rounded object-cover"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Hi, I'm Mkanaka Bailey
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Since 2024, I've been helping creative professionals and businesses transform their online presence through strategic web design and development.
                </p>
                <p>
                  My approach combines technical expertise with business strategy to create websites that don't just look great—they generate leads, build trust, and drive conversions.
                </p>
                <p>
                  I specialize in working with architects, designers, consultants, and agencies who need more than just a website. They need a digital platform that showcases their expertise and attracts their ideal clients.
                </p>
              </div>
              
              <div className="mt-8">
                <Link href="/estimate">
                  <Button className="pill px-8 py-4">
                    Let's Work Together
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Our Philosophy
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Strategy First</h3>
                <p className="text-muted-foreground">
                  Every project starts with understanding your business goals and target audience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Design with Purpose</h3>
                <p className="text-muted-foreground">
                  Beautiful design that serves a function—every element has a reason for being there.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Measure Results</h3>
                <p className="text-muted-foreground">
                  We track what matters—leads, conversions, and business growth.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-muted p-8 md:p-12 card-rounded mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Since 2024
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-black mb-2">50+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black mb-2">95%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black mb-2">24h</div>
                <div className="text-muted-foreground">Average Response Time</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black mb-2">100%</div>
                <div className="text-muted-foreground">Mobile Responsive</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              What We Do Best
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>React & Next.js</span>
                    <span className="text-sm text-muted-foreground">Expert</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>UI/UX Design</span>
                    <span className="text-sm text-muted-foreground">Expert</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Full-Stack Development</span>
                    <span className="text-sm text-muted-foreground">Advanced</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SEO & Performance</span>
                    <span className="text-sm text-muted-foreground">Advanced</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Industries</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Architecture & Design</span>
                    <span className="text-sm text-muted-foreground">Specialist</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Business Consulting</span>
                    <span className="text-sm text-muted-foreground">Specialist</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Creative Agencies</span>
                    <span className="text-sm text-muted-foreground">Experienced</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Healthcare & Professional Services</span>
                    <span className="text-sm text-muted-foreground">Experienced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss your project and see how we can help you achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estimate">
                <Button className="pill px-8 py-4">
                  Get Free Estimate
                </Button>
              </Link>
              <Link href="/cases">
                <Button variant="outline" className="pill px-8 py-4">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}