import { useState } from 'react';
import Projects from './Projects';
import NoProjectSelected from './NoProjectSelected';
import ProjectDetails from './ProjectDetails';

export type Project = {
  title: string;
  description: string;
  dueDate: Date;
};

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-flow-col auto-cols-max h-screen">
        <aside className="p-4 bg-black text-white rounded">
          <Projects />
        </aside>
        <main className="p-4">
          {selectedProject ? (
            <ProjectDetails project={selectedProject} />
          ) : (
            <NoProjectSelected />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
