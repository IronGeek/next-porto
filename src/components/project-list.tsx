import clsx from 'clsx';

import { ProjectCard, ProjectCardSkeleton } from '@/components/project-card';

import styles from './project-list.module.scss';

import type { ComponentProps } from 'react';
import type { Project } from '@/models/projects/types';

type ProjectListProps = ComponentProps<'ul'> & {
  readonly data: readonly Project[]
  readonly urlPrefix?: string
};

const ProjectList = ({ className, data, urlPrefix, ...props }: ProjectListProps) => (
  <ul {...props} className={clsx(styles.projects, className)}>
    { data.map((project) => (
        <li key={project.name}><ProjectCard data={project} urlPrefix={urlPrefix} /></li>
      ))}
  </ul>
)

const ProjectListSkeleton = ({ className, ...props }: ComponentProps<'ul'>) => (
  <ul {...props} className={clsx(styles.projects,  className)}>
    <li><ProjectCardSkeleton /></li>
    <li><ProjectCardSkeleton /></li>
    <li><ProjectCardSkeleton /></li>
    <li><ProjectCardSkeleton /></li>
    <li><ProjectCardSkeleton /></li>
    <li><ProjectCardSkeleton /></li>
  </ul>
)

export { ProjectList, ProjectListSkeleton }
