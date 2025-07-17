'use client';

import { clsx } from 'clsx';
import { ComponentProps, FormEvent, useEffect, useState } from 'react';

type FormImageClientProps = Omit<ComponentProps<'input'>, 'defaultValue' | 'type'> & {
  readonly defaultValue?: string
}

const FormImageClient = ({ className, defaultValue, accept, ...props }: FormImageClientProps) => {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const file = target.files && target.files[0];

    setFile(file);
  }

  useEffect(() => {
    if (!file) { return; }

    setPreview(URL.createObjectURL(file));

    return () => {
      URL.revokeObjectURL(preview);
    }
  }, [file]);

  return (
    <div>
      <img className="form-file-preview mb-4" src={preview ?? defaultValue} />
      <input
        {...props}
        type="file"
        className={clsx("form-input", className)}
        accept={accept ?? 'image/*'}
        onChange={handleChange} />
    </div>
  )
}

export { FormImageClient }
export type { FormImageClientProps }
