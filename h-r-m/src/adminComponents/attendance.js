import React, { useState } from 'react';

// Sample attendance data (you may fetch this from an API)
const sampleData = [
  { id: 1, name: 'John Doe', checkIn: '09:00 AM', checkOut: '06:00 PM' },
  { id: 2, name: 'Jane Smith', checkIn: '08:30 AM', checkOut: '05:30 PM' },
  { id: 3, name: 'Sam Wilson', checkIn: '09:15 AM', checkOut: '06:15 PM' },
  // Add more sample data as required
];

const Attendance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentData = sampleData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      {/* Current Date */}
      <p className="text-sm text-gray-600 mb-4">
        Current Date: <strong>{new Date().toLocaleDateString()}</strong>
      </p>

      {/* Attendance Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Check-In</th>
            <th className="px-4 py-2 border">Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((record) => (
            <tr key={record.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{record.id}</td>
              <td className="px-4 py-2 border">{record.name}</td>
              <td className="px-4 py-2 border">{record.checkIn}</td>
              <td className="px-4 py-2 border">{record.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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

export default Attendance;
