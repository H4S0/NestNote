import { z } from 'zod';

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  description: z.string().min(1).max(150),
});

export const postSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(190),
  coverImage: z.string().min(1),
  smallDescripiton: z.string().min(1).max(200),
  status: z.enum(['NOT_STARTED', 'LEARNING', 'FINISHED']),
});
