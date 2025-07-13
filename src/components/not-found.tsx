import clsx from 'clsx';
import Link from 'next/link';

import styles from './not-found.module.scss';

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <div className={styles.container}>
        <div className={styles.greetings}>Hey, Uhmm...!</div>
        <h1 className={styles.not_found_shrug}>¯\_(ツ)_/¯</h1>
        <h1 className={clsx(styles.not_found_text, "gradient-text")}>Sorry, but this is not the page your looking for!</h1>
        <div className={styles.not_found_desc}>
          <p>
            The resources you requested may have been permanently removed, or moved to another location, or temporarily unavailable at this time. Please check back again later...
          </p>
        </div>
        <div className={styles.not_found_actions}>
          <Link className="button secondary" href="/">
            Return to Homepage
          </Link>
          <div className="separator">OR</div>
          <Link className="button secondary" href="https://www.goodreads.com/">
            Read a books, maybe...?
          </Link>
        </div>
      </div>
    </div>
  )
}

export { NotFound }
