import clsx from 'clsx';

import styles from './project-list.module.scss';

import type { ComponentProps } from 'react';
import type { Project } from '@/lib/data';
import { ProjectCard, ProjectCardSkeleton } from './project-card';

type ProjectListProps = ComponentProps<'ul'> & {
  readonly data: readonly Project[]
};

const ProjectList = ({ className, data, ...props }: ProjectListProps) => (
  <ul {...props} className={clsx(styles.projects, className)}>
    { data.map((project) => (
        <li key={project.name}><ProjectCard data={project} /></li>
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
