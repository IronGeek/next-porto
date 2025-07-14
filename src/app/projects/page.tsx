import { Main } from '@/components/main';

import { ProjectList } from '@/components/project-list';
import { projects } from '@/lib/data';

const ProjectsPage = () => {
  return (
    <Main title="My Projects">
      <div className="flex self-center">
        <ProjectList
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
          data={projects} />
      </div>
    </Main>
  )
}

export default ProjectsPage;
