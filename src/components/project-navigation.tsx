import clsx from 'clsx';
import Link from 'next/link';

import { NextIcon, PrevIcon } from '@/ui/icons';

import styles from './project-navigation.module.scss';

import type { ComponentProps } from 'react';
import type { Project } from '@/lib/data';

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
      { prev ? <Link className={styles.link} href={`/projects/${prev.slug}`}><PrevIcon /> {prev.name}</Link> : <div></div> }
      { next ? <Link className={styles.link} href={`/projects/${next.slug}`}>{next.name} <NextIcon /></Link> : <div></div> }
    </div>
  )
}

export { ProjectNavigation }
