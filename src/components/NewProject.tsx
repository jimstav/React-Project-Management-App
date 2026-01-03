import { useRef } from 'react';
import type { ProjectData } from '../App';
import Input from './Input';
import Modal, { type ModalHandle } from './Modal';

interface NewProjectProps {
  onAdd: (project: ProjectData) => void;
  onCancel: () => void;
}

const NewProject = ({ onAdd, onCancel }: NewProjectProps) => {
  const modal = useRef<ModalHandle>(null);

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const enteredData: ProjectData = {
      title: title.current?.value.trim() ?? '',
      description: description.current?.value.trim() ?? '',
      dueDate: dueDate.current?.value.trim() ?? '',
    };

    if (
      enteredData.title === '' ||
      enteredData.description === '' ||
      enteredData.dueDate === ''
    ) {
      modal.current?.open();
      return;
    }

    onAdd(enteredData);
  };

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops.. Looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <button
            className="text-stone-800 hover:text-stone-950"
            onClick={onCancel}
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
        </div>
      </div>
    </>
  );
};

export default NewProject;
