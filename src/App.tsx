import { useState } from 'react';
import Projects from './Projects';
import NoProjectSelected from './NoProjectSelected';
import ProjectDetails from './ProjectDetails';
import NewProject from './NewProject';

export type Project = {
  title: string;
  description: string;
  dueDate: string;
};

export type Tasks = {
  [projectTitle: string]: string[];
};

function App() {
  const [newProject, setNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [tasksList, setTasksList] = useState<Tasks | null>(null);

  const handleNewProject = (add: boolean) => {
    setNewProject(add);
  };

  const addNewProject = (project: Project) => {
    if (projectList.find((p) => p.title === project.title)) return;
    setProjectList((prevProjectList) => {
      return [...prevProjectList, project];
    });
  };

  const handleCancel = () => {
    setNewProject(false);
    setSelectedProject(null);
  };

  const handleSelectProject = (title: string) => {
    const projectToSelect = projectList.find(
      (project) => project.title === title
    );
    if (!projectToSelect) return;
    setNewProject(false);
    setSelectedProject(projectToSelect);
  };

  const addTaskToProject = (projectTitle: string, task: string) => {
    if (tasksList && Object.keys(tasksList).includes(projectTitle)) {
      setTasksList((prevTaskList) => {
        const prevTasks = prevTaskList?.[projectTitle];
        return {
          ...prevTaskList,
          [projectTitle]: [...prevTasks!, task],
        };
      });
    } else {
      setTasksList((prevTaskList) => {
        return {
          ...prevTaskList,
          [projectTitle]: [task],
        };
      });
    }
  };

  return (
    <>
      <div className="grid grid-flow-col auto-cols-max w-full h-screen">
        <aside className="p-4 bg-black text-white rounded-tr-xl w-60 mt-6">
          <Projects
            projects={projectList}
            onAddProject={handleNewProject}
            onSelectProject={handleSelectProject}
          />
        </aside>
        <main className="p-4 w-[32rem]">
          {newProject && (
            <NewProject onSaveProject={addNewProject} onCancel={handleCancel} />
          )}
          {selectedProject && !newProject && (
            <ProjectDetails
              project={selectedProject}
              addTask={addTaskToProject}
              tasks={tasksList?.[selectedProject.title]}
            />
          )}
          {!selectedProject && !newProject && (
            <NoProjectSelected onAddProject={handleNewProject} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
