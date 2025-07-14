import clsx from 'clsx';
import Image from 'next/image';

import styles from './project-card.module.scss';

import type { ComponentProps } from 'react';
import type { Project } from '@/lib/data';
import Link from 'next/link';

type ProjectCardProps = ComponentProps<'div'> & {
  readonly data: Project
};

const ProjectCard = ({ className, data, ...props }: ProjectCardProps) => {
  const href = `/projects/${data.slug}`;

  return (
    <div {...props} className={clsx(styles.project, className)}>
      <Image alt={data.name} src={data.thumbnail} width={300} height={300} />
      <div className={styles.project_body}>
        <Link href={href}>
          <div className={styles.project_name}>{data.name}</div>
          <div className={styles.project_title}>{data.title}</div>
        </Link>
      </div>
    </div>
  )
}

export { ProjectCard }
