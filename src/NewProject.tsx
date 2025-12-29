import { useRef } from 'react';
import type { Project } from './App';

interface NewProjectProps {
  onSaveProject: (project: Project) => void;
  onCancel: () => void;
}

const NewProject = ({ onSaveProject, onCancel }: NewProjectProps) => {
  const title = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLTextAreaElement | null>(null);
  const dueDate = useRef<HTMLInputElement | null>(null);

  const handleSave = () => {
    if (
      !title.current ||
      !title.current.value ||
      !description.current ||
      !description.current.value ||
      !dueDate.current ||
      !dueDate.current.value
    )
      return;

    const project: Project = {
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
    };

    onSaveProject(project);
    clearForm();
  };

  const handleCancel = () => {
    clearForm();
    onCancel();
  };

  const clearForm = () => {
    if (title.current) {
      title.current.value = '';
    }

    if (description.current) {
      description.current.value = '';
    }

    if (dueDate.current) {
      dueDate.current.value = '';
    }
  };

  return (
    <>
      <div className="flex flex-col w-96 p-8 gap-6">
        <div className="flex justify-end gap-2">
          <button onClick={handleCancel}>Cancel</button>
          <button
            className="rounded bg-black text-white py-1 px-4 hover:bg-neutral-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="text-neutral-700 uppercase text-sm"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              ref={title}
              className="bg-neutral-300 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-neutral-700 uppercase text-sm"
            >
              Description
            </label>
            <textarea
              id="description"
              ref={description}
              className="bg-neutral-300 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="dueDate"
              className="text-neutral-700 uppercase text-sm"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              ref={dueDate}
              className="bg-neutral-300 p-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProject;
