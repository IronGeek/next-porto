import { z } from 'zod';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

import type { Fetcher } from 'swr';

const fetcher = <T>(type: 'json' | 'blob'): Fetcher<T> => {
  return async <T>(url: string): Promise<T | undefined> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response[type]() as T
  }
};

const dispatcher = <T>(method: string) => {
  return async (url: string, { arg }: { arg: T }): Promise<void> => {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    });
  }
};


const projectSchema = z.object({
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

const getApiURL = (slug?: string): string => slug ? `/api/projects/${slug}` : `/api/projects`;

const getProjects = async (): Promise<readonly Project[]> => {
  return [...projects];
}

interface ProjectWithMeta extends Project {
  meta? : {
    prev: Project | null
    next: Project | null
  }
}

const getProjectBySlug = async (slug: string): Promise<ProjectWithMeta | null> => {
  const current: ProjectWithMeta = projects.find((p) => p.slug === slug);
  if (!current) { return null }

  const index = projects.indexOf(current);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length -1 ? projects[index + 1] : null

  return {
    ...current,
    meta: {
      prev: prev && {...prev},
      next: next && {...next}
    }
  };
}

const deleteProjectBySlug = async (slug: string): Promise<Project | null> => {
  const project: Project = projects.find((p) => p.slug === slug);
  if (!project) { return null }

  projects.splice(projects.indexOf(project), 1);

  return project;
}

const createProject = async (project: Omit<Project, 'thumbnail' | 'images'>): Promise<Project | null> => {
  if (!project) { return null }

  projects.push(project as Project);

  return project as Project;
}

const updateProjectBySlug = async (slug: string, updates: Partial<Project>): Promise<Project | null> => {
  const project: Project = projects.find((p) => p.slug === slug);
  if (!project) { return null }

  const index = projects.indexOf(project);
  projects[index] = { ...project, ...updates, id: project.id };

  return project;
}

export { projectSchema, dispatcher, fetcher, getApiURL, createProject, getProjects, deleteProjectBySlug, getProjectBySlug, updateProjectBySlug };
export type { Project, ProjectWithMeta }
