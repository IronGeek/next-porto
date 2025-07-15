import clsx from 'clsx';

import styles from './contact-list.module.scss';
import type { ComponentProps } from 'react';

type ContactListProps = ComponentProps<'dl'>;

const ContactList = ({ className, ...props }: ContactListProps) => (
  <dl {...props} className={clsx(styles.contact_list, className)}>
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
);

export { ContactList }
