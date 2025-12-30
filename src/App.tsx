import { useState } from 'react';
import ProjectsSidebar from './components/ProjectsSidebar';
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

  const removeProject = (projectTitle: string) => {
    setProjectList((prevProjectList) => {
      const updatedProjectList = prevProjectList.filter(
        (project) => project.title !== projectTitle
      );
      return updatedProjectList;
    });

    if (tasksList && Object.keys(tasksList).includes(projectTitle)) {
      setTasksList((prevTaskList) => {
        delete prevTaskList?.[projectTitle];
        return prevTaskList;
      });
    }

    setSelectedProject(null);
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

  const removeTaskFromProject = (projectTitle: string, task: string) => {
    if (!tasksList || !Object.keys(tasksList).includes(projectTitle)) return;

    setTasksList((prevTaskList) => {
      const updatedTasks = prevTaskList?.[projectTitle]?.filter(
        (t) => t !== task
      );
      if (updatedTasks) {
        return {
          ...prevTaskList,
          [projectTitle]: [...updatedTasks],
        };
      } else {
        delete prevTaskList?.[projectTitle];
        return prevTaskList;
      }
    });
  };

  return (
    <>
      <main className="h-screen my-8">
        <ProjectsSidebar
          projects={projectList}
          onAddProject={handleNewProject}
          onSelectProject={handleSelectProject}
        />
        <div className="p-4 w-[32rem]">
          {newProject && (
            <NewProject onSaveProject={addNewProject} onCancel={handleCancel} />
          )}
          {selectedProject && !newProject && (
            <ProjectDetails
              project={selectedProject}
              removeProject={removeProject}
              addTask={addTaskToProject}
              tasks={tasksList?.[selectedProject.title]}
              removeTask={removeTaskFromProject}
            />
          )}
          {!selectedProject && !newProject && (
            <NoProjectSelected onAddProject={handleNewProject} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
