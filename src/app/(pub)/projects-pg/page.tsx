import postgres from 'postgres';
import Link from 'next/link';

import { Main } from '@/components/main';
import { ProjectList, ProjectListSkeleton } from '@/components/project-list';
import { PlusIcon } from '@/ui/icons';

import type { Project } from '@/models/projects/types';
import { Suspense } from 'react';

const getProjects = async (): Promise<Project[]> => {
  const sql = postgres(process.env.POSTGRES_DB_URL);
  const response = await sql`SELECT * FROM projects ORDER by NAME`;

  return response.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    summary: row.summary,
    role: row.role,
    thumbnail: row.thumbnail,
    technologies: row.technologies?.split(',').map((s) => s.trim()),
    images: row.images?.split(',').map((s) => s.trim())
  }));
}

const ProjectsPage = async () => {
  const data = await getProjects();

  return (
    <Main
      title="My Projects"
      actions={(
        <div>
          <Link href="/projects-pg/create" className="button primary"><PlusIcon size="1.1em" /> New Project</Link>
        </div>
      )}
    >
      <div className="flex self-center">
        <Suspense
          fallback={
            <ProjectListSkeleton className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" />
          }
        >
          <ProjectList
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            data={data}
            urlPrefix="/projects-pg/" />
        </Suspense>
      </div>
    </Main>
  )
};

export default ProjectsPage;
