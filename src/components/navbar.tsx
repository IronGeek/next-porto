import clsx from 'clsx';

import { PageMenu } from '@/components/page-menu';

import type { HTMLProps } from 'react';

import styles from './navbar.module.scss';

type NavbarProps = HTMLProps<HTMLDivElement> & {
};

const Navbar = ({ className, ...props }: NavbarProps) => {
  return (
    <div
      {...props}
      className={clsx(styles.navbar, className)}
    >
      <div className={styles.navbar_left}>
      </div>
      <div className={styles.navbar_right}>
        <PageMenu />
      </div>
    </div>
  );
};

export { Navbar };
export type { NavbarProps };
