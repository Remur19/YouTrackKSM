import React from 'react';
import TaskEditModule from './TaskEditModule';

interface TaskProps{
    name: string;
    tag: string;
}

const Task: React.FC<TaskProps> = ({ name, tag }) => {

  return (
    <>
        <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm mx-auto">
        <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-indigo-600">{tag}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <TaskEditModule name='' tag=''></TaskEditModule>
            <button className="bg-red-500 text-white rounded py-2 hover:bg-red-600">Delete</button>
            <button className="bg-green-500 text-white rounded py-2 hover:bg-green-600">Done</button>
            <button className="bg-yellow-500 text-white rounded py-2 hover:bg-yellow-600">Move</button>
        </div>
        </div>
    </>
  );
};

export default Task;
