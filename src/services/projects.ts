import { randomUUID } from 'crypto';

import { db } from '@/services/db';

import type { Writeable } from '@/models/types';
import type { Project, ProjectDbItem, ProjectMeta, ProjectMetaSlug, ProjectWithMeta } from '@/models/projects/types';

const buildInsertClause = <T extends object>(data: T, ...omit: string[]): string => {
  return Object
    .keys(data)
    .filter((key) => !omit.includes(key))
    .reduce<[string[], string[]]>((acc, key) => {
       acc[0].push(`"${key}"`);
       acc[1].push(`@${key}`);

       return acc;
    }, [[], []])
    .map((val) => `(${val.join(',')})`)
    .join(' VALUES ');
}

const createProject = async (project: Writeable<Project>): Promise<Project | null> => {
  if (!project) { return null }

  // +ensure we always inserting with an id
  project.id ||= randomUUID();

  const params = toProjectDbItem(project);
  const inserted = db.exec<Project, ProjectDbItem>(`INSERT INTO "projects" ${buildInsertClause(project)} RETURNING *`, params);

  return inserted;
}

const getProjects = async (): Promise<readonly Project[]> => {
  return db.all<Project>(`SELECT * FROM "projects";`);
}

const getProjectBySlug = async (slug: string, includeMeta?: boolean): Promise<ProjectWithMeta | null> => {
  if (!slug) { return null }

  const dbItem: ProjectDbItem = db.get(`SELECT * FROM "projects" WHERE slug = ?;`, [slug]);
  if (!dbItem) { return null }

  const project: ProjectWithMeta = fromProjectDbItem(dbItem);
  if (includeMeta) {
    const meta: Writeable<ProjectMeta> = { prev: null, next: null };

    const { prev, next } : ProjectMetaSlug  = db.get(`SELECT * FROM "projects_slug" WHERE slug = ?;`, [slug]) ;
    if (prev) {
      const prevDbItem: ProjectDbItem = db.get(`SELECT * FROM "projects" WHERE slug = ?;`, [prev]);

      if (prevDbItem) {
        meta.prev = fromProjectDbItem(prevDbItem);
      }
    }

    if (next) {
      const nextDbItem: ProjectDbItem = db.get(`SELECT * FROM "projects" WHERE slug = ?`, [next]);

      if (nextDbItem) {
        meta.next = fromProjectDbItem(nextDbItem);
      }
    }

    project.meta = meta;
  }

  return project;
}

const deleteProjectBySlug = async (slug: string): Promise<Project | null> => {
  if (!slug) { return null }

  const deleted = db.exec<Project, [string]>(`DELETE FROM "projects" WHERE slug = ? RETURNING *;`, [slug]);

  return deleted;
}

const buildSetClause = <T extends object>(data: T, ...omit: string[]): string => {
  const setClauses = Object
    .keys(data)
    .filter((key) => !omit.includes(key))
    .map((key) => `"${key}"=@${key}`);

  return setClauses.join(', ');
}

const updateProjectBySlug = async (slug: string, project: Partial<Project>): Promise<Project | null> => {
  if (!slug) { return null }

  const params = toProjectDbItem(project, slug);
  const updated = db.exec<Project, ProjectDbItem>(`UPDATE projects SET ${buildSetClause(project, 'id')} WHERE slug = @key RETURNING *;`, params);

  return updated;
}

const fromProjectDbItem = (dbItem: ProjectDbItem): Project => {
  return {
    id: dbItem.id || randomUUID(),
    name: dbItem.name,
    slug: dbItem.slug,
    description: dbItem.description,
    summary: dbItem.summary,
    role: dbItem.role,
    technologies: dbItem.technologies?.split(',').map((s) => s.trim()),
    images: dbItem.images?.split(',').map((s) => s.trim()),
    thumbnail: dbItem.thumbnail
  }
}

const toProjectDbItem = (project: Project | Partial<Project>, key?: string): ProjectDbItem => {
  return {
    key: key,
    id: project.id || randomUUID(),
    name: project.name,
    slug: project.slug,
    description: project.description,
    summary: project.summary,
    role: project.role,
    technologies: project.technologies?.join(', ') ?? null,
    images: project.images?.join(', ') ?? null,
    thumbnail: project.thumbnail
  }
}

export {
  createProject, getProjects, getProjectBySlug, deleteProjectBySlug, updateProjectBySlug,
  toProjectDbItem
};
