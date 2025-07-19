import { Form } from '@/ui/forms';

import type { Project } from '@/models/projects/types';
import type { FormProps } from '@/ui/forms';

const ProjectForm = ({ data, ...props }: FormProps<Project>) => {
  return (
    <Form {...props}>
      <Form.Grid className="sm:gap-8 sm:grid-cols-2">
        <div>
          <Form.Group>
            <Form.TextInput
              type="text"
              name="id"
              label="Identifier"
              defaultValue={data?.id}
              readOnly />
          </Form.Group>
          <Form.Group>
            <Form.TextInput
              type="text"
              name="name"
              label="Name"
              placeholder="My Project"
              defaultValue={data?.name}
              required />
          </Form.Group>
          <Form.Group>
            <Form.TextInput
              type="text"
              name="slug"
              label="Slug"
              placeholder="my-project"
              defaultValue={data?.slug}
              required />
          </Form.Group>
          <Form.Group>
            <Form.TextInput
              type="text"
              name="description"
              label="description"
              placeholder="The project short description"
              defaultValue={data?.description}
              required />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              name="summary"
              label="Summary"
              placeholder="The full project summary"
              defaultValue={data?.summary}
              required />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              name="role"
              label="Role"
              placeholder="Your role in the project"
              defaultValue={data?.role}
              required />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              name="technologies"
              label="Technologies"
              placeholder="Technologies used (separate multiple technology with comma)"
              defaultValue={data?.technologies}
              required />
          </Form.Group>
        </div>
        <div>
          <Form.Group>
            <Form.ImageInput
              name="thumbnail"
              label="Thumbnail"
              defaultValue={data?.thumbnail}
              preview
            />
          </Form.Group>
          <Form.Group className="hidden">
            <Form.FileInput
              name="images"
              label="Images"
              defaultValue={data?.images}
              multiple
            />
          </Form.Group>
        </div>
      </Form.Grid>
    </Form>
  )
}

export { ProjectForm }
