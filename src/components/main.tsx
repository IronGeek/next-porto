import clsx from 'clsx';

import { type ComponentProps, isValidElement, type ReactNode } from 'react';

import styles from './main.module.scss';

type MainProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly fullscreen?: boolean
  readonly title?: ReactNode
};

const Main = ({ className, children, fullscreen, title, ...props }: MainProps): ReactNode => (
  <main {...props} className={clsx(styles.main, { [styles.fullscreen]: fullscreen }, className)}>
    { isValidElement(title) ? title : title ? <h1 className={styles.main_title}>{title}</h1> : null }
    {children}
  </main>
);

export { Main };
