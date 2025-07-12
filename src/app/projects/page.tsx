import { Main } from '@/components/main';
import { Stack } from '@/components/stack';

import styles from './page.module.scss';
import { projects } from '@/lib/data';
import Link from 'next/link';

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
                    <Link href={"/projects/" + prj.slug}>
                        <div className={styles.project_name}>{prj.name}</div>
                        <div className={styles.project_title}>{prj.title}</div>
                      </Link>
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
