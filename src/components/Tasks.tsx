import { useRef, useEffect } from 'react';
import NewTask from './NewTask';
import type { Task } from '../App';

interface TasksProps {
  projectTitle: string;
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
  tasks: Task[];
}

const Tasks = ({ projectTitle, onAdd, onDelete, tasks }: TasksProps) => {
  const taskRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (taskRef.current) {
  //     taskRef.current.value = '';
  //   }
  // }, [projectTitle]);

  // const handleAdd = (projectTitle: string, task: string | undefined) => {
  //   if (!task) return;
  //   addTask(projectTitle, task);
  //   taskRef.current!.value = '';
  // };

  // const handleRemove = (taskToRemove: string) => {
  //   removeTask(projectTitle, taskToRemove);
  // };

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
