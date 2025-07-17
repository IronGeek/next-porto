import clsx from 'clsx';
import Link from 'next/link';

import { NextIcon, PrevIcon } from '@/ui/icons';

import styles from './project-navigation.module.scss';

import type { ComponentProps } from 'react';
import type { ProjectWithMeta } from '@/lib/projects';

type ProjectNavigationProps = ComponentProps<'div'> & {
  readonly data: ProjectWithMeta | undefined
};

const ProjectNavigation = ({ className, data, ...props }: ProjectNavigationProps) => {
  const { meta, ...current } = data ?? {};

  if (!current) { return null }

  return (
    <div {...props} className={clsx(styles.navigation, "sm:grid-cols-2", className)}>
      { meta?.prev
        ? <Link className={clsx(styles.link, "sm:w-fit sm:mr-auto")} href={`/projects/${meta.prev.slug}`}>
            <PrevIcon />
            <div className={styles.link_button}>
              <div className="font-bold mb-2">{meta.prev.name}</div>
              <div className="text-[.875em]">{meta.prev.description}</div>
            </div>
          </Link>
        : <div></div> }
      { meta?.next
        ? <Link className={clsx(styles.link, "sm:w-fit sm:ml-auto justify-end text-right")} href={`/projects/${meta.next.slug}`}>
            <div className={styles.link_button}>
              <div className="font-bold mb-2">{meta.next.name}</div>
              <div className="text-[.875em]">{meta.next.description}</div>
            </div>
            <NextIcon />
          </Link>
        : <div></div> }
    </div>
  )
}

const ProjectNavigationSkeleton = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props} className={clsx(styles.navigation_skeleton, "sm:grid-cols-2", className)}>
      <div className={clsx(styles.link, "sm:mr-auto")}>
        <PrevIcon />
        <div>
          <div className="skeleton-line h-4 w-48 mb-1"></div>
          <div className="skeleton-line h-2.5 w-64 mb-1"></div>
          <div className="skeleton-line h-2.5 w-32"></div>
        </div>
      </div>
      <div className={clsx(styles.link, "sm:ml-auto justify-end text-right")}>
        <div>
          <div className="skeleton-line h-4 w-48 mb-1 ml-auto"></div>
          <div className="skeleton-line h-2.5 w-64 mb-1 ml-auto"></div>
          <div className="skeleton-line h-2.5 w-32 ml-auto"></div>
        </div>
        <NextIcon />
      </div>
    </div>
  )
}

export { ProjectNavigation, ProjectNavigationSkeleton }
