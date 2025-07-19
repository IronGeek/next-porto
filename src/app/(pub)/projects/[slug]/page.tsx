"use client";

import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { notFound, redirect, useParams } from 'next/navigation'

import { Main } from '@/components/main';
import { Error } from '@/components/error';
import { ProjectDetail, ProjectDetailSkeleton } from '@/components/project-detail';
import { ProjectNavigation, ProjectNavigationSkeleton } from '@/components/project-navigation';
import { getApiEndpoint } from '@/models/projects';
import { CancelIcon, DeleteIcon, EditIcon } from '@/ui/icons';
import { fetcher, FetchError, fetchStrategy, revalidator } from '@/lib/fetch';

import type { ProjectWithMeta } from '@/models/projects/types';

const deleteProject = async (slug: string) => {
  const apiURL = getApiEndpoint(slug);
  const response = await fetch(apiURL, { method: 'DELETE' });

  if (response.ok) {
    const deleted = await response.json();

    // TODO: raise notification project is deleted
    console.log(`project deleted`, deleted);

    redirect(`/projects`);
  } else {
    // TODO: raise notification project deletion failed
    console.log(`project deletion failed`, slug);
  }
};

const ProjectPage = () => {
  const { slug } = useParams()
  const apiURL = getApiEndpoint(slug);
  const { data, error, isLoading } = useSWR(
    [apiURL, { meta: true }],
    fetcher.json<ProjectWithMeta>,
    fetchStrategy.default
  );

  const handleDelete = (e) => {
    e.preventDefault();

    deleteProject(slug as string).then(() => mutate(revalidator(/^\/projects/)));
  };

  if (error instanceof FetchError) {
    if (error.code === 404) { return notFound() }
  }

  return (
    <Main
      actions={(
      data
        ? <div>
          <button className="button danger" onClick={handleDelete}><DeleteIcon size="1.1em" /> Delete</button>
          <Link href={`/projects/${slug}/edit`} className="button primary"><EditIcon size="1.1em" /> Edit</Link>
          <Link href="/projects" className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
        </div>
        : null
      )}>
      { error
        ? <Error error={error} />
       : isLoading
          ? <div>
              <ProjectDetailSkeleton />
              <ProjectNavigationSkeleton />
            </div>
          : data
            ? <div>
                <ProjectDetail data={data} />
                <ProjectNavigation data={data} />
              </div>
            : notFound()
      }
    </Main>
  )
}

export default ProjectPage;
