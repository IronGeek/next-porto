import clsx from 'clsx';
import { isValidElement, useId } from 'react';

import { FormImageClient } from '@/ui/forms/client/image';
import { LockIcon, RequiredIcon } from '@/ui/icons';

import type { ComponentProps, ReactNode } from 'react';

type FormImageInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  readonly label?: ReactNode
  readonly preview?: boolean
}

const FormImageInput = ({ className, defaultValue, label, preview, ...props }: FormImageInputProps) => {
  const id = useId();

  return (
    <>
      { isValidElement<HTMLLabelElement>(label)
        ? label
        : <label htmlFor={id}><span>{label || props.name}</span>
            { props.readOnly ? <LockIcon className="form-input-indicator" /> : null }
            { props.required ? <RequiredIcon className="form-input-indicator" /> : null }
          </label> }
      { preview
        ? <FormImageClient
            {...props}
            id={id}
            className={className}
            defaultValue={typeof defaultValue === 'string' ? defaultValue : undefined} />
        : <input {...props} id={id} type="file" className={clsx("form-input", className)} /> }
    </>
  )
}

export { FormImageInput }
export type { FormImageInputProps }
