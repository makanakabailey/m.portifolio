import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/estimate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
  
  // Dynamic case study pages (when database is connected)
  try {
    const response = await fetch(`${baseUrl}/api/cases`);
    if (response.ok) {
      const cases = await response.json();
      
      const casePages = cases.map((caseStudy: any) => {
        const dateString = caseStudy.updatedAt || caseStudy.createdAt || caseStudy.date;
        const lastModified = dateString ? new Date(dateString) : new Date();
        
        return {
          url: `${baseUrl}/cases/${caseStudy.slug}`,
          lastModified: isNaN(lastModified.getTime()) ? new Date() : lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      });
      
      return [...staticPages, ...casePages];
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
  
  return staticPages;
}