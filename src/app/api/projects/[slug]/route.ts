import { NotFoundResponse, RequestContext } from '@/lib/fetch';
import { deleteProjectBySlug, getProjectBySlug, projectSchema, updateProjectBySlug } from '@/lib/projects'

import type { NextRequest } from 'next/server';

const  GET = async (request: NextRequest, { params }: RequestContext<{ slug: string }>) => {
  const searchParams = request.nextUrl.searchParams;
  const includeMeta = searchParams.has('meta');

  const { slug } = await params;
  const project = await getProjectBySlug(slug, includeMeta);

  if (!project) { return NotFoundResponse }

  return Response.json(project, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const  DELETE = async (request: NextRequest, { params }: RequestContext<{ slug: string }>) => {
  const { slug } = await params;
  const deleted = await deleteProjectBySlug(slug);

  if (!deleted) { return NotFoundResponse }

  return Response.json(deleted, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const POST = async (request: NextRequest, { params }: RequestContext<{ slug: string }>) => {
  const { slug } = await params;
  const body = await request.json();
  const result = projectSchema.partial().safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }

  const updated = await updateProjectBySlug(slug, result.data);
  if (!updated) { return NotFoundResponse }

  return Response.json(updated, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export { GET, DELETE, POST }
