'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { notFound, redirect, useParams } from 'next/navigation';

import { Main } from '@/components/main';
import { Error } from '@/components/error';
import { ProjectForm } from '@/components/project-edit-form';
import { SaveIcon, CancelIcon } from '@/ui/icons';
import { fetcher, FetchError, revalidator } from '@/lib/fetch';
import { getProjectsEndpoint, Project, projectSchema } from '@/lib/projects';

const submitForm = async (state: { slug: string, submitted: boolean}, formData: FormData) => {
  const entity = {
    name: formData.get('name').toString(),
    slug: formData.get('slug').toString(),
    description: formData.get('description').toString(),
    role: formData.get('role').toString(),
    summary: formData.get('summary').toString(),
    technologies: formData.get('technologies').toString().split(',').map((s) => s.trim()),
  };

  const { error, success, data: project } = await projectSchema.partial().safeParseAsync(entity);

  if (success) {
    try {
      await fetch(getProjectsEndpoint(state.slug), { method: 'POST', body: JSON.stringify(project) });

      mutate(revalidator(/^\/projects/u));

      return { slug: entity.slug, submitted: true }
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  } else {
    console.error('Form submission failed:', error);
  }

  return state;
}

const ProjectEditPage = () => {
  const { slug } = useParams()
  const apiURL = getProjectsEndpoint(slug as string);
  const { data, error, isLoading } = useSWR<Project>(apiURL, fetcher.json<Project>);
  const [ state, formAction, isPending] = useActionState(submitForm, { slug, submitted: false });

  useEffect(() => {
    if (state.submitted) {
      redirect(`/projects/${state.slug}`);
    }
  }, [state.submitted]);

  if (error instanceof FetchError) {
    if (error.code === 404) { return notFound() }
  }

  return (
    <Main>
      { error
        ? <Error error={error} />
        : <ProjectForm
            title={`Edit Project (${data?.name})`}
            action={formAction}
            actions={(
              data
                ? <>
                    <button type="submit" className="button primary"><SaveIcon size="1.1em" /> Save</button>
                    <Link href={`/projects/${slug}`} className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
                  </>
                : null
            )}
            data={data}
            loading={isLoading}
            pending={isPending}
            disabled={isPending}
            bordered />
      }
    </Main>
  )
}

export default ProjectEditPage;
