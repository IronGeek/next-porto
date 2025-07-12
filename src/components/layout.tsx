import clsx from 'clsx';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './layout.module.scss';

type LayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly navbar?: boolean
};

const Layout = ({ className, footer, navbar, children, ...props }: LayoutProps): ReactNode => {
  return (
    <div className={clsx(styles.layout_full, className)} {...props}>
      {navbar !== false ? <Navbar /> : null }
      {children}
      {footer !== false ? <Footer /> : null }
    </div>
  )
}

export { Layout };
export type { LayoutProps };
