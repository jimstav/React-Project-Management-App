import { useState } from 'react';
import ProjectsSidebar from './components/ProjectsSidebar';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';
import NewProject from './components/NewProject';

export type ProjectData = {
  title: string;
  description: string;
  dueDate: string;
};

export type Project = ProjectData & { id: number };

export type Task = {
  id: number;
  text: string;
  projectId: number;
};

export type Tasks = {
  [projectTitle: string]: string[];
};

type ProjectsState = {
  selectedProjectId: number | null | undefined;
  projects: Project[];
  tasks: Task[];
};

function App() {
  const [projectsState, setProjectsState] = useState<ProjectsState>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleAddProject = (projectData: ProjectData) => {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const handleSelectProject = (id: number) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  function handleAddTask(text: string) {
    setProjectsState((prevState) => {
      if (!prevState.selectedProjectId) return prevState;

      const taskId = Math.random();
      const newTask: Task = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id: number) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  // const [newProject, setNewProject] = useState(false);
  // const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
  //   null
  // );
  const [projectList, setProjectList] = useState<ProjectData[]>([]);
  const [tasksList, setTasksList] = useState<Tasks | null>(null);

  // const handleNewProject = (add: boolean) => {
  //   setNewProject(add);
  // };

  // const addNewProject = (project: ProjectData) => {
  //   if (projectList.find((p) => p.title === project.title)) return;
  //   setProjectList((prevProjectList) => {
  //     return [...prevProjectList, project];
  //   });
  // };

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

    // setSelectedProject(null);
  };

  // const handleCancel = () => {
  //   setNewProject(false);
  //   setSelectedProject(null);
  // };

  // const handleSelectProject = (title: string) => {
  //   const projectToSelect = projectList.find(
  //     (project) => project.title === title
  //   );
  //   if (!projectToSelect) return;
  //   setNewProject(false);
  //   setSelectedProject(projectToSelect);
  // };

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

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const selectedProjectTasks = projectsState.tasks.filter(
    (task) => task.projectId === selectedProject?.id
  );

  let content = selectedProject ? (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={selectedProjectTasks}
    />
  ) : (
    ''
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
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
