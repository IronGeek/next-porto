'use client';

import { useActionState, useEffect } from 'react';
import { mutate } from 'swr';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Main } from '@/components/main';
import { SaveIcon, CancelIcon } from '@/ui/icons';
import { getProjectsEndpoint, projectSchema } from '@/lib/projects';
import { ProjectForm } from '@/components/project-edit-form';
import { revalidator } from '@/lib/fetch';

const submitForm = async (state: { slug: string | null }, formData: FormData) => {
  const entity = {
    id: formData.get('id').toString(),
    name: formData.get('name').toString(),
    slug: formData.get('slug').toString(),
    description: formData.get('description').toString(),
    role: formData.get('role').toString(),
    summary: formData.get('summary').toString(),
    technologies: formData.get('technologies').toString().split(',').map((s) => s.trim()),
    thumbnail: '/projects/default/thumbnail.png'
  };

  const { error, success, data: project } = await projectSchema.partial().safeParseAsync(entity);

  if (success) {
    try {
      await fetch(getProjectsEndpoint(), { method: 'POST', body: JSON.stringify(project) });

      mutate(revalidator(/^\/projects/u));

      return { slug: project.slug }
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  } else {
    console.error('Form submission failed:', error);
  }

  return state;
}

const ProjectCreatePage = () => {
  const [ data, formAction, isPending] = useActionState(submitForm, { slug: null });

  useEffect(() => {
    if (data && data.slug) { redirect(`/projects/${data.slug}`) }
  }, [data?.slug]);

  return (
    <Main>
      <ProjectForm
        title="Create Project"
        action={formAction}
        actions={(
          data
            ? <>
                <button type="submit" className="button primary"><SaveIcon size="1.1em" /> Save</button>
                <Link href="/projects" className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
              </>
            : null
        )}
        data={{ id: uuidv4() }}
        pending={isPending}
        disabled={isPending}
        bordered  />
    </Main>
  )
}

export default ProjectCreatePage;
