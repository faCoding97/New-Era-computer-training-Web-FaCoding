import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(40),
  course_id: z.string().uuid(),
  preferred_date: z.string().optional().nullable(),
  message: z.string().trim().max(2000).optional().default('')
});

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().default(''),
  subject: z.string().trim().min(2).max(180),
  message: z.string().trim().min(5).max(3000)
});
