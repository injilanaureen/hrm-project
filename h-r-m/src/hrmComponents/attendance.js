// import React, { useState } from 'react';

// // Sample attendance data (you may fetch this from an API)
// const sampleData = [
//   { id: 1, name: 'John Doe', checkIn: '09:00 AM', checkOut: '06:00 PM' },
//   { id: 2, name: 'Jane Smith', checkIn: '08:30 AM', checkOut: '05:30 PM' },
//   { id: 3, name: 'Sam Wilson', checkIn: '09:15 AM', checkOut: '06:15 PM' },
//   // Add more sample data as required
// ];

// const Attendance = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;

//   const totalPages = Math.ceil(sampleData.length / itemsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const currentData = sampleData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
//       {/* Current Date */}
//       <p className="text-sm text-gray-600 mb-4">
//         Current Date: <strong>{new Date().toLocaleDateString()}</strong>
//       </p>

//       {/* Attendance Table */}
//       <table className="w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Check-In</th>
//             <th className="px-4 py-2 border">Check-Out</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.map((record) => (
//             <tr key={record.id} className="hover:bg-gray-100">
//               <td className="px-4 py-2 border">{record.id}</td>
//               <td className="px-4 py-2 border">{record.name}</td>
//               <td className="px-4 py-2 border">{record.checkIn}</td>
//               <td className="px-4 py-2 border">{record.checkOut}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Attendance;

import React from 'react';
 
const Attendance = () => {

  const attendanceData = [

    { date: '26 Jan 2025, Sun', status: 'Weekly Off' },

    { date: '27 Jan 2025, Mon', status: 'On Leave (Earned Leave)' },

    {

      date: '28 Jan 2025, Tue',

      timeIn: '10:17:09',

      timeOut: '19:18:34',

      totalWork: '09:01:25',

      lateBy: '00:17:09',

      recordedClockIn: '10:17:09',

      recordedClockOut: '19:18:34',

      status: 'Present'

    },

    // Add more data as needed

  ];
 
  return (
<div className="p-4 bg-white rounded-lg shadow">

      {/* Header */}
<div className="flex justify-between items-center mb-6">
<h1 className="text-xl font-semibold">Attendance for 2025-Feb</h1>
<div className="flex gap-2">
<span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">

            Pending Request (0)
</span>
<span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">

            System Triggered Leave (2)
</span>
<button className="px-4 py-1 bg-purple-500 text-white rounded-lg">

            APPLY
</button>
</div>
</div>
 
      {/* Search and Controls */}
<div className="flex justify-between items-center mb-6">
<div className="flex gap-2">
<input

            type="text"

            placeholder="Search Employee"

            className="px-4 py-2 border rounded-lg"

          />
<button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg">

            ONE VIEW
</button>
</div>
<div className="flex gap-2">
<select className="px-4 py-2 border rounded-lg">
<option>2025-Feb</option>
</select>
<select className="px-4 py-2 border rounded-lg">
<option>2025</option>
</select>
<button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg">

            REGULARIZE
</button>
</div>
</div>
 
      {/* Statistics */}
<div className="grid grid-cols-2 gap-4 mb-6">
<div className="border rounded-lg p-4">
<h2 className="text-lg font-medium mb-4">Total</h2>
<div className="grid grid-cols-3 gap-4">
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
<h2 className="text-lg font-medium mb-4">AVERAGE</h2>
<div className="grid grid-cols-2 gap-4">
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
<div className="grid grid-cols-4 gap-4 mb-6">
<div className="border rounded-lg p-4">
<h3 className="font-medium mb-2">Clocking Priority</h3>
<p>BIOMETRIC</p>
</div>
<div className="border rounded-lg p-4">
<h3 className="font-medium mb-2">Shift</h3>
<p className="text-sm">Standard Shift(noida and kolkata) (10:00:00 - 19:00:00)</p>
</div>
<div className="border rounded-lg p-4">
<h3 className="font-medium mb-2">Policy</h3>
<p className="text-purple-600">New Attendance Policy</p>
</div>
<div className="border rounded-lg p-4">
<h3 className="font-medium mb-2">Weekly Off</h3>
<p className="text-sm">Saturday and Sunday Weekly Off</p>
<p className="text-sm text-gray-500">(All Saturday,All Sunday)</p>
</div>
</div>
 
      {/* Legend */}
<div className="flex gap-4 mb-6">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-gray-300"></div>
<span>Pending request</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-green-500"></div>
<span>Approved requests</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-purple-500"></div>
<span>Weekly Off</span>
</div>

        {/* Add more legend items */}
</div>
 
      {/* Table */}
<div className="overflow-x-auto">
<table className="w-full">
<thead className="bg-gray-50">
<tr>
<th className="px-4 py-2 text-left">DATE</th>
<th className="px-4 py-2 text-left">TIME IN</th>
<th className="px-4 py-2 text-left">TIME OUT</th>
<th className="px-4 py-2 text-left">TOTAL WORK DURATION</th>
<th className="px-4 py-2 text-left">LATE BY</th>
<th className="px-4 py-2 text-left">RECORDED CLOCKIN</th>
<th className="px-4 py-2 text-left">RECORDED CLOCKOUT</th>
<th className="px-4 py-2 text-left">STATUS</th>
<th className="px-4 py-2 text-left">OPERATION</th>
<th className="px-4 py-2 text-left">ASSIGNMENT</th>
</tr>
</thead>
<tbody>

            {attendanceData.map((row, index) => (
<tr key={index} className="border-b">
<td className="px-4 py-2">{row.date}</td>
<td className="px-4 py-2">{row.timeIn || '-'}</td>
<td className="px-4 py-2">{row.timeOut || '-'}</td>
<td className="px-4 py-2">{row.totalWork || '-'}</td>
<td className="px-4 py-2">{row.lateBy || '-'}</td>
<td className="px-4 py-2">{row.recordedClockIn || '-'}</td>
<td className="px-4 py-2">{row.recordedClockOut || '-'}</td>
<td className="px-4 py-2">
<span className={`${

                    row.status === 'Weekly Off' ? 'text-purple-600' :

                    row.status.includes('Leave') ? 'text-green-600' :

                    'text-black'

                  }`}>

                    {row.status}
</span>
</td>
<td className="px-4 py-2">
<div className="flex gap-2">
<button className="p-1 text-gray-500 hover:text-gray-700">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
<button className="p-1 text-gray-500 hover:text-gray-700">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
</button>
</div>
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
 