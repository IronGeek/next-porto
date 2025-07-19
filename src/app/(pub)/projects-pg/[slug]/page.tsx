import Link from 'next/link';
import { redirect } from 'next/navigation'

import { Main } from '@/components/main';
import { ProjectDetail, ProjectDetailSkeleton } from '@/components/project-detail';
import { ProjectNavigation, ProjectNavigationSkeleton } from '@/components/project-navigation';
import { CancelIcon, DeleteIcon, EditIcon } from '@/ui/icons';

import type { Project } from '@/models/projects/types';
import postgres from 'postgres';
import { Suspense } from 'react';
import { DeleteButton } from './delete';

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

const ProjectPage = async ({ params }) => {
  const { slug } = await params;

  const data = await getProject(Array.isArray(slug) ? slug.join('/') : slug);

  const handleDelete = async () => {
    'use server';

    const sql = postgres(process.env.POSTGRES_DB_URL);
    const result = await sql`DELETE FROM projects WHERE slug = ${slug} RETURNING *;`;

    if (result) {
    // TODO: raise notification project is deleted
    console.log(`project deleted`);

    redirect(`/projects-pg`);
  } else {
    // TODO: raise notification project deletion failed
    console.log(`project deletion failed`, slug);
  }
  };

  return (
    <Main
      actions={(
      data
        ? <div>
          <DeleteButton handleDelete={handleDelete} />
          <Link href={`/projects-pg/${slug}/edit`} className="button primary"><EditIcon size="1.1em" /> Edit</Link>
          <Link href="/projects-pg" className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
        </div>
        : null
      )}>
      <Suspense fallback={
        <div>
          <ProjectDetailSkeleton />
          <ProjectNavigationSkeleton />
        </div>
      }>
        <div>
          <ProjectDetail data={data} />
          <ProjectNavigation data={data} />
        </div>
      </Suspense>
    </Main>
  )
}

export default ProjectPage;
