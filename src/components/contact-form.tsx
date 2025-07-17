'use client';

import { useActionState } from 'react';

import { SendEmailIcon } from '@/ui/icons';
import { Form, FormGroup, FormProps } from '@/ui/forms';

const submitForm = (_, formData: FormData) => {
  console.log(Object.fromEntries(formData));

  alert('Message sent successfully! (Don\'t worry this is a mock submission)');
};

const ContactForm = ({ className, ...props }: FormProps) => {
  const [_, action, pending] = useActionState(submitForm, null);

  return (
    <Form {...props} action={action} pending={pending}>
      <Form.Group>
        <Form.TextInput
          type="text"
          name="name"
          label="Your Name"
          placeholder="John Doe"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.TextInput
          type="email"
          label="Your Email"
          name="email"
          placeholder="john.doe@example.com"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.TextInput
          type="text"
          label="Subject"
          name="subject"
          placeholder="Project Inquiry"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.TextArea
          label="Message"
          name="message"
          placeholder="Hi Justin, I'd like to discuss a potential project..."
          required
        />
      </Form.Group>
      <FormGroup className="text-center">
        <button type="submit" className="button primary"><SendEmailIcon /> Send Message</button>
      </FormGroup>
    </Form>
  );
};

export { ContactForm };
