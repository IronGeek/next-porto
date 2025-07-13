import { Main } from '@/components/main';
import { Stack } from '@/components/stack';

import styles from './page.module.scss';
import { projects } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

const ProjectsPage = () => {
  return (
    <Main>
      <Stack className={styles.stack}>
        <div className={styles.projects}>
          <h1>My Projects</h1>
          <div>
            <ul className={styles.project_list}>
              { projects.map((prj) => {
                return (
                  <li className={styles.project_item} key={prj.name}>
                    <Image alt={prj.name} src={`/${prj.slug}.png`} width={300} height={300} />
                    <div className={styles.project_body}>
                      <Link href={"/projects/" + prj.slug}>
                        <div className={styles.project_name}>{prj.name}</div>
                        <div className={styles.project_title}>{prj.title}</div>
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Stack>
    </Main>
  )
}

export default ProjectsPage;
