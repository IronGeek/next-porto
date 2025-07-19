import clsx from 'clsx';
import type { ComponentProps } from 'react';

import styles from './grid.module.scss';

type FormGridProps = ComponentProps<'div'>;

const FormGrid = ({ children, className, ...props }: FormGridProps) => (
  <div {...props} className={clsx(styles.form_grid, "form-grid", className)}>
    {children}
  </div>
)

export { FormGrid }
export type { FormGridProps }
