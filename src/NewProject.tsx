const NewProject = () => {
  return (
    <>
      <div className="flex flex-col w-96 p-8 gap-6">
        <div className="flex justify-end gap-2">
          <button>Cancel</button>
          <button className="rounded bg-black text-white py-1 px-4 hover:bg-neutral-700">
            Save
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="" className="text-neutral-700 uppercase text-sm">
              Title
            </label>
            <input type="text" className="bg-neutral-300 p-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-neutral-700 uppercase text-sm">
              Description
            </label>
            <textarea className="bg-neutral-300 p-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-neutral-700 uppercase text-sm">
              Due Date
            </label>
            <input type="date" className="bg-neutral-300 p-1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProject;
