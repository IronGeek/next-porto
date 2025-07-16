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

interface TagsSkeletonProps {
  readonly count?: number
  readonly vertical?: boolean
}
const TagsSkeleton= ({ count, vertical }: TagsSkeletonProps) => {
  const items = [...Array(count).keys()];

  return (
    <ul className={clsx(styles.tags_skeleton, vertical ? styles.tags_vertical : undefined)}>
      { items.map((v, i) => (
          <li key={i}><div className="skeleton-line h-2.5 w-20"></div></li>
        ))
      }
    </ul>
  );
};

export { Tags, TagsSkeleton }
