import clsx from 'clsx';

import type { ComponentProps } from 'react';

import styles from './project-edit-form.module.scss';
import { RequiredIcon } from '@/ui/icons';
import { Project } from '@/lib/data';

type ProjectEditFormProps = ComponentProps<'form'> & {
  readonly disabled?: boolean
  readonly data: Project
};

const ProjectEditForm = ({ className, disabled, data, ...props }: ProjectEditFormProps) => (
  <form {...props} className={clsx(styles.form, "sm:gap-8 sm:grid-cols-2", className)}>
    <div>
      <div className={styles.form_group}>
        <label htmlFor="name">Name <RequiredIcon color="#903" size=".5em" /></label>
        <input
          type="text"
          name="name"
          placeholder="My Project"
          defaultValue={data.name}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="slug">Slug <RequiredIcon color="#903" size=".5em" /></label>
        <input
          type="text"
          name="slug"
          placeholder="my-project"
          defaultValue={data.slug}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="title">Description <RequiredIcon color="#903" size=".5em" /></label>
        <input
          type="text"
          name="description"
          placeholder="The project short description"
          defaultValue={data.description}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="description">Summary <RequiredIcon color="#903" size=".5em" /></label>
        <textarea
          name="summary"
          placeholder="The full project summary"
          defaultValue={data.summary}
          required
        ></textarea>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="role">Role <RequiredIcon color="#903" size=".5em" /></label>
        <textarea
          name="role"
          placeholder="Your role in the project"
          defaultValue={data.role}
          required
        ></textarea>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="role">Technologies <RequiredIcon color="#903" size=".5em" /></label>
        <textarea
          name="technologies"
          placeholder="Technologies used (separate multiple technology with comma)"
          defaultValue={data.technologies?.join(', ')}
          required
        ></textarea>
      </div>
    </div>
    <div className="hidden">
      <div className={styles.form_group}>
        <label htmlFor="role">Thumbnail</label>
        <input type="file" name="thumbnail" />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="role">Images</label>
        <input type="file" name="images" />
      </div>
    </div>
  </form>
)

export { ProjectEditForm }
