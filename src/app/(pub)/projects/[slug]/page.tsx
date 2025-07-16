"use client";

import useSWR from 'swr';
import Link from 'next/link';
import { notFound, redirect, useParams } from 'next/navigation'

import { Main } from '@/components/main';

import { ProjectDetail, ProjectDetailSkeleton } from '@/components/project-detail';
import { ProjectNavigation, ProjectNavigationSkeleton } from '@/components/project-navigation';

import { fetcher, getApiURL } from '@/lib/data';
import type { ProjectWithMeta } from '@/lib/data';
import { CancelIcon, DeleteIcon, EditIcon } from '@/ui/icons';

const deleteProject = async (slug: string) => {
  const apiURL = getApiURL(slug);
  const response = await fetch(apiURL, { method: 'DELETE' })

  if (response.ok) {
    // TODO: raise notification project is deleted
    const deleted = await response.json();
    console.log(`project deleted`, deleted);

    redirect(`/projects`);
  } else {
    // TODO: raise notification project deletion failed
    console.log(`project deletion failed`, slug);
  }
};

const ProjectPage = () => {
  const { slug } = useParams()
  const apiURL = getApiURL(slug as string);
  const { data, error, isLoading } = useSWR<ProjectWithMeta>(apiURL, fetcher('json'));

  const handleDelete = (e) => {
    e.preventDefault();

    deleteProject(slug as string);
  };

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
        ? <div>Failed to load project data: {error.toString()}</div>
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
