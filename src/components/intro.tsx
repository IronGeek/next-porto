import clsx from 'clsx';
import Link from 'next/link';

import styles from './intro.module.scss';
import Image from 'next/image';

const Intro = () => {
  return (
    <div className={clsx(styles.intro, 'flex-col lg:flex-row')}>
      <Image
        className={styles.profile_image}
        alt="Justin Case"
        src="/profile.png"
        width={360}
        height={360}
        sizes="(max-width: 64rem) 240px, 360px"
      />
      <div className={styles.container}>
        <div className={styles.greetings}>Hey, it's Me...!</div>
        <h1 className={clsx(styles.intro_name, "gradient-text text-center lg:text-start")}>Justin Case</h1>
        <h2 className={clsx(styles.intro_title, "text-center ld:text-start")}>Full-Stack Developer & UI/UX Enthusiast</h2>
        <div className={clsx(styles.intro_bio, "dropcap")}>
          <p>
            A passionate <strong>full-stack developer</strong> with a keen eye for <strong>detail</strong> and a love for <strong>creating intuitive user experiences</strong>.
            Fascinated for how code can <strong>bring ideas to life</strong>. I thrive on <strong>solving complex problems</strong> and constantly exploring new technologies
            to <strong>deliver innovative and efficient solutions</strong>.
          </p>
          <p>
            When I'm not coding, you can find me <strong>sketching</strong> out new app ideas, <strong>vibing</strong> the latest design trends,
            or <strong>contributing</strong> to open source projects.
          </p>
        </div>
        <div className={clsx(styles.intro_actions, "flex-col sm:flex-row items-stretch text-center")}>
          <Link className="button primary" href="/profile">
            Full Profile
          </Link>
          <Link className="button secondary" href="/profile">
            Download CV
          </Link>
          <Link className="button secondary" href="/contact">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  )
}

export { Intro }
