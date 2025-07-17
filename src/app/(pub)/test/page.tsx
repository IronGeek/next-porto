import { Form } from '@/ui/forms';
import { Main } from '@/components/main';

const TestPage = () => (
  <Main>
    <Form
      bordered
      title={<div>My Form</div>}
      description="This is my super duper very awesome form"
      actions={<><button type="submit" className="button primary">Submit</button></>}>
        <Form.Grid className="sm:gap-8 sm:grid-cols-2">
          <div>
            <Form.Group>
              <Form.TextInput
                label="Name"
                name="name"
                placeholder="My Project"
                defaultValue="New App"
                required />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label="Summary"
                name="summary"
                placeholder="The full project summary"
                defaultValue="New App summary"
                required />
            </Form.Group>
          </div>
          <div>
            <Form.Group>
              <Form.ImageInput
                label="Thumbnail"
                name="thumbnail"
              />
            </Form.Group>
            <Form.Group>
              <Form.FileInput
                label="Images"
                name="images"
                multiple
              />
            </Form.Group>
          </div>
        </Form.Grid>
    </Form>
  </Main>
);

export default TestPage;
