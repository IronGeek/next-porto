'use client'

import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

import type { HTMLAttributes } from 'react';

import styles from './pagemenu.module.scss';

type PageMenuProps = HTMLAttributes<HTMLOListElement> & {
};

const PageMenu = ({ className, ...props }: PageMenuProps) => {
  const pathname = usePathname()
  const linkClass = (path) => pathname === path ? styles.menu_item_active : '';

  return (
    <ol {...props} className={clsx(styles.menu, className)}>
      <li className={styles.menu_item}>
        <Link className={linkClass('/')} href="/">Home</Link>
      </li>
      <li className={styles.menu_item}>
        <Link className={linkClass('/profile')} href="/profile">Profile</Link>
      </li>
      <li className={styles.menu_item}>
        <Link className={linkClass('/projects')} href="/projects">Projects</Link>
      </li>
      <li className={styles.menu_item}>
        <Link className={linkClass('/contact')} href="/contact">Contact</Link>
      </li>
      <li className={styles.menu_item}>
        <Link className={linkClass('/about')} href="/about">About</Link>
      </li>
    </ol>
  );
};

export { PageMenu };
export type { PageMenuProps };
