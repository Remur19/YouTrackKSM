import { useState } from 'react';
import Textfield from './components/Textfield';
import Task from './components/Task';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask('');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <Textfield
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={setTask}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((t, i) => (
          <Task key={i} name={t} tag={`Task #${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
