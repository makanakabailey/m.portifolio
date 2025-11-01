import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MessageSquare, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-display font-black mb-6">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your project? Let's discuss how we can help bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Let's Connect</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground mb-2">
                      For project inquiries and general questions
                    </p>
                    <a 
                      href="mailto:mkanakabailey@gmail.com" 
                      className="text-primary hover:underline font-medium"
                    >
                      mkanakabailey@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground mb-2">
                      Quick questions and project updates
                    </p>
                    <a 
                      href="https://wa.me/263788839065" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      +263 78 883 9065
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Response Time</h3>
                    <p className="text-muted-foreground">
                      We typically respond within 24-48 hours during business days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Based in Zimbabwe, serving clients worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Services Quick Links */}
              <div className="bg-muted p-6 card-rounded">
                <h3 className="font-bold mb-4">Popular Services</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Core Static Portfolio</span>
                    <span className="text-sm font-medium">$300</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dynamic Project Section</span>
                    <span className="text-sm font-medium">$450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Complete Package</span>
                    <span className="text-sm font-medium">$1,800</span>
                  </div>
                </div>
                <Link href="/services" className="block mt-4">
                  <Button variant="outline" className="w-full pill">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Options */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Choose Your Preferred Method</h2>
              
              <div className="space-y-6">
                {/* Estimate Form */}
                <div className="p-6 border border-border card-rounded hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">Get a Detailed Estimate</h3>
                      <p className="text-muted-foreground mb-4">
                        Fill out our project form to receive a comprehensive estimate with timeline and pricing.
                      </p>
                      <Link href="/estimate">
                        <Button className="pill">
                          Get Free Estimate
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Direct Email */}
                <div className="p-6 border border-border card-rounded hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">Send Direct Email</h3>
                      <p className="text-muted-foreground mb-4">
                        Have specific questions or want to discuss your project in detail? Send us an email.
                      </p>
                      <a href="mailto:mkanakabailey@gmail.com">
                        <Button variant="outline" className="pill">
                          Send Email
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-6 border border-border card-rounded hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">WhatsApp Chat</h3>
                      <p className="text-muted-foreground mb-4">
                        Need quick answers or want to discuss your project informally? Message us on WhatsApp.
                      </p>
                      <a 
                        href="https://wa.me/263788839065" 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="pill">
                          Start WhatsApp Chat
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-8 p-6 bg-muted card-rounded">
                <h3 className="font-bold mb-4">Quick Answers</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-1">How much does a website cost?</p>
                    <p className="text-muted-foreground">Our packages range from $300 to $1,800 depending on features and complexity.</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">How long does it take?</p>
                    <p className="text-muted-foreground">Most projects are completed within 2-4 weeks from start to finish.</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Do you work internationally?</p>
                    <p className="text-muted-foreground">Yes! We work with clients worldwide and handle all communication remotely.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the growing number of professionals who trust us with their online presence.
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