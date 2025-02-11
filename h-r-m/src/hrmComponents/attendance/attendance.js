import React, { useState, useEffect } from "react";
import { UserCheck, UserX, CalendarX, Clock } from "lucide-react";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [timeoutData, setTimeoutData] = useState({});
  const [loading, setLoading] = useState(true);

  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const fetchAllEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/adduser/getAllEmployees");
      const data = await response.json();
      if (data.success) {
        const allEmployees = data.data.filter(emp => emp.role_id !== 1);
        setEmployees(allEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchLeaveData = async () => {
    try {
      const leaveResponse = await fetch("http://localhost:5000/api/leaves/leave-requests");
      const leaveData = await leaveResponse.json();

      const shortLeaveResponse = await fetch("http://localhost:5000/api/leaves/short-leaves");
      const shortLeaveData = await shortLeaveResponse.json();

      // Combine all leaves & filter only today's leave
      const allLeaves = [...leaveData, ...shortLeaveData].filter(leave =>
        leave.leaveApplydate.split("T")[0] === currentDate
      );

      setLeaveData(allLeaves);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllEmployees();
    fetchLeaveData();
  }, []);

  useEffect(() => {
    const defaultAttendance = {};
    employees.forEach(emp => {
      const leave = leaveData.find(leave => leave.emp_id === emp.emp_id);
      defaultAttendance[emp.emp_id] = leave
        ? `Leave (${leave.leaveType})`
        : "Absent"; // Default: Absent if no leave
    });
    setAttendance(defaultAttendance);
  }, [employees, leaveData]);

  const handleStatusChange = (emp_id, status) => {
    setAttendance(prev => ({ ...prev, [emp_id]: status }));
  };

  const handleTimeoutChange = (emp_id, timeout) => {
    setTimeoutData(prev => ({ ...prev, [emp_id]: timeout }));
  };

  const submitAttendance = async () => {
    const attendanceRecords = employees.map(emp => ({
      emp_id: emp.emp_id,
      status: attendance[emp.emp_id].includes("Leave") ? "Leave" : attendance[emp.emp_id],
      punch_time: attendance[emp.emp_id] === "Present" ? new Date().toISOString() : null,
      timeout: timeoutData[emp.emp_id] || null,
      date: currentDate,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/attendance/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendanceRecords }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Attendance submitted successfully!");
      } else {
        alert("Failed to submit attendance.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Employee Attendance</h2>
        <button
          onClick={submitAttendance}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Attendance
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Emp ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Designation</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Time Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading employees...</td>
              </tr>
            ) : employees.length > 0 ? (
              employees.map(employee => {
                const emp_id = employee.emp_id;
                return (
                  <tr key={emp_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{emp_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{employee.emp_full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.designation_name}</td>
                    <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-lg text-white ${
  attendance[emp_id]?.includes("Leave") ? "bg-yellow-500" : 
  attendance[emp_id] === "Present" ? "bg-green-500" : 
  "bg-red-500"
}`}>
  {attendance[emp_id] || "Absent"}
</span>

                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => handleStatusChange(emp_id, "Present")}
                          className="p-2 rounded-full text-green-600 hover:bg-green-50"
                          title="Mark Present"
                        >
                          <UserCheck className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(emp_id, "Absent")}
                          className="p-2 rounded-full text-red-600 hover:bg-red-50"
                          title="Mark Absent"
                        >
                          <UserX className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(emp_id, "Leave")}
                          className="p-2 rounded-full text-yellow-600 hover:bg-yellow-50"
                          title="Mark Leave"
                        >
                          <CalendarX className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="time"
                        value={timeoutData[emp_id] || ""}
                        onChange={(e) => handleTimeoutChange(emp_id, e.target.value)}
                        className="border p-2 rounded-lg"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
