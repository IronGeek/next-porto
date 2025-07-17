import { NotFoundResponse } from '@/lib/fetch';
import { createProject, getProjects, projectSchema } from '@/lib/projects'

import { type NextRequest } from 'next/server';

const  GET = async (_request: NextRequest) => {
  const projects = await getProjects();

  return Response.json(projects, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = projectSchema.partial({ images: true }).safeParse(body);

  if (!result.success) {
    return Response.json(result.error.message, { status: 400 });
  }

  const created = await createProject(result.data);
  if (!created) { return NotFoundResponse }

  return Response.json(created, {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
      'Location': new URL(`/projects/${created.slug}`, request.url).toString()
    }
  });
}


export { GET, POST }
