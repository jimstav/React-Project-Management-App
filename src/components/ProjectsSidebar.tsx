import { useState } from 'react';
import type { Project } from '../App';
import Button from './Button';

interface ProjectsProps {
  onStartAddProject: () => void;
  projects: Project[];
  // onSelectProject: (title: string) => void;
}

const ProjectsSidebar = ({
  onStartAddProject,
  projects,
}: // projects,
// onSelectProject,
ProjectsProps) => {
  // const [selectedProjectTitle, setSelectedProjectTitle] = useState('');

  // const handleSelectProject = (title: string) => {
  //   onSelectProject(title);
  //   setSelectedProjectTitle(title);
  // };

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"
              // onClick={() => handleSelectProject(project.title)}
            >
              {project.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProjectsSidebar;
