import clsx from 'clsx';

import styles from './tags.module.scss';

interface TagsProps {
  readonly tags?: string | string[]
  readonly vertical?: boolean
}

const Tags = ({ tags, vertical }: TagsProps) => {
  const items = Array.isArray(tags) ? tags : [tags];

  return (
    <ul className={clsx(styles.tags, vertical ? styles.tags_vertical : undefined)}>
      { items.map((item) => (
          <li key={item}>{item}</li>
        ))
      }
    </ul>
  );
};

export { Tags }
