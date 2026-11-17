import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.md' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string(),
    role: z.string(),
    status: z.enum(['Delivered', 'Case study', 'Published', 'Completed']),
    year: z.string(),
    featured: z.boolean(),
    problem: z.string(),
    produced: z.string(),
    result: z.string(),
    titleUrl: z.url().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
  }),
});

export const collections = { projects };
