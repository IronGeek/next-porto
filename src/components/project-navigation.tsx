import clsx from 'clsx';
import { notFound } from 'next/navigation';

import styles from './project-navigation.module.scss';

import type { ComponentProps } from 'react';
import type { Project } from '@/lib/data';
import Link from 'next/link';

type ProjectNavigationProps = ComponentProps<'div'> & {
  readonly data: Project[]
  readonly current?: Project
};

const ProjectNavigation = ({ className, data, current, ...props }: ProjectNavigationProps) => {
  if (!current) { return null }

  const index = data.indexOf(current);
  const prev = index > 0 ? data[index - 1] : null;
  const next = index < data.length -1 ? data[index + 1] : null;

  return (
    <div {...props} className={clsx(styles.navigation, className)}>
      { prev ? <Link href={"/projects/" + prev.slug}>🡠 {prev.name}</Link> : <div></div> }
      { next ? <Link href={"/projects/" + next.slug}>{next.name} 🡢</Link> : <div></div> }
    </div>
  )
}

export { ProjectNavigation }
