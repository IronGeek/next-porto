"use client";

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link';

import { Main } from '@/components/main';
import { Stack } from '@/components/stack';
import { Tags } from '@/components/tags';

import styles from './page.module.scss';
import { projects } from '@/lib/data';

const ProjectPage = () => {
  const params = useParams()
  const project = projects.find((prj) => prj.slug === params.slug);
  if (!project) { return notFound() }

  const index = projects.indexOf(project);
  const prev_project = index > 0 ? projects[index - 1] : null;
  const next_project = index < projects.length -1 ? projects[index + 1] : null;

  return (
    <Main>
      <Stack className={styles.stack}>
        <div className={styles.project}>
          <div className={styles.project_links}>
            { prev_project ? <Link href={"/projects/" + prev_project.slug}>&lt; Previous Project</Link> : <div></div> }
            { next_project ? <Link href={"/projects/" + next_project.slug}>Next Project &gt;</Link> : <div></div> }
          </div>
          <h1 className={styles.project_name}>{project.name}</h1>
          <dl className={styles.project_definition}>
            <dt>Title</dt>
            <dd>{project.title}</dd>
            <dt>Name</dt>
            <dd>{project.description}</dd>
            <dt>Role</dt>
            <dd>{project.role}</dd>
            <dt>Technology Used</dt>
            <dd><Tags tags={project.technologies} /></dd>
          </dl>
        </div>
      </Stack>
    </Main>
  )
}

export default ProjectPage;
