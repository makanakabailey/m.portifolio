'use client';

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  description: string;
  thumbnailUrl: string;
  industry: string;
  projectType: string;
  services: string[];
  isPublished: boolean;
}

// Static fallback data (from original implementation)
const staticCases: CaseStudy[] = [
  {
    _id: "1",
    title: "Authority Builder - Business Consultant Portfolio",
    slug: "authority-builder",
    tags: ["Copywriting", "Lead Generation", "Trust Building"],
    description: "A comprehensive business consultant portfolio designed to establish authority and generate high-quality leads.",
    thumbnailUrl: "/assets/case-authority-builder.jpg",
    industry: "Business Consulting",
    projectType: "Portfolio Website",
    services: ["Web Design", "Copywriting", "SEO"],
    isPublished: true,
  },
  {
    _id: "2",
    title: "Architect Portfolio - Visual Storytelling",
    slug: "architect-portfolio",
    tags: ["Visual Design", "UX", "Architecture"],
    description: "A stunning visual portfolio showcasing architectural projects with immersive storytelling.",
    thumbnailUrl: "/assets/case-architect-portfolio.jpg",
    industry: "Architecture",
    projectType: "Portfolio Website",
    services: ["Web Design", "Visual Design", "UX"],
    isPublished: true,
  },
  {
    _id: "3",
    title: "Marketing Agency - Results Machine",
    slug: "marketing-agency",
    tags: ["ROI", "Analytics", "B2B"],
    description: "A data-driven marketing agency website focused on demonstrating ROI and client results.",
    thumbnailUrl: "/assets/case-marketing-agency.jpg",
    industry: "Marketing",
    projectType: "Agency Website",
    services: ["Web Development", "Analytics", "Dashboard"],
    isPublished: true,
  },
];

export default function CasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>(staticCases);
  const [filteredCases, setFilteredCases] = useState<CaseStudy[]>(staticCases);
  const [loading, setLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  // Fetch cases from API (with fallback to static data)
  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/cases');
        if (response.ok) {
          const apiCases = await response.json();
          if (apiCases.length > 0) {
            console.log('✅ Loaded cases from database:', apiCases.length);
            setCases(apiCases);
            setFilteredCases(apiCases);
          } else {
            console.log('ℹ️ No cases in database, using static data');
          }
        } else {
          console.log('⚠️ API failed, using static data');
        }
      } catch (error) {
        console.error('Failed to fetch cases from API, using static data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Filter cases based on selected filters
  useEffect(() => {
    let filtered = cases;

    if (selectedIndustry !== "All") {
      filtered = filtered.filter(c => c.industry === selectedIndustry);
    }

    if (selectedTag !== "All") {
      filtered = filtered.filter(c => c.tags.includes(selectedTag));
    }

    setFilteredCases(filtered);
  }, [cases, selectedIndustry, selectedTag]);

  const industries = ["All", ...Array.from(new Set(cases.map(c => c.industry)))];
  const tags = ["All", ...Array.from(new Set(cases.flatMap(c => c.tags)))];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-display font-black mb-6">
              Case Studies
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Real projects, real results. See how we've helped businesses transform their online presence.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 md:mb-12 justify-center">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground">Industry:</span>
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? "default" : "outline"}
                  size="sm"
                  className="pill"
                  onClick={() => setSelectedIndustry(industry)}
                >
                  {industry}
                </Button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              {tags.slice(0, 6).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  className="pill"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Cases Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading cases...</p>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No cases found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedIndustry("All");
                  setSelectedTag("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCases.map((caseStudy) => (
                <Link key={caseStudy._id} href={`/cases/${caseStudy.slug}`}>
                  <div className="group cursor-pointer hover-lift">
                    <div className="relative overflow-hidden card-rounded mb-4">
                      <Image
                        src={caseStudy.thumbnailUrl}
                        alt={caseStudy.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {caseStudy.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {caseStudy.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {caseStudy.industry}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        View Case →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to create your success story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link href="/estimate">
              <Button className="pill px-8 py-4 text-lg">
                Get Your Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}