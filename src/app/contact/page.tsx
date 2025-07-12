import { clsx } from 'clsx';
import { ContactForm } from '@/components/contact-form';
import { Main } from '@/components/main';
import { Stack } from '@/components/stack';

import styles from './page.module.scss';
import Image from 'next/image';

const ContactPage = () => {
  return (
    <Main>
      <Stack className={styles.stack}>
        <div className={styles.contact}>
          <Image className={styles.contact_image} alt="Justin Case" src="/contact.png" width={200} height={200} />

          <p>
            I am always open to discussing new projects, collaborations, or opportunities.
            Feel free to reach out using any of the methods below, or use the contact form.
            I typically respond within 24-48 hours.
          </p>

          <dl className={styles.contact_list}>
            <dt>Email</dt>
            <dd>
              <span className={styles.contact_link}>justin.case.dev@email.com</span>
              <span className={styles.contact_notice}>Fictional</span></dd>
            <dt>LinkedIn</dt>
            <dd>
              <span className={styles.contact_link}>linkedin.com/in/justincase-dev</span>
              <span className={styles.contact_notice}>Fictional</span></dd>
            <dt>GitHub</dt>
            <dd>
              <span className={styles.contact_link}>github.com/justincase-code</span>
              <span className={styles.contact_notice}>Fictional</span>
            </dd>
          </dl>
        </div>
        <ContactForm />
      </Stack>
    </Main>
  )
}

export default ContactPage;
