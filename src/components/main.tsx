import clsx from 'clsx';

import { isValidElement, type ComponentProps, type ReactNode } from 'react';

import styles from './main.module.scss';

type MainProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly title?: ReactNode
};

const Main = ({ className, children, title, ...props }: MainProps): ReactNode => {
  return (
    <main {...props} className={clsx(styles.main, className)}>
      { isValidElement(title) ? title : title ? <h1 className={styles.main_title}>{title}</h1> : null }
      {children}
    </main>
  )
}

export { Main };
