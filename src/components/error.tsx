import clsx from 'clsx';
import Link from 'next/link';

import styles from './error.module.scss';
import { ComponentProps, useState } from 'react';

type ErrorProps = ComponentProps<'div'> & {
  error: Error
}

const Error = ({ className, error, ...props }: ErrorProps) => {
  const [details, setDetails] = useState(false);

  return (
    <div {...props} className={clsx(styles.container, "mx-8 my-auto", className)}>
      <div className={styles.greetings}>Hey, Uhmm...!</div>
      <h1 className={styles.error_shrug}>m(_ _)m</h1>
      <h1 className={clsx(styles.error_text, "gradient-text sm:text-center")}>Sorry, it's not you, it's us!</h1>
      <div className={styles.error_desc}>A wild error appeared and we failed to catch it: {error.message}.</div>
      { error.stack && details
          ? <div className={styles.error_details}><pre>{error.stack}</pre></div>
          : null }
      <div className={clsx(styles.error_actions, "flex-col sm:flex-row items-stretch sm:items-center text-center")}>
        <Link className="button primary" href="/">
          Return to Homepage
        </Link>
      { error.stack && !details
        ? <>
            <div className="separator">OR</div>
            <button className="button seconday" onClick={() => setDetails(true)}>Show Details</button>
          </>
        : null }
      </div>
    </div>
  )
};

export { Error }
