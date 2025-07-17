import { isValidElement } from 'react';

import { LockIcon, RequiredIcon } from '@/ui/icons';

import type { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

type FormFileInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  readonly label?: ReactNode
}

const FormFileInput = ({ className, label, ...props }: FormFileInputProps) => {
  return (
    <>
      { isValidElement<HTMLLabelElement>(label)
        ? label
        : <label htmlFor={props.name}><span>{label || props.name}</span>
            { props.readOnly ? <LockIcon className="form-input-indicator" /> : null }
            { props.required ? <RequiredIcon className="form-input-indicator" /> : null }
          </label> }
      <input {...props} type="file" className={clsx("form-input", className)}  />
    </>
  )
}

export { FormFileInput }
export type { FormFileInputProps }
