import clsx from 'clsx';

import type { FC, HTMLProps } from 'react';

import styles from './footer.module.scss';

type FooterProps = HTMLProps<HTMLDivElement>;

const Footer: FC<FooterProps> = ({ className, ...props }) => (
  <div {...props} className={clsx(styles.footer, className)}>
    <div>Made with 💖 by Jakka Prihatna</div>
    <div className={styles.copyright}>
      Copyright &copy; {new Date().getFullYear()}. All rights reserved</div>
  </div>
);

export { Footer };
