import type { Project } from './App';
import Tasks from './Tasks';

interface ProjectDetailsProps {
  project: Project;
  addTask: (projectTitle: string, task: string) => void;
  tasks: string[] | undefined;
  removeTask: (projectTitle: string, task: string) => void;
}

const ProjectDetails = ({
  project,
  addTask,
  tasks,
  removeTask,
}: ProjectDetailsProps) => {
  return (
    <div className="p-6 w-full flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <button>Delete</button>
      </div>
      <p className="text-neutral-500">{project.dueDate}</p>
      <p>{project.description}</p>
      <hr className="border-solid border-2" />
      <Tasks
        projectTitle={project.title}
        addTask={addTask}
        tasks={tasks}
        removeTask={removeTask}
      />
    </div>
  );
};

export default ProjectDetails;
