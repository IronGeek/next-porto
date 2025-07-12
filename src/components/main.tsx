import clsx from 'clsx';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './main.module.scss';

interface PageProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  readonly alignCenter?: boolean
};

const Main = ({ alignCenter, className, children, ...props }: PageProps): ReactNode => {
  return (
    <main
      {...props}
      className={
        clsx(styles.main, className, {
          'justify-center': alignCenter
        })
      }
    >
      {children}
    </main>
  )
}

export { Main };
