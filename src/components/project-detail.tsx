import clsx from 'clsx';

import { Tags } from '@/components/tags';

import type { ComponentProps } from 'react';
import type { Project } from '@/lib/data';

import styles from './project-detail.module.scss';

type ProjectDetailProps = ComponentProps<'div'> & {
  readonly data: Project
};

const ProjectDetail = ({ className, data, ...props }: ProjectDetailProps) => (
  <div {...props} className={clsx(styles.project, className)}>
    <h1 className={styles.project_name}>{data.name}</h1>
    <dl className={styles.project_definition}>
      <dt>Title</dt>
      <dd>{data.title}</dd>
      <dt>Name</dt>
      <dd className="text-justify">{data.description}</dd>
      <dt>Role</dt>
      <dd className="text-justify">{data.role}</dd>
      <dt>Technology Used</dt>
      <dd><Tags tags={data.technologies} /></dd>
    </dl>
  </div>
)

export { ProjectDetail }
