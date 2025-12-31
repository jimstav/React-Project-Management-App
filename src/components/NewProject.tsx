import { useRef } from 'react';
import type { ProjectData } from '../App';
import Input from './Input';

interface NewProjectProps {
  onAdd: (project: ProjectData) => void;
  onCancel: () => void;
}

const NewProject = ({ onAdd, onCancel }: NewProjectProps) => {
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

    const enteredData: ProjectData = {
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
    };

    onAdd(enteredData);
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
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <button
          className="text-stone-800 hover:text-stone-950"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50  hover:bg-stone-950"
          onClick={handleSave}
        >
          Save
        </button>
      </menu>
      <div>
        <Input type="text" ref={title} label="Title" />
        <Input ref={description} label="Description" textarea />
        <Input type="date" ref={dueDate} label="Due Date" />
        {/* <p className="flex flex-col gap-1">
          <label htmlFor="title" className="text-neutral-700 uppercase text-sm">
            Title
          </label>
          <input
            type="text"
            id="title"
            ref={title}
            className="bg-neutral-300 p-1"
          />
        </p>
        <p className="flex flex-col gap-1">
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
        </p>
        <p className="flex flex-col gap-1">
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
        </p> */}
      </div>
    </div>
  );
};

export default NewProject;
