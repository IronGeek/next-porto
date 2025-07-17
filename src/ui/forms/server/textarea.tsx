import { isValidElement } from 'react';

import { LockIcon, RequiredIcon } from '@/ui/icons';

import type { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

type FormTextAreaProps = ComponentProps<'textarea'> & {
  readonly label?: ReactNode
}

const FormTextArea = ({ className, label, ...props }: FormTextAreaProps) => {
  return (
    <>
      { isValidElement<HTMLLabelElement>(label)
        ? label
        : <label htmlFor={props.name}><span>{label || props.name}</span>
            { props.readOnly ? <LockIcon className="form-input-indicator" /> : null }
            { props.required ? <RequiredIcon className="form-input-indicator" /> : null }
          </label> }
      <textarea {...props} className={clsx("form-input", className)}></textarea>
    </>
  )
}

export { FormTextArea }
export type { FormTextAreaProps }
