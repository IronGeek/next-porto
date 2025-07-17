'use client';

import useSWR from 'swr';
import Link from 'next/link';

import { Main } from '@/components/main';
import { ProjectList, ProjectListSkeleton } from '@/components/project-list';
import { getProjectsEndpoint, Project } from '@/lib/projects';
import { PlusIcon } from '@/ui/icons';
import { fetcher } from '@/lib/fetch';

const ProjectsPage = () => {
  const { data, error, isLoading } = useSWR(getProjectsEndpoint(), fetcher.json<readonly Project[]>);

  return (
    <Main
      title="My Projects"
      actions={(
        <div>
          <Link href="/projects/create" className="button primary"><PlusIcon size="1.1em" /> New Project</Link>
        </div>
      )}
    >
      <div className="flex self-center">
        { error
          ? <div>Failed to load project data: {error.toString()}</div>
          : isLoading
            ? <ProjectListSkeleton
                className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" />
            : <ProjectList
                className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                data={data} />
        }
      </div>
    </Main>
  )
};

export default ProjectsPage;
