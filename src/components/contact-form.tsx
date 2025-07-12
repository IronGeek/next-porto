'use client';

import { useState } from 'react';

import styles from './contact-form.module.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Message sent successfully! (Don\'t worry this is a mock submission)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={styles.contactForm}>
      <h2>Get in Touch</h2>
      <p>Have a question or want to work together? Send me a message!</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.contactFormGroup}>
          <label htmlFor="name">Your Name</label>
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
          <label htmlFor="email">Your Email</label>
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
          <label htmlFor="subject">Subject</label>
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
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Hi Justin, I'd like to discuss a potential project..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="button primary">Send Message</button>
      </form>
    </div>
  );
};

export { ContactForm };
