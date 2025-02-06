import React, { useState } from 'react';

// StatusToggle Component (You can keep this as it is)
const StatusToggle = () => {
  const [status, setStatus] = useState('Active'); // Initial state

  const handleChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <div className="flex space-x-4">
        <button
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            status === 'Active'
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300`}
          onClick={() => handleChange('Active')}
        >
          Active
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            status === 'Inactive'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300`}
          onClick={() => handleChange('Inactive')}
        >
          Inactive
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            status === 'Pending'
              ? 'bg-yellow-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300`}
          onClick={() => handleChange('Pending')}
        >
          Pending
        </button>
      </div>
      <p className="mt-4 text-lg font-semibold">Status: {status}</p>
    </div>
  );
};

// TaskBox Component (Modified to remove Task List and Pagination)
const TaskBox = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleAddTask = () => {
    const newTask = { employeeName, title, description, dueDate, status };
    setTasks([...tasks, newTask]);
    setShowModal(false);
    // Clear fields after adding the task
    setEmployeeName('');
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Task Add Button */}
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-full"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>

      {/* Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4">Add New Task</h2>
            <div>
              <label className="block text-sm font-medium">Employee Name</label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="border w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border w-full p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border w-full p-2 mt-1"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Page Component
const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <TaskBox />
      <StatusToggle />
      
    </div>
  );
};

export default MainPage;
