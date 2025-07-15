"use client";

import { notFound, useParams } from 'next/navigation'

import { Main } from '@/components/main';

import { projects } from '@/lib/data';
import { ProjectDetail } from '@/components/project-detail';
import { ProjectNavigation } from '@/components/project-navigation';

const ProjectPage = () => {
  const params = useParams()
  const project = projects.find((prj) => prj.slug === params.slug);
  if (!project) { return notFound() }

  return (
    <Main>
      <div>
        <ProjectNavigation data={projects} current={project} />
        <ProjectDetail data={project} />
      </div>
    </Main>
  )
}

export default ProjectPage;
