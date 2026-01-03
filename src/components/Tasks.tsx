import { useRef, useEffect } from 'react';
import NewTask from './NewTask';

interface TasksProps {
  projectTitle: string;
  // addTask: (projectTitle: string, task: string) => void;
  // tasks: string[] | undefined;
  // removeTask: (projectTitle: string, task: string) => void;
}

const Tasks = ({ projectTitle }: TasksProps) => {
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
      <NewTask />
      {/* {tasks ? (
        <ul>
          {tasks.map((task) => (
            <li>
              <p>{task}</p>
              <button onClick={() => handleRemove(task)}>Clear</button>
            </li>
          ))}
        </ul>
      ) : ( */}
      <p className="text-stone-800 my-4">
        This project does not have any tasks yet.
      </p>
      {/* )} */}
    </section>
  );
};

export default Tasks;
