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
    <div className="p-4 bg-white rounded-lg shadow w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-lg md:text-xl font-semibold text-center md:text-left">Attendance for 2025-Feb</h1>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending Request (0)</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">System Triggered Leave (2)</span>
          <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">APPLY</button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
        <div className="flex w-full md:w-auto gap-2">
          <input type="text" placeholder="Search Employee" className="px-4 py-2 border rounded-lg w-full md:w-auto" />
          <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg">ONE VIEW</button>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <select className="px-4 py-2 border rounded-lg w-full md:w-auto">
            <option>2025-Feb</option>
          </select>
          <select className="px-4 py-2 border rounded-lg w-full md:w-auto">
            <option>2025</option>
          </select>
          <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg">REGULARIZE</button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">Total</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-gray-500">Leave Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold">9</div>
              <div className="text-gray-500">Present Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-gray-500">Absent Days</div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">AVERAGE</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">09:02</div>
              <div className="text-gray-500">Work Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold">00:19</div>
              <div className="text-gray-500">Late By</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Clocking Priority</h3>
          <p>BIOMETRIC</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Shift</h3>
          <p className="text-sm">Standard Shift (10:00:00 - 19:00:00)</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Policy</h3>
          <p className="text-purple-600">New Attendance Policy</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Weekly Off</h3>
          <p className="text-sm">Saturday and Sunday</p>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["DATE", "TIME IN", "TIME OUT", "WORK DURATION", "LATE BY", "CLOCK IN", "CLOCK OUT", "STATUS", "OPERATION", "ASSIGNMENT"].map((heading) => (
                <th key={heading} className="px-4 py-2 text-left whitespace-nowrap">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.timeIn || "-"}</td>
                <td className="px-4 py-2">{row.timeOut || "-"}</td>
                <td className="px-4 py-2">{row.totalWork || "-"}</td>
                <td className="px-4 py-2">{row.lateBy || "-"}</td>
                <td className="px-4 py-2">{row.recordedClockIn || "-"}</td>
                <td className="px-4 py-2">{row.recordedClockOut || "-"}</td>
                <td className="px-4 py-2">
                  <span className={`font-medium ${row.status === "Weekly Off" ? "text-purple-600" : row.status.includes("Leave") ? "text-green-600" : "text-black"}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-gray-500 hover:text-gray-700">Edit</button>
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
