import clsx from 'clsx';
import { isValidElement, type ComponentProps } from 'react';

import styles from './quote.module.scss';

interface QuoteProps extends ComponentProps<'blockquote'> {
}

const Quote = ({ className, cite, children, ...props }: QuoteProps) => {
  return (
    <blockquote cite={cite}
      {...props}
      className={clsx(styles.quote, className)}>
      <div className={styles.quote_content}>
        { isValidElement(children) ? children : children ? <div>{children}</div> : null }
        <div className={styles.quote_cite}>— {cite}</div>
      </div>
    </blockquote>
  )
};

export { Quote };
export type { QuoteProps };
