import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserCheck, UserX, CalendarX } from "lucide-react";

const Attendance = () => {
  const today = new Date().toISOString().split("T")[0];
  const [employees, setEmployees] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [holiday, setHoliday] = useState(null);
  const [holidayName, setHolidayName] = useState(null);
  const [weeklyOff, setWeeklyOff] = useState(null);
  const [punchInTime, setPunchInTime] = useState({});

  const [timeoutData, setTimeoutData] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(true);
  const attendanceData = {
    emp_id:"", // Replace with actual employee ID
    date: "", // Current date (YYYY-MM-DD)
    time_in: "", // Employee clock-in time
    time_out: null, // Employee clock-out time // Work hours calculated
    status: "", // Attendance status
    holidayName: "", // If it's a holiday, set the name
    leaveType: "", // If on leave, specify the type   
    shortLeaveStatus: "", // Short leave status
    shortLeavePeriod: "" // If short leave, specify morning/evening
  };


  // Fetch Employees
  const fetchAllEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/adduser/getAllEmployees");
      const data = await response.json();
      if (data.success) {
        const allEmployees = data.data.filter((emp) => emp.role_id !== 1);
        setEmployees(allEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    setLoading(false);
  };

  // Fetch Leave Data
  const fetchLeaveData = async () => {
    try {
      setLoading(true);
      const [leaveResponse, shortLeaveResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/leave/leave-requests"),
        axios.get("http://localhost:5000/api/leave/short-leaves"),
      ]);

      const approvedLeaves = leaveResponse?.data?.filter((leave) => leave.leaveStatus === "Approved") ?? [];
      const approvedShortLeaves = shortLeaveResponse?.data?.filter((leave) => leave.leaveStatus === "Approved") ?? [];
      // console.log(approvedShortLeaves)

      // Filter leaves based on the selected date
      const filtered = [...approvedLeaves, ...approvedShortLeaves].filter((leave) => {
        const startDate = new Date(leave.leaveStartDate).toISOString().split("T")[0];
        const endDate = new Date(leave.leaveEndDate).toISOString().split("T")[0];
        return selectedDate >= startDate && selectedDate <= endDate;
      });

      setLeaveData(filtered);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchWeeklyOff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance/getShift");
  
      if (Array.isArray(response.data) && response.data.length > 0) {
        const weekOffDay = response.data[0].week_off?.trim(); // Access first object in the array
        setWeeklyOff(weekOffDay);
      } else {
        console.warn("No valid weekly off data received");
        setWeeklyOff(null);
      }
    } catch (error) {
      console.error("Error fetching weekly off:", error);
      setWeeklyOff(null);
    }
  };
  
  
  

  const fetchHolidayData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/holiday/holidays?date=${selectedDate}`);
      
      if (response.data.message === "No holiday on this date") {
        setHoliday(null);
      } else {
        setHoliday(response.data);
      }
  
    } catch (error) {
      console.error("Error fetching holiday data:", error);
      setHoliday(null);
    }
  };
  


  useEffect(() => {
    fetchLeaveData();
    fetchHolidayData();

  }, [selectedDate]);

  useEffect(() => {
    fetchAllEmployees();   
    fetchWeeklyOff();
  }, []);

  useEffect(() => {
    fetchLeaveData();
  }, [selectedDate]);

  // Update Attendance State
  useEffect(() => {
    if (employees.length === 0) return;
  
    // Convert selectedDate to "Sunday", "Monday", etc.
    const selectedDay = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" });
  

    setAttendance(() => {
      const updatedAttendance = {};
  
      employees.forEach((emp) => {
        const leave = leaveData.find((leave) => leave.emp_id === emp.emp_id);
  
        // Check if it's a holiday
        if (holiday) {
          updatedAttendance[emp.emp_id] = `Holiday (${holiday.holidayName})`;
        } 
        // Check if it's a weekly off
        else if (weeklyOff && selectedDay === weeklyOff) {
          updatedAttendance[emp.emp_id] = "Weekly Off";
        } 
        // Otherwise, check leave or mark as absent
        else {
          updatedAttendance[emp.emp_id] = leave ? `Leave` : "Absent";
        }
      });
  
      return updatedAttendance;
    });
  }, [employees, leaveData, selectedDate, holiday, weeklyOff]); 
  
  const handlePunchInChange = (emp_id, field, value) => {
    setPunchInTime((prev) => ({
      ...prev,
      [emp_id]: {
        ...prev[emp_id],
        [field]: value,
      },
    }));
  };
  

  // Handle Status Change
  const handleStatusChange = (emp_id, status) => {
    setAttendance((prev) => ({ ...prev, [emp_id]: status }));
  
    if (status === "Present") {
      const now = new Date();
      setPunchInTime((prev) => ({
        ...prev,
        [emp_id]: {
          hours: now.getHours(),
          minutes: now.getMinutes(),
        },
      }));
    }
  };
  

  // Handle Time-Out Change
  const handleTimeoutChange = (emp_id, timeout) => {
    setTimeoutData((prev) => ({ ...prev, [emp_id]: timeout }));
  };
  // Collect and Send Attendance Data
  const convertToMinutes = (time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  
  const formatMinutes = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };
  const submitAttendance = async () => {
    const shiftIn = "10:00"; // Standard shift start
    const graceLimithalfHour = "10:30"; // 30-min grace period
    const graceLimittenMinutes = "10:10"; // 10-min grace period
    const lateHalfDayLimit = "10:10"; // Half-day if after this
    const fullDayAbsenceLimit = "14:00"; // Full-day absence if after 2:00 PM
  
    try {
      // Fetch late arrival count for each employee from backend
      const lateCountsResponse = await fetch("http://localhost:5000/api/attendance/lateCounts");
      const pastLateCounts = await lateCountsResponse.json(); // Assuming it returns an object { emp_id: count }
  
      const formattedData = employees.map((employee) => {
        const timeIn = punchInTime[employee.emp_id]
          ? `${punchInTime[employee.emp_id]?.hours}:${punchInTime[employee.emp_id]?.minutes}`
          : null;
  
        let attendanceStatus = attendance[employee.emp_id] || "Absent";
        let lateStatus="N/A";
        let leaveType="";
        let earlyStatus="N/A";
        let late_by = "N/A";
        let halfDayStatus = "";
        let halfDayPeriod = "";
    
        if (attendanceStatus === "Leave") {
          leaveType = attendance[employee.emp_id] || "Annual Leave"; // ✅ Assign correct leave type
      }
  
        if (attendanceStatus === "Leave") {
          attendanceStatus = "Annual Leave"; // Default leave type
        } else if (attendanceStatus === "Holiday" || attendanceStatus === "Weekly Off") {
          // Keep status unchanged
        } else if (attendanceStatus === "Present" || attendanceStatus === "Late") {
          
          
          if (timeIn) {
            const timeInMinutes = convertToMinutes(timeIn);
            const shiftInMinutes = convertToMinutes(shiftIn);
            const graceLimittenMinutesMinutes = convertToMinutes(graceLimittenMinutes);
            const graceLimithalfHourMinutes = convertToMinutes(graceLimithalfHour);
            const lateHalfDayLimitMinutes = convertToMinutes(lateHalfDayLimit);
            const fullDayAbsenceLimitMinutes = convertToMinutes(fullDayAbsenceLimit);
        
    
  
            if (timeInMinutes > graceLimittenMinutesMinutes) {
              late_by = formatMinutes(timeInMinutes - graceLimittenMinutesMinutes);
            }
  
            if (timeInMinutes <= graceLimittenMinutesMinutes) {
              attendanceStatus = "Present";
              earlyStatus="On Time"

            } else if (timeInMinutes > fullDayAbsenceLimitMinutes) {
              attendanceStatus = "Absent";
            } else if (timeInMinutes > graceLimittenMinutesMinutes) {
              attendanceStatus = "Present";
              lateStatus="Late"
            }
  
            // Apply Half-Day logic only if past 5 late instances
            const pastLateCount = pastLateCounts[employee.emp_id] || 0;
            if (pastLateCount >= 5 && timeInMinutes <= lateHalfDayLimitMinutes) {
              attendanceStatus = "Half-Day";
            }
          }
        }
  
        return {
          emp_id: employee.emp_id,
          date: selectedDate,
          time_in: timeIn,
          status: attendanceStatus,
          leaveType: leaveType,
          holidayStatus: attendanceStatus === "Holiday" ? "Holiday" : "No",
          weeklyOffStatus: attendanceStatus === "Weekly Off" ? "Weekly Off" : "No",
          absentStatus: attendanceStatus === "Absent" ? "Absent" : "No",
          shortLeaveStatus: "",
          shortLeavePeriod: "",
          earlyStatus: earlyStatus,
          lateStatus: lateStatus,
          halfDayStatus: attendanceStatus === "Half-Day" ? "Half Day" : "",
          halfDayPeriod: "",
          late_by,
    
        };
      });
  
      console.log(formattedData);
  
      const response = await fetch("http://localhost:5000/api/attendance/addAttendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendances: formattedData }), // Send as an object with an array
      });
  
      console.log(response);
      if (response.ok) {
        alert("Attendance submitted successfully!");
      } else {
        console.error("Failed to submit attendance:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };
  
  
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Employee Attendance</h2>
        <div className="flex flex-col items-center gap-3 p-4">
          <label className="text-lg font-semibold text-gray-700">Select a Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {selectedDate && (
            <p className="text-gray-600">Selected Date: <strong>{selectedDate}</strong></p>
          )}
        </div>
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Punch-In Time</th>
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
                        attendance[emp_id] === "Present" ? "bg-green-500" : "bg-red-500"
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
                          ✅
                        </button>
                        <button
                          onClick={() => handleStatusChange(emp_id, "Absent")}
                          className="p-2 rounded-full text-red-600 hover:bg-red-50"
                          title="Mark Absent"
                        >
                          ❌
                        </button>
                        <button
                          onClick={() => handleStatusChange(emp_id, "Leave")}
                          className="p-2 rounded-full text-yellow-600 hover:bg-yellow-50"
                          title="Mark Leave"
                        >
                          🏖
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {attendance[emp_id] === "Present" ? (
                        <div className="flex space-x-2">
                          <select
                            value={punchInTime[emp_id]?.hours || ""}
                            onChange={(e) => handlePunchInChange(emp_id, "hours", e.target.value)}
                            className="border p-2 rounded-lg"
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                              <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
                            ))}
                          </select>
                          <select
                            value={punchInTime[emp_id]?.minutes || ""}
                            onChange={(e) => handlePunchInChange(emp_id, "minutes", e.target.value)}
                            className="border p-2 rounded-lg"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                              <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
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

      <div className="mt-4 flex justify-end">
        <button
          onClick={submitAttendance}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
