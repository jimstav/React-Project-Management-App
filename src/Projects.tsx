import { useState } from 'react';
import type { Project } from './App';

interface ProjectsProps {
  projects: Project[];
  onAddProject: (add: boolean) => void;
  onSelectProject: (title: string) => void;
}

const Projects = ({
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
    <>
      <h2 className="uppercase font-bold">Your Projects</h2>
      <div className="p-2">
        <button
          className="rounded bg-neutral-700 p-3 hover:bg-neutral-800 text-neutral-400"
          onClick={() => onAddProject(true)}
        >
          + Add Project
        </button>
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
    </>
  );
};

export default Projects;
