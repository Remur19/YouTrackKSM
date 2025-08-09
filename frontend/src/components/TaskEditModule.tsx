import React, { useState } from 'react';
import Textfield from "./Textfield";


interface TaskProps {
  name: string;
  tag: string;
}

const TaskEditModule: React.FC<TaskProps> = ({ name, tag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Open Edit Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Edit Task</h2>
              <p className="mb-4 text-sm text-gray-600">
                  Name: <strong>{name}</strong><br />
                  <Textfield  type="text"
                              placeholder="Enter a task"
                              value={task} onChange={setTask}></Textfield>
                  Tag: <strong>{tag}</strong><br />
                  <input type="text" className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm" placeholder="Neuer Tag" />
              </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskEditModule;
