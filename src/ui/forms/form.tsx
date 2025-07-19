import clsx from 'clsx';
import { createElement, isValidElement } from 'react';
import type { ComponentProps, ReactNode } from 'react';

import { FormGrid } from '@/ui/forms/grid';
import { FormGroup } from '@/ui/forms/group';
import { FormTextInput } from '@/ui/forms/text-input';
import { FormTextArea } from '@/ui/forms/textarea';
import { FormFileInput } from '@/ui/forms/file-input';
import { FormImageInput } from '@/ui/forms/image-input';

import styles from './form.module.scss';

type FormProps<T = unknown> = Omit<ComponentProps<'form'>, 'title'> & {
  readonly loading?: boolean
  readonly disabled?: boolean
  readonly pending?: boolean
  readonly bordered?: boolean

  readonly title?: ReactNode
  readonly description?: ReactNode
  readonly loader?: ReactNode
  readonly actions?: ReactNode | ((form: HTMLFormElement | null) => ReactNode)

  readonly data?: Partial<T>
};

const Form = ({
  children, className,
  disabled, pending, loading, bordered,
  title, description, loader, actions, data,
  ...props
}: FormProps) => {
  return (
    <form {...props} className={clsx(styles.form, { 'form-bordered': bordered }, className)}>
      <div className={clsx(styles.form_header, "flex flex-col sm:grid sm:grid-flow-col sm:grid-cols-[1fr_auto] sm:grid-rows-2")}>
        { isValidElement<HTMLElement>(title)
          ? createElement(title.type, { ...title.props, className: clsx("form-title", title.props.className) })
          : <div className="form-title">{title || ''}</div> }
        { isValidElement<HTMLElement>(description)
          ? createElement(description.type, { ...description.props, className: clsx("form-description", description.props.className) })
          : <div className="form-description">{description || ''}</div> }
        <div className="form-actions flex gap-2 items-center justify-center mt-8 sm:mt-0 sm:justify-end sm:row-span-2">
          { pending
            ? <div className="form-loader animate-pulse">(Submitting...)</div>
            : loading
              ? isValidElement<HTMLElement>(loader)
                ? createElement(loader.type, { ...loader.props, className: clsx("form-loader animate-pulse", loader.props.className) })
                : <div className="form-loader animate-pulse">
                    {loader ?? "(Loading)" }
                  </div>
              : isValidElement<HTMLElement>(actions)
                ? actions
                : null }
          </div>
      </div>
      <fieldset disabled={disabled}>
        {children}
      </fieldset>
    </form>
  )
}

Form.Grid = FormGrid;
Form.Group = FormGroup;
Form.TextInput = FormTextInput;
Form.TextArea = FormTextArea;
Form.FileInput = FormFileInput;
Form.ImageInput = FormImageInput;

export { Form }
export type { FormProps }
