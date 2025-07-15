'use client';

import { ComponentProps, isValidElement, ReactNode, useState } from 'react';

import styles from './contact-form.module.scss';
import clsx from 'clsx';
import { RequiredIcon, SendEmailIcon } from '@/ui/icons';

type ContactFormProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly title?: ReactNode
  readonly description?: ReactNode
}

const ContactForm = ({ className, title, description, ...props }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    name: '',
    subject: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    alert('Message sent successfully! (Don\'t worry this is a mock submission)');

    setFormData({
      email: '',
      message: '',
      name: '',
      subject: ''
    });
  };

  return (
    <div {...props} className={clsx(styles.contactForm, className)}>
      { isValidElement(title)
        ? title
        : <h2 className={styles.contactForm_title}>{title || 'Get in Touch'}</h2> }
      { isValidElement(description)
        ? description
        : <div className={styles.contactForm_desc}>{ description || 'Have a question or want to work together? Send me a message!' } </div> }
      <form onSubmit={handleSubmit}>
        <div className={styles.contactFormGroup}>
          <label htmlFor="name">Your Name <RequiredIcon color="#903" size=".5em" /></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="email">Your Email <RequiredIcon color="#903" size=".5em" /></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="subject">Subject <RequiredIcon color="#903" size=".5em" /></label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Project Inquiry"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="message">Your Message <RequiredIcon color="#903" size=".5em" /></label>
          <textarea
            id="message"
            name="message"
            placeholder="Hi Justin, I'd like to discuss a potential project..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className={clsx(styles.contactFormGroup, "text-center")}>
          <button type="submit" className="button primary"><SendEmailIcon /> Send Message</button>
        </div>
      </form>
    </div>
  );
};

export { ContactForm };
