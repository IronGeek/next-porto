import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './stack.module.scss';

interface StackProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  readonly gap?: number
  readonly direction?: 'column' | 'col-reverse' | 'row' | 'row-reverse'
}

const getGap = (n?: number): string => {
  return n ? `gap-${n}` : ''
}

const getDirection = (direction?: 'column' | 'col-reverse' | 'row' | 'row-reverse') => {
  if (direction) { return `flex-${direction}` }

  return 'flex-col';
}

const Stack = ({ className, direction, gap, ...props }: StackProps) => {
  return (
    <div {...props} className={clsx(styles.stack, getGap(gap), getDirection(direction), className)}></div>
  )
};

export { Stack };
export type { StackProps };
