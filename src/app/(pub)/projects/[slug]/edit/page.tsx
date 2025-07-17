'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { notFound, redirect, useParams } from 'next/navigation';

import { Main } from '@/components/main';
import { Error } from '@/components/error';
import { ProjectForm } from '@/components/project-form';
import { SaveIcon, CancelIcon } from '@/ui/icons';
import { fetcher, FetchError, revalidator } from '@/lib/fetch';
import { getProjectsEndpoint, Project, projectSchema } from '@/lib/projects';

const submitForm = async (state: { slug: string, submitted: boolean}, context: FormData) => {
  const entity = {
    name: context.get('name').toString(),
    slug: context.get('slug').toString(),
    description: context.get('description').toString(),
    role: context.get('role').toString(),
    summary: context.get('summary').toString(),
    technologies: context.get('technologies').toString().split(',').map((s) => s.trim()),
  };

  const { error, data } = await projectSchema.partial().safeParseAsync(entity);
  if (error) {
    console.error('Form submission failed:', error);

    return state;
  }

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));

  const thumbnail = context.get('thumbnail');
  if (thumbnail instanceof File && thumbnail.size > 0) {
    console.log('thumbnail', thumbnail);
    formData.append('thumbnail', thumbnail);
  }

  const images = context.get('images');
  if (images instanceof File && images.size > 0) {
    console.log('images', images);
  }

  try {
    await fetch(getProjectsEndpoint(state.slug), { method: 'POST', body: formData });

    await mutate(revalidator(/^\/projects/u));

    return { slug: data.slug, submitted: true }
  } catch (err) {
    console.error('Form submission failed:', err);
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
