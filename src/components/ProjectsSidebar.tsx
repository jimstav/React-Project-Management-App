import { useState } from 'react';
import type { Project } from '../App';
import Button from './Button';

interface ProjectsProps {
  projects: Project[];
  onAddProject: (add: boolean) => void;
  onSelectProject: (title: string) => void;
}

const ProjectsSidebar = ({
  projects,
  onAddProject,
  onSelectProject,
}: ProjectsProps) => {
  const [selectedProjectTitle, setSelectedProjectTitle] = useState('');

  const handleSelectProject = (title: string) => {
    onSelectProject(title);
    setSelectedProjectTitle(title);
  };

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={() => onAddProject(true)}>+ Add Project</Button>
      </div>
      <ul className="p-2">
        {projects.map((project) => (
          <li
            className={`hover:bg-neutral-800 ${
              project.title === selectedProjectTitle ? 'bg-neutral-900' : ''
            }`}
            key={project.title}
          >
            <button
              className="w-full flex flex-row justify-start"
              onClick={() => handleSelectProject(project.title)}
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
