import type { Project } from './App';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="p-6 w-full flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <button>Delete</button>
      </div>
      <p className="text-neutral-500">{project.dueDate}</p>
      <p>{project.description}</p>
      <hr className="border-solid border-2" />
    </div>
  );
};

export default ProjectDetails;
