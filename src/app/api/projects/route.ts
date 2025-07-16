import { createProject, getProjects, projectSchema } from '@/lib/data'

const  GET = async (request: Request) => {
  const projects = await getProjects();

  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const POST = async (request: Request) => {
  const body = await request.json();
  const result = projectSchema.omit({ thumbnail: true, images: true }).safeParse(body);

  if (!result.success) {
    return new Response(result.error.message, { status: 400 });
  }

  const created = await createProject(result.data);
  if (!created) { return new Response(null, { status: 404 }) }

  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}


export { GET, POST }
