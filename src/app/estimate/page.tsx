'use client';

import { useState, FormEvent } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function EstimatePage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    // Name validation
    if (!formData.name.trim()) {
      errors.push('Name is required');
    } else if (formData.name.length < 2) {
      errors.push('Name must be at least 2 characters');
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      errors.push('Phone number is required');
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,20}$/.test(formData.phone)) {
      errors.push('Please enter a valid phone number (10-20 digits)');
    }
    
    // Message length validation
    if (formData.message && formData.message.length > 2000) {
      errors.push('Message must be less than 2000 characters');
    }
    
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors.join('. '));
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: ""
      });
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - Info */}
            <div>
              <h1 className="text-3xl md:text-display font-black mb-6">
                Get Your Free Estimate
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Ready to transform your online presence? Let's discuss your project and provide you with a detailed estimate.
              </p>

              {/* Services List */}
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-3">Our Services</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Core Static Portfolio - $300</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Dynamic Project Section - $450</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Custom Admin & Auth - $600</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Daily Post Feature - $350</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Complete Package - $1,800</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">What You Get</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Professional design & development</li>
                    <li>• Mobile-responsive layout</li>
                    <li>• SEO optimization</li>
                    <li>• Fast loading speeds</li>
                    <li>• 30-day support included</li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Quick Response</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24-48 hours with a detailed estimate.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Direct Contact</h3>
                  <p className="text-muted-foreground">
                    Email: <a href="mailto:mkanakabailey@gmail.com" className="text-primary hover:underline">mkanakabailey@gmail.com</a>
                  </p>
                  <p className="text-muted-foreground">
                    WhatsApp: <a href="https://wa.me/263788839065" className="text-primary hover:underline">+263 78 883 9065</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className="bg-muted p-6 md:p-8 card-rounded">
                <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✅ Thank you! Your request has been submitted.</p>
                    <p className="text-green-700 text-sm mt-1">We'll get back to you within 24-48 hours.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">❌ {errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="mt-1 w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a service</option>
                      <option value="Core Static Portfolio">Core Static Portfolio - $300</option>
                      <option value="Dynamic Project Section">Dynamic Project Section - $450</option>
                      <option value="Custom Admin & Auth">Custom Admin & Auth - $600</option>
                      <option value="Daily Post Feature">Daily Post Feature - $350</option>
                      <option value="Complete Package">Complete Package - $1,800</option>
                      <option value="Custom Solution">Custom Solution</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full pill py-6 text-lg font-medium"
                  >
                    {isSubmitting ? 'Sending...' : 'Get Free Estimate'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}