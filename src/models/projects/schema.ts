import { z } from 'zod';

const ProjectSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string().optional(),

  description: z.string(),
  summary: z.string(),

  role: z.string(),
  technologies: z.array(z.string()),

  images: z.array(z.string()).optional(),
  thumbnail: z.string()
});

const ProjectWithMetaSchema = ProjectSchema.extend({
  meta: z.object({
    prev: ProjectSchema.or(z.null()),
    next: ProjectSchema.or(z.null())
  }).optional()
})

export { ProjectSchema, ProjectWithMetaSchema };
