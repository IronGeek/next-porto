import { createProject, getProjects } from '@/services/projects'
import { ProjectSchema } from '@/models/projects/schema'

import type { NextRequest } from 'next/server';

const  GET = async (_request: NextRequest) => {
  try {
    const projects = await getProjects();

    return Response.json(projects, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const result = ProjectSchema.partial({ thumbnail: true, images: true }).safeParse(body);

    if (!result.success) {
      return Response.json(result.error.message, { status: 400 });
    }

    const created = await createProject(result.data);
    if (!created) { return Response.json(null, { status: 400 }) }

    return Response.json(created, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Location': new URL(`/projects/${created.slug}`, request.url).toString()
      }
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}


export { GET, POST }
