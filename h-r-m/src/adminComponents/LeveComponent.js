import React, { useState } from 'react';

// Sample employee data (with levels)
const sampleEmployees = [
  { id: 1, name: 'John Doe', role: 'Developer', level: 'Junior', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', role: 'HR Manager', level: 'Senior', department: 'Human Resources' },
  { id: 3, name: 'Sam Wilson', role: 'Developer', level: 'Mid-Level', department: 'Engineering' },
  { id: 4, name: 'Alex Turner', role: 'Team Lead', level: 'Lead', department: 'Engineering' },
  { id: 5, name: 'Sara Lee', role: 'Designer', level: 'Mid-Level', department: 'Design' },
  // Add more employees as needed...
];

const LevelComponent = () => {
  const [employees, setEmployees] = useState(sampleEmployees);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRadioChange = (id, action) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === id ? { ...employee, action } : employee
    );
    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Levels</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />

      {/* Employee Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Level</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{employee.name}</td>
              <td className="px-4 py-2 border">{employee.role}</td>
              <td className="px-4 py-2 border">{employee.level}</td>
              <td className="px-4 py-2 border">{employee.department}</td>
              <td className="px-4 py-2 border">
                {/* Radio Buttons for Accept and Cancel */}
                <label className="mr-4">
                  <input
                    type="radio"
                    name={`action-${employee.id}`}
                    value="Accept"
                    checked={employee.action === 'Accept'}
                    onChange={() => handleRadioChange(employee.id, 'Accept')}
                  />
                  Accept
                </label>
                <label>
                  <input
                    type="radio"
                    name={`action-${employee.id}`}
                    value="Cancel"
                    checked={employee.action === 'Cancel'}
                    onChange={() => handleRadioChange(employee.id, 'Cancel')}
                  />
                  Cancel
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        {/* Pagination Controls (Optional, if you have many employees) */}
        <button className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">
          Previous
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default LevelComponent;
