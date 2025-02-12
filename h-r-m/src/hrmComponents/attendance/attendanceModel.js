  // Modal Component

  import React, { useState } from "react";

  const AttendanceModal = ({ showModal, onClose ,setShowModal}) => {
    const [punchInDate, setPunchInDate] = useState("26-01-2025");
    const [punchOutDate, setPunchOutDate] = useState("26-01-2025");
    const handleConfirmAttendance = () => {
        // Add your attendance submission logic here
        console.log(`Marking ${selectedEmployee.emp_full_name} as ${attendanceType}`);
        setShowModal(false);
      };
 
  
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showModal ? '' : 'hidden'}`}>
        <div className="bg-white rounded-lg p-6 w-2/5 shadow-lg relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Edit Attendance</h3>
          <hr className="mb-4" />
  
          <div className="space-y-2">
            <p><strong>Shift Date:</strong> 26-01-2025</p>
            <p><strong>Shift Name:</strong> Standard Shift (Noida and Kolkata)</p>
            <p><strong>Shift Time:</strong> 10:00:00 - 19:00:00 (09:00 hours)</p>
            <p className="text-sm italic text-gray-500">There is a "Clock-in" grace time of 15 min(s)</p>
            <p className="text-sm italic text-gray-500">There is a "Clock-out" grace time of 0 min(s)</p>
          </div>
      <hr/>
      <div className="mt-4 space-y-4">
  {/* Row 1: Punch-In */}
  <div className="flex space-x-6">
    <div className="flex flex-col">
      <label className="text-gray-600 font-medium">Punch-In Date</label>
      <input
        type="text"
        className="border p-2 rounded-lg"
        value={punchInDate}
        onChange={(e) => setPunchInDate(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-gray-600 font-medium">Punch-In Time</label>
      <div className="flex space-x-2">
        <select className="border p-2 rounded-lg">
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
          ))}
        </select>
        <select className="border p-2 rounded-lg">
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
          ))}
        </select>
      </div>
    </div>
  </div>

  {/* Row 2: Punch-Out */}
  <div className="flex space-x-6">
    <div className="flex flex-col">
      <label className="text-gray-600 font-medium">Punch-Out Date</label>
      <input
        type="text"
        className="border p-2 rounded-lg"
        value={punchOutDate}
        onChange={(e) => setPunchOutDate(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-gray-600 font-medium">Punch-Out Time</label>
      <div className="flex space-x-2">
        <select className="border p-2 rounded-lg">
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
          ))}
        </select>
        <select className="border p-2 rounded-lg">
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
</div>

  
          <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700" onClick={handleConfirmAttendance}>
            Update
          </button>
        </div>
      </div>
    );
  };
  
  export default AttendanceModal;