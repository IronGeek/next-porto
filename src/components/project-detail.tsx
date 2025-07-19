import clsx from 'clsx';

import { Tags, TagsSkeleton } from '@/components/tags';

import type { ComponentProps } from 'react';
import type { Project } from '@/models/projects/types';

import styles from './project-detail.module.scss';

type ProjectDetailProps = ComponentProps<'div'> & {
  readonly data: Project
};

const ProjectDetail = ({ className, data, ...props }: ProjectDetailProps) => (
  <div {...props} className={clsx(styles.project, className)}>
    <h1 className={styles.project_name}>{data.name}</h1>
    <dl className={styles.project_definition}>
      <dt>Description</dt>
      <dd>{data.description}</dd>
      <dt>Summary</dt>
      <dd className="text-justify">{data.summary}</dd>
      <dt>Role</dt>
      <dd className="text-justify">{data.role}</dd>
      <dt>Technology Used</dt>
      <dd><Tags tags={data.technologies} /></dd>
    </dl>
  </div>
)

const ProjectDetailSkeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div {...props} className={clsx(styles.project_skeleton, className)}>
    <h1 className={styles.project_name}>
      <div className="skeleton-line h-16 w-1/2 mb-3"></div>
    </h1>
    <dl className={styles.project_definition}>
      <dt>Description</dt>
      <dd><div className="skeleton-line h-8 w-2/3 mb-3"></div></dd>
      <dt>Summary</dt>
      <dd className="text-justify">
        <div className="skeleton-line h-2.5 w-9/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-8/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-9/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-7/10 mb-2"></div>
      </dd>
      <dt>Role</dt>
      <dd className="text-justify">
        <div className="skeleton-line h-2.5 w-9/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-8/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-9/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-7/10 mb-2"></div>
      </dd>
      <dt>Technology Used</dt>
      <dd>
        <TagsSkeleton count={5} />
        </dd>
    </dl>
  </div>
)

export { ProjectDetail, ProjectDetailSkeleton }
