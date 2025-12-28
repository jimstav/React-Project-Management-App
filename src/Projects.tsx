import type { Project } from './App';

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <>
      <div className="uppercase font-bold">Your Projects</div>
      <div className="p-2">
        {projects.map((project) => (
          <div>{project.title}</div>
        ))}
      </div>
      <div className="p-2">
        <button className="rounded bg-neutral-700 p-3 hover:bg-neutral-800 text-neutral-400">
          + Add Project
        </button>
      </div>
    </>
  );
};

export default Projects;
