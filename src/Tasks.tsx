import { useRef } from 'react';

interface TasksProps {
  projectTitle: string;
  addTask: (projectTitle: string, task: string) => void;
  tasks: string[] | undefined;
}

const Tasks = ({ projectTitle, addTask, tasks }: TasksProps) => {
  const taskRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = (projectTitle: string, task: string | undefined) => {
    if (!task) return;
    addTask(projectTitle, task);
    taskRef.current!.value = '';
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">Tasks</h2>
      <div className="flex gap-2">
        <input type="text" ref={taskRef} className="bg-neutral-300 p-1" />
        <button onClick={() => handleAdd(projectTitle, taskRef.current?.value)}>
          Add Task
        </button>
      </div>
      {tasks ? (
        <div className="bg-neutral-200 flex flex-col">
          {tasks.map((task) => (
            <div className="flex justify-between p-2">
              <p>{task}</p>
              <button>Clear</button>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Tasks;
