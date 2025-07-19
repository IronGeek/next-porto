import { projects } from '@/models/projects';

import type { Project, ProjectWithMeta } from '@/models/projects/types';

const createProject = async (project: Project): Promise<Project | null> => {
  if (!project) { return null }

  projects.push(project);

  return project;
}

const getProjects = async (): Promise<readonly Project[]> => {
  return [...projects];
}

const getProjectBySlug = async (slug: string, includeMeta?: boolean): Promise<ProjectWithMeta | null> => {
  const current: ProjectWithMeta = projects.find((p) => p.slug === slug);
  if (!current) { return null }

  let meta = undefined;
  if (includeMeta) {
    const index = projects.indexOf(current);
    const prev = index > 0 ? projects[index - 1] : null;
    const next = index < projects.length -1 ? projects[index + 1] : null;

    meta = {
      prev: prev && {...prev},
      next: next && {...next}
    };
  }

  return { ...current, meta };
}

const deleteProjectBySlug = async (slug: string): Promise<Project | null> => {
  const project: Project = projects.find((p) => p.slug === slug);
  if (!project) { return null }

  projects.splice(projects.indexOf(project), 1);

  return project;
}


const updateProjectBySlug = async (slug: string, updates: Partial<Project>): Promise<Project | null> => {
  const project: Project = projects.find((p) => p.slug === slug);
  if (!project) { return null }

  const index = projects.indexOf(project);
  const updated = { ...project, ...updates, id: project.id }

  projects[index] = updated;

  return updated;
}

export { createProject, getProjects, getProjectBySlug, deleteProjectBySlug, updateProjectBySlug };
