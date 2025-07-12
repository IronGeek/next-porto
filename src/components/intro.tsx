import clsx from 'clsx';
import Link from 'next/link';

import styles from './intro.module.scss';
import Image from 'next/image';

const Intro = () => {
  return (
    <div className={styles.intro}>
      <Image className={styles.profile_image} alt="Justin Case" src="/profile.png" width={360} height={360} />
      <div className={styles.container}>
        <div className={styles.greetings}>Hey, it's Me...!</div>
        <h1 className={clsx(styles.intro_name, "gradient-text")}>Justin Case</h1>
        <h2 className={styles.intro_title}>Full-Stack Developer & UI/UX Enthusiast</h2>
        <div className={styles.intro_bio}>
          <p className="dropcap">
            A passionate <strong>full-stack developer</strong> with a keen eye for <strong>detail</strong> and a love for <strong>creating intuitive user experiences</strong>.
            Fascinated for how code can <strong>bring ideas to life</strong>. I thrive on <strong>solving complex problems</strong> and constantly exploring new technologies to
            <strong>deliver innovative and efficient solutions</strong>.
          </p>
          <p>
            When I'm not coding, you can find me sketching out new app ideas or vibing the latest design trends.
          </p>
        </div>
        <div className={styles.intro_actions}>
          <Link className="button primary" href="/profile">
            See Full Profile
          </Link>
          <Link className="button secondary" href="/contact">
            Contact Me
          </Link>
          <div className="separator">OR</div>
          <Link className="button secondary" href="/profile">
            Download CV
          </Link>
        </div>
      </div>
    </div>
  )
}

export { Intro }
