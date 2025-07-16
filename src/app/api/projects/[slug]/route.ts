import { deleteProjectBySlug, getProjectBySlug, projectSchema, updateProjectBySlug } from '@/lib/data'

interface Options {
  params: Promise<{ slug: string }>
}

const  GET = async (request: Request, { params }: Options) => {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) { return new Response(null, { status: 404 }) }

  return new Response(JSON.stringify(project), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const  DELETE = async (request: Request, { params }: Options) => {
  const { slug } = await params;
  const deleted = await deleteProjectBySlug(slug);

  if (!deleted) { return new Response(null, { status: 404 }) }

  return new Response(JSON.stringify(deleted), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const POST = async (request: Request, { params }: Options) => {
  const { slug } = await params;
  const body = await request.json();
  const result = projectSchema.partial().safeParse(body);

  if (!result.success) {
    return new Response(result.error.message, { status: 400 });
  }

  const updated = await updateProjectBySlug(slug, result.data);
  if (!updated) { return new Response(null, { status: 404 }) }

  return new Response(JSON.stringify(updated), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export { GET, DELETE, POST }
