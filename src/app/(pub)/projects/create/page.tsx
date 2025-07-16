'use client';

import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { Main } from '@/components/main';

import { SaveIcon, CancelIcon } from '@/ui/icons';
import { ProjectCreateForm } from '@/components/project-create-form';
import { getApiURL, projectSchema } from '@/lib/data';
import { useActionState, useEffect, useRef } from 'react';
import { redirect } from 'next/navigation';

const submitForm = async (state: { slug: string | null }, formData: FormData) => {
  const updates = {
    id: uuidv4(),
    name: formData.get('name').toString(),
    slug: formData.get('slug').toString(),
    description: formData.get('description').toString(),
    role: formData.get('role').toString(),
    summary: formData.get('summary').toString(),
    technologies: formData.get('technologies').toString().split(',').map((s) => s.trim()),
    thumbnail: '/projects/canvas-flow/thumbnail.png'
  };

  const { error, success, data: project } = await projectSchema.partial().safeParseAsync(updates);

  if (success) {
    try {
      await fetch(getApiURL(), { method: 'POST', body: JSON.stringify(project) });

      return { slug: project.slug }
    } catch (err) {
      // Handle error
      console.error('Form submission failed:', err);
    }
  } else {
    console.error('Form submission failed:', error);
  }

  return state;
}

const ProjectCreatePage = () => {
  const createForm = useRef<HTMLFormElement>(null);
  const [ data, formAction, isPending] = useActionState(submitForm, { slug: null });

  useEffect(() => {
    if (data && data.slug) { redirect(`/projects/${data.slug}`) }
  }, [data?.slug]);

  return (
    <Main
      title="New Project"
      actions={(
        <div>
          <button className="button primary"  onClick={() => { createForm.current?.requestSubmit() }}><SaveIcon size="1.1em" /> Save</button>
          <Link href="/projects" className="button secondary"><CancelIcon size="1.1em" /> Back</Link>
        </div>
      )}>
      <ProjectCreateForm ref={createForm} action={formAction} disabled={isPending} />
    </Main>
  )
}

export default ProjectCreatePage;
