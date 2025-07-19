import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Main } from '@/components/main';
import { SaveIcon, CancelIcon } from '@/ui/icons';

import { ProjectSchema } from '@/models/projects/schema';
import { ProjectForm } from '@/components/project-form';

import postgres from 'postgres';

import { randomUUID } from 'crypto';
import { Project } from '@/models/projects/types';

const submitForm = async (formData: FormData): Promise<Project> => {
  const sql = postgres(process.env.POSTGRES_DB_URL);

  const entity = {
    id: formData.get('id').toString(),
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
        INSERT INTO projects
          (id,name,slug,description,summary,role,technologies)
        VALUES
          (${randomUUID()},${project.name},${project.slug},${project.description},${project.summary},${project.role},${project.technologies})
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

const ProjectCreatePage = async () => {
  async function create(formData: FormData) {
    'use server';

    const project = await submitForm(formData);

    if (project) { redirect(`/projects-pg/${project.slug}`) }
  }

  return (
    <Main>
      <ProjectForm
        title="Create Project"
        action={create}
        actions={(
          <>
            <button type="submit" className="button primary"><SaveIcon size="1.1em" /> Save</button>
            <Link href="/projects" className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
          </>
        )}
        data={{ id: uuidv4() }}
        bordered  />
    </Main>
  )
}

export default ProjectCreatePage;
