'use client';

import useSWRImmutable from 'swr/immutable';
import Link from 'next/link';
import { Main } from '@/components/main';

import { SaveIcon, CancelIcon } from '@/ui/icons';
import { ProjectEditForm } from '@/components/project-edit-form';
import { notFound, redirect, useParams } from 'next/navigation';
import { fetcher, getApiURL, Project, projectSchema } from '@/lib/data';
import { useActionState, useEffect, useRef } from 'react';

const submitForm = async (state: Project & { submitted: boolean }, formData: FormData) => {
  const updates = {
    name: formData.get('name').toString(),
    slug: formData.get('slug').toString(),
    description: formData.get('description').toString(),
    role: formData.get('role').toString(),
    summary: formData.get('summary').toString(),
    technologies: formData.get('technologies').toString().split(',').map((s) => s.trim()),
  };

  const { error, success, data: project } = await projectSchema.partial().safeParseAsync(updates);

  if (success) {
    try {
      await fetch(getApiURL(state.slug), { method: 'POST', body: JSON.stringify(project) });

      return { ...state, ...project, submitted: true }
    } catch (err) {
      // Handle error
      console.error('Form submission failed:', err);
    }
  } else {
    console.error('Form submission failed:', error);
  }

  return state;
}

const ProjectEditPage = () => {
  const { slug } = useParams()

  const editForm = useRef<HTMLFormElement>(null);
  const apiURL = getApiURL(slug as string);
  const { data: initial, error, isLoading } = useSWRImmutable<Project>(apiURL, fetcher('json'));
  const [ data, formAction, isPending] = useActionState(submitForm, { ...initial, submitted: false });

  useEffect(() => {
    if (data && data.submitted) { redirect(`/projects/${data.slug}`) }
  }, [data?.submitted]);

  return (
    <Main
      title={data?.name}
      actions={(
        data
          ? <div>
              <button className="button primary" onClick={() => { editForm.current?.requestSubmit() }}><SaveIcon size="1.1em" /> Save</button>
              <Link href={`/projects/${slug}`} className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
            </div>
          : null
      )}>
      { error
        ? <div>Failed to load project data: {error.toString()}</div>
        : isLoading
          ? <div>Loading project data...</div>
          : data
            ? <ProjectEditForm ref={editForm} action={formAction} data={data} disabled={isPending} />
            : notFound()
      }
    </Main>
  )
}

export default ProjectEditPage;
