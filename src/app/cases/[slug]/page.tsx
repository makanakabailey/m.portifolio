import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  description: string;
  thumbnailUrl: string;
  detailImages: string[];
  industry: string;
  projectType: string;
  companyType: string;
  services: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Static fallback data for development
const staticCases: Record<string, CaseStudy> = {
  'authority-builder': {
    _id: "1",
    title: "Authority Builder - Business Consultant Portfolio",
    slug: "authority-builder",
    tags: ["Copywriting", "Lead Generation", "Trust Building"],
    description: "A comprehensive business consultant portfolio designed to establish authority and generate high-quality leads through strategic copywriting and trust-building elements.",
    thumbnailUrl: "/assets/case-authority-builder.jpg",
    detailImages: [
      "/assets/detail-authority-1.jpg",
      "/assets/detail-authority-2.jpg",
      "/assets/detail-authority-3.jpg",
      "/assets/detail-authority-4.jpg",
      "/assets/detail-authority-5.jpg",
      "/assets/detail-authority-6.jpg"
    ],
    industry: "Business Consulting",
    projectType: "Portfolio Website",
    companyType: "Independent Consultant",
    services: ["Web Design", "Copywriting", "SEO", "Lead Generation"],
    isPublished: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  'architect-portfolio': {
    _id: "2",
    title: "Architect Portfolio - Visual Storytelling",
    slug: "architect-portfolio",
    tags: ["Visual Design", "UX", "Architecture"],
    description: "A stunning visual portfolio showcasing architectural projects with immersive storytelling and interactive project galleries.",
    thumbnailUrl: "/assets/case-architect-portfolio.jpg",
    detailImages: [
      "/assets/detail-architect-1.jpg",
      "/assets/detail-architect-2.jpg",
      "/assets/detail-architect-3.jpg",
      "/assets/detail-architect-4.jpg",
      "/assets/detail-architect-5.jpg",
      "/assets/detail-architect-6.jpg"
    ],
    industry: "Architecture",
    projectType: "Portfolio Website",
    companyType: "Architecture Firm",
    services: ["Web Design", "Visual Design", "UX", "Photography Integration"],
    isPublished: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  'marketing-agency': {
    _id: "3",
    title: "Marketing Agency - Results Machine",
    slug: "marketing-agency",
    tags: ["ROI", "Analytics", "B2B"],
    description: "A data-driven marketing agency website focused on demonstrating ROI and client results through interactive dashboards and case studies.",
    thumbnailUrl: "/assets/case-marketing-agency.jpg",
    detailImages: [
      "/assets/detail-marketing-1.jpg",
      "/assets/detail-marketing-2.jpg",
      "/assets/detail-marketing-3.jpg",
      "/assets/detail-marketing-4.jpg",
      "/assets/detail-marketing-5.jpg",
      "/assets/detail-marketing-6.jpg"
    ],
    industry: "Marketing",
    projectType: "Agency Website",
    companyType: "Marketing Agency",
    services: ["Web Development", "Analytics", "Dashboard", "CRM Integration"],
    isPublished: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
};

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  // For now, use static data directly to avoid API issues
  return staticCases[slug] || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = staticCases[slug];
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }
  
  return {
    title: `${caseStudy.title} | Mkanaka Bailey Portfolio`,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      images: [caseStudy.thumbnailUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  
  if (!caseStudy) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/cases">
            <Button variant="outline" className="mb-8 pill">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cases
            </Button>
          </Link>
          
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-black mb-4">{caseStudy.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">{caseStudy.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {caseStudy.tags.map((tag, index) => (
                <span key={index} className="pill bg-secondary text-secondary-foreground px-4 py-2 text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Industry:</span> {caseStudy.industry}
              </div>
              <div>
                <span className="font-medium">Project Type:</span> {caseStudy.projectType}
              </div>
              <div>
                <span className="font-medium">Company Type:</span> {caseStudy.companyType}
              </div>
            </div>
          </div>
          
          {/* Main Image */}
          <div className="mb-8 md:mb-12">
            <Image
              src={caseStudy.thumbnailUrl}
              alt={caseStudy.title}
              width={1200}
              height={800}
              className="w-full card-rounded object-cover"
            />
          </div>
          
          {/* Detail Images Grid */}
          {caseStudy.detailImages.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {caseStudy.detailImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${caseStudy.title} detail ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full card-rounded object-cover"
                />
              ))}
            </div>
          )}
          
          {/* Services */}
          {caseStudy.services.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Services Provided</h2>
              <div className="flex flex-wrap gap-2">
                {caseStudy.services.map((service, index) => (
                  <span key={index} className="pill bg-primary text-primary-foreground px-4 py-2">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Project Highlights */}
          <div className="mb-12 bg-muted p-8 card-rounded">
            <h2 className="text-2xl font-bold mb-6">Project Highlights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-3">Challenge</h3>
                <p className="text-muted-foreground">
                  The client needed a professional online presence that would establish credibility 
                  and generate qualified leads in a competitive market.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-3">Solution</h3>
                <p className="text-muted-foreground">
                  We created a strategic website that combines compelling copywriting with 
                  professional design to build trust and drive conversions.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-3">Results</h3>
                <p className="text-muted-foreground">
                  The new website increased lead generation by 150% and improved client 
                  perception of the business significantly.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-3">Timeline</h3>
                <p className="text-muted-foreground">
                  Project completed in 3 weeks from initial consultation to final launch, 
                  including content creation and testing.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your project?</h2>
            <p className="text-muted-foreground mb-6">Let's discuss how we can bring your vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estimate">
                <Button size="lg" className="pill">
                  Get Your Estimate
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/cases">
                <Button variant="outline" size="lg" className="pill">
                  View More Cases
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}