'use client'

import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

import { GitHubIcon } from '@/ui/icons';

import type { HTMLAttributes } from 'react';

import styles from './page-menu.module.scss';

type PageMenuProps = HTMLAttributes<HTMLOListElement> & {
};

const PageMenu = ({ className, ...props }: PageMenuProps) => {
  const pathname = usePathname()
  const linkClass = (path: string, prefix?: boolean) => {
    if (prefix) {
      return pathname.startsWith(path) ? styles.menu_item_active : '';
    }

    return pathname === path ? styles.menu_item_active : '';
  }

  return (
    <ol {...props} className={clsx(styles.menu, className)}>
      <li className={styles.menu_item}>
        <Link title="Home" className={linkClass('/')} href="/">Home</Link>
      </li>
      <li className={styles.menu_item}>
        <Link title="Profile" className={linkClass('/profile')} href="/profile">Profile</Link>
      </li>
      <li className={styles.menu_item}>
        <Link title="Projects" className={linkClass('/projects', true)} href="/projects">Projects</Link>
      </li>
      <li className={styles.menu_item}>
        <Link title="Contact" className={linkClass('/contact')} href="/contact">Contact</Link>
      </li>
      <li className={styles.menu_item}>
        <Link title="About" className={linkClass('/about')} href="/about">About</Link>
      </li>
      <li className={styles.menu_item}>
        <Link title="Repository" target="_blank" href="https://github.com/IronGeek/next-porto"><GitHubIcon size="1.5em" /></Link>
      </li>
    </ol>
  );
};

export { PageMenu };
export type { PageMenuProps };
