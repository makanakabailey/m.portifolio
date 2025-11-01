import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Star } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      name: "Core Static Portfolio",
      price: "$300",
      priceZAR: "R1,890",
      description: "Perfect for professionals who need a clean, professional online presence",
      features: [
        "Home, About, Contact pages",
        "Mobile-responsive design",
        "Professional typography",
        "Contact form integration",
        "Basic SEO optimization",
        "30-day support included"
      ],
      popular: false
    },
    {
      name: "Dynamic Project Section",
      price: "$450",
      priceZAR: "R2,835",
      description: "Showcase your work with an interactive, filterable portfolio",
      features: [
        "Everything in Core Static",
        "Dynamic project gallery",
        "Advanced filtering system",
        "Project detail pages",
        "Image optimization",
        "Admin content management"
      ],
      popular: false
    },
    {
      name: "Custom Admin & Auth",
      price: "$600",
      priceZAR: "R3,780",
      description: "Full control over your content with secure admin access",
      features: [
        "Everything in Dynamic Section",
        "Secure admin authentication",
        "Content management system",
        "User role management",
        "Database integration",
        "Advanced security features"
      ],
      popular: false
    },
    {
      name: "Daily Post Feature",
      price: "$350",
      priceZAR: "R2,205",
      description: "Keep your audience engaged with automated content updates",
      features: [
        "Automated post rotation",
        "Media upload system",
        "Content scheduling",
        "Social media integration",
        "Analytics tracking",
        "Content moderation tools"
      ],
      popular: false
    },
    {
      name: "Complete Package",
      price: "$1,800",
      priceZAR: "R11,340",
      description: "Everything you need for a professional online presence",
      features: [
        "All features from above packages",
        "Custom design consultation",
        "Advanced SEO optimization",
        "Performance optimization",
        "Analytics setup",
        "3 months premium support",
        "Training & documentation",
        "Priority updates"
      ],
      popular: true
    }
  ];

  const addOns = [
    {
      name: "Deployment & Hosting Setup",
      price: "$100",
      priceZAR: "R630",
      description: "Complete deployment to Vercel with custom domain setup"
    },
    {
      name: "Advanced Analytics",
      price: "$200",
      priceZAR: "R1,260",
      description: "Google Analytics 4, conversion tracking, and custom dashboards"
    },
    {
      name: "E-commerce Integration",
      price: "$500",
      priceZAR: "R3,150",
      description: "Payment processing, inventory management, and order tracking"
    },
    {
      name: "Multi-language Support",
      price: "$300",
      priceZAR: "R1,890",
      description: "Internationalization with content management for multiple languages"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-display font-black mb-6">
              Services & Pricing
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional web development packages designed for creative professionals and growing businesses.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative p-6 card-rounded border-2 ${
                  service.popular
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background'
                } hover-lift`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-black">{service.price}</span>
                    <div className="text-sm text-muted-foreground">{service.priceZAR}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/estimate" className="block">
                  <Button 
                    className={`w-full pill ${
                      service.popular ? 'bg-primary text-primary-foreground' : ''
                    }`}
                    variant={service.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Add-on Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon, index) => (
                <div key={index} className="p-6 border border-border card-rounded hover-lift">
                  <h3 className="font-bold mb-2">{addon.name}</h3>
                  <div className="mb-3">
                    <span className="text-xl font-bold">{addon.price}</span>
                    <div className="text-sm text-muted-foreground">{addon.priceZAR}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Our Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-bold mb-2">Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  We understand your business, goals, and target audience
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-bold mb-2">Design</h3>
                <p className="text-sm text-muted-foreground">
                  Create wireframes and designs that align with your brand
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-bold mb-2">Develop</h3>
                <p className="text-sm text-muted-foreground">
                  Build your website with clean, optimized code
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-bold mb-2">Launch</h3>
                <p className="text-sm text-muted-foreground">
                  Deploy your site and provide ongoing support
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-bold mb-2">How long does a project take?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Most projects are completed within 2-4 weeks, depending on complexity and your response time for feedback.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Do you provide ongoing support?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Yes! All packages include 30 days of support, with extended support available for the Complete Package.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Can I update content myself?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  With our Dynamic and Admin packages, you'll have full control over your content through an easy-to-use admin panel.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">What if I need custom features?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We offer custom development services. Contact us to discuss your specific requirements and get a tailored quote.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-muted p-8 md:p-12 card-rounded">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get a free consultation and detailed estimate for your project. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estimate">
                <Button className="pill px-8 py-4">
                  Get Free Estimate
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="pill px-8 py-4">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}