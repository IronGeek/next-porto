import clsx from 'clsx';
import type { ComponentProps } from 'react';

type FormGroupProps = ComponentProps<'div'>;

const FormGroup = ({ children, className, ...props }: FormGroupProps) => {
  return (
    <div {...props} className={clsx("form-group", className)}>
      {children}
    </div>
  )
}

export { FormGroup }
export type { FormGroupProps }
