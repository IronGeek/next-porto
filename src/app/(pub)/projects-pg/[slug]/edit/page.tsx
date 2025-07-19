
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Main } from '@/components/main';
import { ProjectForm } from '@/components/project-form';
import { SaveIcon, CancelIcon } from '@/ui/icons';
import { ProjectSchema } from '@/models/projects/schema';

import type { Project } from '@/models/projects/types';
import postgres from 'postgres';

const getProject = async (slug: string): Promise<Project> => {
  const sql = postgres(process.env.POSTGRES_DB_URL);
  const response = await sql`SELECT * FROM projects WHERE slug = ${slug} ORDER by NAME`;
  const row = response[0];

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    summary: row.summary,
    role: row.role,
    thumbnail: row.thumbnail,
    technologies: row.technologies?.split(',').map((s) => s.trim()),
    images: row.images?.split(',').map((s) => s.trim())
  };
}


const submitForm = async (slug: string, formData: FormData): Promise<Project> => {
  const sql = postgres(process.env.POSTGRES_DB_URL);

  const entity = {
    name: formData.get('name').toString(),
    slug: formData.get('slug').toString(),
    description: formData.get('description').toString(),
    role: formData.get('role').toString(),
    summary: formData.get('summary').toString(),
    technologies: formData.get('technologies').toString().split(',').map((s) => s.trim()),
  };

  const { error, success, data: project } = await ProjectSchema.partial().safeParseAsync(entity);

  if (success) {
    try {
      const response = await sql`
        UPDATE projects SET
          name=${project.name},
          slug=${project.slug},
          description=${project.description},
          summary=${project.summary},
          role=${project.role},
          technologies=${project.technologies.join(', ')}
        WHERE slug = ${slug}
        RETURNING *;
      `;

      return response[0] as Project;
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  } else {
    console.error('Form submission failed:', error);
  }
}

const ProjectEditPage = async ({ params }) => {
  const { slug } = await params
  const project = await getProject(slug);

  async function update(formData: FormData) {
    'use server';

    const project = await submitForm(slug, formData);

    if (project) { redirect(`/projects-pg/${project.slug}`) }
  }

  return (
    <Main>
  <ProjectForm
        title={`Edit Project (${project?.name})`}
        action={update}
        actions={(
          <>
            <button type="submit" className="button primary"><SaveIcon size="1.1em" /> Save</button>
            <Link href={`/projects/${slug}`} className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
          </>
        )}
        data={project}
        bordered />
    </Main>
  )
}

export default ProjectEditPage;
