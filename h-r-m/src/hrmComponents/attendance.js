import React, { useState, useEffect } from "react";
import { UserCheck, UserX } from 'lucide-react';
import { CirclePlus } from 'lucide-react';

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [employees, setEmployees] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendanceType, setAttendanceType] = useState("");

  const handleTabClick = (tab) => setActiveTab(tab);

  const fetchAllEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/adduser/getAllEmployees");
      const data = await response.json();
      if (data.success) {
        const allEmployees = data.data.filter(emp => emp.role_id !== 1);
        const allActiveEmployees = allEmployees.filter(emp => emp.emp_status === "Active");
        setEmployees(allEmployees);
        setActiveEmployees(allActiveEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const handleAttendanceClick = (employee, type) => {
    setSelectedEmployee(employee);
    setAttendanceType(type);
    setShowModal(true);
  };

  const handleConfirmAttendance = () => {
    // Add your attendance submission logic here
    console.log(`Marking ${selectedEmployee.emp_full_name} as ${attendanceType}`);
    setShowModal(false);
  };

  const currentDate = new Date().toLocaleDateString("en-GB");

  // Modal Component
  const AttendanceModal = ({ showModal, onClose }) => {
    const [punchInDate, setPunchInDate] = useState("26-01-2025");
    const [punchOutDate, setPunchOutDate] = useState("26-01-2025");
  
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
            <p className="text-sm italic text-gray-500">There is a "Clock-in" grace time of 30 min(s)</p>
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

  
          <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700">
            Update
          </button>
        </div>
      </div>
    );
  };
  

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === "tab1"
                ? "bg-indigo-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("tab1")}
          >
            Add Attendance
          </button>
          <button
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === "tab2"
                ? "bg-indigo-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("tab2")}
          >
            Update Attendance
          </button>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg">
          <span className="text-indigo-700 font-medium">{currentDate}</span>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "tab1" && (
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Employee Attendance</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Designation</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent"></div>
                            <span>Loading employees...</span>
                          </div>
                        </td>
                      </tr>
                    ) : activeEmployees.length > 0 ? (
                      activeEmployees.map((employee) => (
                        <tr 
                          key={employee.emp_id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 text-sm text-gray-600">{employee.emp_id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">{employee.emp_full_name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{employee.designation_name}</td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center space-x-4">
                              <button
                                onClick={() => handleAttendanceClick(employee, "Present")}
                                className="p-2 rounded-full hover:bg-green-50 text-green-600 transition-colors duration-200"
                                title="Mark Present"
                              >
                                
                                <AttendanceModal 
  showModal={showModal} 
  onClose={() => setShowModal(false)} 
  employee={selectedEmployee} 
  attendanceType={attendanceType} 
/>

                              </button>
                              <button
                                onClick={() => handleAttendanceClick(employee, "Absent")}
                                className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors duration-200"
                                title="Mark Absent"
                              >
                                <UserX className="w-6 h-6" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          No active employees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "tab2" && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Attendance</h2>
          <p className="text-gray-600">Content for updating attendance will go here.</p>
        </div>
      )}

      {/* Attendance Confirmation Modal */}
      <AttendanceModal />
    </div>
  );
};

export default Attendance;