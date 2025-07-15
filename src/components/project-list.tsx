import clsx from 'clsx';

import styles from './project-list.module.scss';

import type { ComponentProps } from 'react';
import type { Project } from '@/lib/data';
import { ProjectCard } from './project-card';

type ProjectListProps = ComponentProps<'ul'> & {
  readonly data: Project[]
};

const ProjectList = ({ className, data, ...props }: ProjectListProps) => (
  <ul {...props} className={clsx(styles.projects, className)}>
    { data.map((project) => (
        <li key={project.name}><ProjectCard data={project} /></li>
      ))}
  </ul>
)

export { ProjectList }
