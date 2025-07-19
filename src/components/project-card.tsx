import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { FloralImage } from '@/ui/images/client';

import type { ComponentProps } from 'react';
import type { Project } from '@/models/projects/types';

import styles from './project-card.module.scss';

type ProjectCardProps = ComponentProps<'div'> & {
  readonly data: Project
  readonly urlPrefix?: string
};

const ProjectCard = ({ className, data, urlPrefix = '/projects/', ...props }: ProjectCardProps) => {
  const href = `${urlPrefix}${data.slug}`;

  return (
    <div {...props} className={clsx(styles.project, className)}>
      { data.thumbnail
        ? <Image className="project-thumbnail" alt={data.name} src={data.thumbnail} width={300} height={300} />
        : <FloralImage className="project-thumbnail floral-pattern w-[300px] h-[300px]" updateInterval={333} />}
      <div className={styles.project_body}>
        <Link href={href}>
          <div className={styles.project_name}>{data.name}</div>
          <div className={styles.project_description}>{data.description}</div>
        </Link>
      </div>
    </div>
  )
}

const ProjectCardSkeleton = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props} className={clsx(styles.project_skeleton, className)}>
      <div className={clsx(styles.project_image, "skeleton-image w-[300px] h-[300px]")} />
      <div className={styles.project_body}>
        <div className="skeleton-line h-8 w-full mb-3"></div>
        <div className="skeleton-line h-2.5 w-9/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-8/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-9/10 mb-2"></div>
        <div className="skeleton-line h-2.5 w-7/10 mb-2"></div>
      </div>
    </div>
  )
}

export { ProjectCard, ProjectCardSkeleton }
