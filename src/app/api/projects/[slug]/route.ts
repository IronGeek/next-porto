import { mkdir, writeFile } from 'fs/promises';
import { dirname, extname, join, relative, resolve } from 'path';

import { RequestContext } from '@/lib/fetch';
import { deleteProjectBySlug, getProjectBySlug, updateProjectBySlug } from '@/services/projects'
import { ProjectSchema } from '@/models/projects/schema';

import type { NextRequest } from 'next/server';
import type { Project } from '@/models/projects/types';
import type { Writeable } from '@/models/types';

const saveThumbnail = async (slug: string, thumbFile: File | null, cwd: string = process.cwd()): Promise<string | null> => {
  if (!thumbFile) { return null }

  const name = thumbFile.name;
  const bytes = await thumbFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const target = resolve(cwd, `public/projects/${slug}/thumbnail${extname(name)}`);

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, buffer);

  return '/' + relative(join(cwd, 'public'), target);
}

const  GET = async (request: NextRequest, { params }: RequestContext<{ slug: string }>) => {
  const searchParams = request.nextUrl.searchParams;
  const includeMeta = searchParams.has('meta');

  const { slug } = await params;
  const project = await getProjectBySlug(slug, includeMeta);

  if (!project) { return Response.json(null, { status: 404 }) }

  return Response.json(project, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const  DELETE = async (request: NextRequest, { params }: RequestContext<{ slug: string }>) => {
  const { slug } = await params;
  const deleted = await deleteProjectBySlug(slug);

  if (!deleted) { return Response.json(null, { status: 404 }) }

  return Response.json(deleted, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const POST = async (request: NextRequest, { params }: RequestContext<{ slug: string }>) => {
  const contentType = request.headers.get('Content-Type');
  const isFormData = /^multipart\/form-data/u.test(contentType);

  const { slug } = await params;

  let data: Writeable<Project>;

  if (isFormData) {
    const formData = await request.formData();

    try {
      data = JSON.parse(formData.get('data').toString());

      const thumbFile = formData.get('thumbnail') as File | null;
      const thumbnail = await saveThumbnail(slug, thumbFile);

      if (thumbnail) {
        data.thumbnail = thumbnail;
      }
    } catch(err) {
      return Response.json({ error: err }, { status: 400 });
    }
  } else {
    data = await request.json();
  }

  if (!data) { return Response.json({ error: 'invalid data' }, { status: 400 }) }

  const result = ProjectSchema.partial().safeParse(data);
  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }

  const updated = await updateProjectBySlug(slug, result.data);
  if (!updated) { return Response.json(null, { status: 404 }) }

  return Response.json(updated, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export { GET, DELETE, POST }
