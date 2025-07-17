import clsx from 'clsx';
import { isValidElement } from 'react';

import { LockIcon, RequiredIcon } from '@/ui/icons';

import type { ComponentProps, ReactNode } from 'react';

// TODO:
// | "button"
// | "checkbox"
// | "color"
// | "file"
// | "hidden"
// | "image"
// | "radio"
// | "range"
// | "reset"
// | "submit"
// | "date"
// | "datetime-local"
// | "month"
// | "time"
// | "week"

type FormTextInputTypeAttribute = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

type FormTextInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  readonly type?: FormTextInputTypeAttribute
  readonly label?: ReactNode
}

const FormTextInput = ({ className, label, type = 'text', ...props }: FormTextInputProps) => {
  return (
    <>
      { isValidElement<HTMLLabelElement>(label)
        ? label
        : <label htmlFor={props.name}><span>{label || props.name}</span>
            { props.readOnly ? <LockIcon className="form-input-indicator" /> : null }
            { props.required ? <RequiredIcon className="form-input-indicator" /> : null }
          </label> }
      <input {...props} type={type} className={clsx("form-input", className)} />
    </>
  )
}

export { FormTextInput }
export type { FormTextInputTypeAttribute, FormTextInputProps }
