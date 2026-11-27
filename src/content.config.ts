import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.md' }),
  schema: ({ image }) => z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string(),
    role: z.string(),
    status: z.enum(['Delivered', 'Case study', 'Course project', 'Published', 'Completed']),
    year: z.string(),
    featured: z.boolean(),
    problem: z.string(),
    produced: z.string(),
    result: z.string(),
    cardImage: z.object({ src: image(), alt: z.string() }).optional(),
    heroSummary: z.object({
      context: z.string(),
      domain: z.string(),
      focus: z.string(),
      primaryUser: z.string(),
      activities: z.string(),
    }).optional(),
    caseSections: z.array(z.object({
      id: z.string(),
      title: z.string(),
      pdfPage: z.number(),
      paragraphs: z.array(z.string()),
      bullets: z.array(z.string()).optional(),
      visuals: z.array(z.enum(['initial-leave-request', 'initial-attendance', 'proposed-leave-request', 'proposed-attendance', 'wireframe-base', 'wireframe-annotated'])).optional(),
    })).optional(),
    useCase: z.object({
      id: z.string(),
      title: z.string(),
      question: z.array(z.object({ text: z.string(), highlight: z.boolean().optional() })),
      problem: z.string(),
      approach: z.array(z.string()),
      steps: z.array(z.object({
        title: z.string(),
        description: z.string(),
        visuals: z.array(z.object({
          src: image(),
          continuation: image().optional(),
          alt: z.string(),
          continuationAlt: z.string().optional(),
        })),
      })),
      safeguards: z.array(z.string()),
      scopeNote: z.string(),
    }).optional(),
    titleUrl: z.url().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
    images: z.array(z.object({
      src: image(),
      alt: z.string(),
      caption: z.string(),
      kind: z.enum(['diagram', 'screen']).default('screen'),
    })).optional(),
  }),
});

export const collections = { projects };
