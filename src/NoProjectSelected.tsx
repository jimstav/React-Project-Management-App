import Notepad from './assets/no-projects.png';

interface NoProjectSelectedProps {
  onAddProject: (add: boolean) => void;
}

const NoProjectSelected = ({ onAddProject }: NoProjectSelectedProps) => {
  return (
    <div className="pt-10 flex flex-col items-center gap-2">
      <div className="w-12 h-12">
        <img src={Notepad} alt="Empty notepad image" />
      </div>
      <h1 className="font-bold">No Project Selected</h1>
      <p>Select a project or get started with a new one</p>
      <div className="p-2">
        <button
          className="rounded bg-neutral-700 p-3 hover:bg-neutral-800 text-neutral-400"
          onClick={() => onAddProject(true)}
        >
          Create new project
        </button>
      </div>
    </div>
  );
};

export default NoProjectSelected;
