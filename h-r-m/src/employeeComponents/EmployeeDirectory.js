import React, { useState } from 'react';

// Example employee data
const employees = [
  { id: 1, name: 'John Doe', jobTitle: 'Software Engineer', department: 'Engineering', email: 'johndoe@example.com', phone: '123-456-7890', location: 'New York', dateOfJoining: '2020-01-15' },
  { id: 2, name: 'Jane Smith', jobTitle: 'HR Manager', department: 'Human Resources', email: 'janesmith@example.com', phone: '987-654-3210', location: 'San Francisco', dateOfJoining: '2018-03-21' },
  { id: 3, name: 'Sam Wilson', jobTitle: 'Product Manager', department: 'Product', email: 'sam.wilson@example.com', phone: '555-123-4567', location: 'Los Angeles', dateOfJoining: '2019-07-10' },
  { id: 4, name: 'Alex Turner', jobTitle: 'Lead Developer', department: 'Engineering', email: 'alex.turner@example.com', phone: '555-234-5678', location: 'Chicago', dateOfJoining: '2017-11-03' },
  { id: 5, name: 'Sara Lee', jobTitle: 'UI/UX Designer', department: 'Design', email: 'sara.lee@example.com', phone: '555-345-6789', location: 'Austin', dateOfJoining: '2021-02-14' },
  // Add more employees...
];

const EmployeeDirectory = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter employees based on the search input
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate the total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Calculate employees to display for the current page
  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Update search handler to reset page when search changes
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-700 mb-4">Employee Directory</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, role, or department"
          value={search}
          onChange={handleSearch}
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Employee Table */}
      <table className="w-full mt-6 border-collapse bg-white rounded-lg shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Job Title</th>
            <th className="px-6 py-3 text-left">Department</th>
            <th className="px-6 py-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees.length > 0 ? (
            displayedEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-t">{employee.name}</td>
                <td className="px-6 py-4 border-t">{employee.jobTitle}</td>
                <td className="px-6 py-4 border-t">{employee.department}</td>
                <td className="px-6 py-4 border-t">{employee.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
