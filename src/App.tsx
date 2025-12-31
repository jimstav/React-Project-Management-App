import { useState } from 'react';
import ProjectsSidebar from './components/ProjectsSidebar';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectDetails from './ProjectDetails';
import NewProject from './components/NewProject';

export type Project = {
  title: string;
  description: string;
  dueDate: string;
};

export type Tasks = {
  [projectTitle: string]: string[];
};

type ProjectsState = {
  selectedProjectId: string | null | undefined;
  projects: Project[];
};

function App() {
  const [projectsState, setProjectsState] = useState<ProjectsState>({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

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

  let content;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onSaveProject={addNewProject} onCancel={handleCancel} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject} />
        {content}

        {/* {newProject && (
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
        )} */}
      </main>
    </>
  );
}

export default App;
