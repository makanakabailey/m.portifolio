import { z } from 'zod';

// Daily Posts Validation
export const dailyPostSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim(),
  mediaUrl: z.string()
    .url('Please provide a valid URL')
    .optional()
    .or(z.literal('')),
  mediaType: z.enum(['image', 'video', 'gif'])
    .optional(),
  order: z.number()
    .min(0, 'Order must be 0 or greater')
    .max(3, 'Maximum 4 posts allowed (0-3)')
    .int('Order must be a whole number'),
  isActive: z.boolean()
});

// Case Studies Validation
export const caseStudySchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .trim(),
  tags: z.array(z.string().min(1).max(50))
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),
  industry: z.string()
    .min(2, 'Industry must be at least 2 characters')
    .max(50, 'Industry must be less than 50 characters')
    .trim(),
  projectType: z.string()
    .min(2, 'Project type must be at least 2 characters')
    .max(50, 'Project type must be less than 50 characters')
    .trim(),
  companyType: z.string()
    .min(2, 'Company type must be at least 2 characters')
    .max(50, 'Company type must be less than 50 characters')
    .trim(),
  services: z.array(z.string().min(1).max(50))
    .min(1, 'At least one service is required')
    .max(10, 'Maximum 10 services allowed'),
  thumbnailUrl: z.string()
    .url('Please provide a valid thumbnail URL')
    .or(z.string().startsWith('/assets/', 'Thumbnail must be a valid URL or asset path')),
  detailImages: z.array(z.string().url().or(z.string().startsWith('/assets/')))
    .max(10, 'Maximum 10 detail images allowed'),
  order: z.number()
    .min(0, 'Order must be 0 or greater')
    .int('Order must be a whole number'),
  isPublished: z.boolean()
});

// File Upload Validation
export const fileUploadSchema = z.object({
  file: z.any()
    .refine((file) => file instanceof File, 'Please select a file')
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'].includes(file.type),
      'File must be an image (JPEG, PNG, GIF, WebP) or video (MP4, WebM)'
    )
});

// Admin PIN Validation
export const adminPinSchema = z.object({
  pin: z.string()
    .length(4, 'PIN must be exactly 4 digits')
    .regex(/^\d{4}$/, 'PIN must contain only numbers')
});

// Contact Form Validation (Enhanced)
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number')
    .trim(),
  service: z.string()
    .max(100, 'Service selection must be less than 100 characters')
    .optional(),
  message: z.string()
    .max(2000, 'Message must be less than 2000 characters')
    .optional()
});

// Rate Limiting Schema
export const rateLimitSchema = z.object({
  ip: z.string().min(1),
  endpoint: z.string(),
  timestamp: z.date()
});

// Sanitization helpers
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .toLowerCase();
};