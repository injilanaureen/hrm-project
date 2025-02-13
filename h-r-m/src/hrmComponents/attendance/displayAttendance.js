import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayAttendance = ({ selectedDate }) => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            setLoading(true);
            setError(null);
            
            axios.get(`${process.env.REACT_APP_API_URL}/api/attendance/getAttendance?date=${selectedDate}`)
                .then((response) => {
                    setAttendanceData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching attendance:", error);
                    setError("Failed to load attendance data.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [selectedDate]);
    
    return (
        <div>
            <div className="bg-white rounded-lg p-6 w-3/5 shadow-lg relative">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">Attendance Details</h3>
                <p><strong>Selected Date:</strong> {selectedDate}</p>
                <hr className="mb-4" />

                {loading ? (
                    <p className="text-center text-gray-500">Loading attendance...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : attendanceData.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Emp ID</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Designation</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Punch-In Time</th>
                                <th className="border p-2">Punch-Out Time</th>
\                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((record) => (
                                <tr key={record.emp_id} className="text-center">
                                    <td className="border p-2">{record.emp_id}</td>
                                    <td className="border p-2">{record.name}</td>
                                    <td className="border p-2">{record.designation}</td>
                                    <td className="border p-2">{record.status}</td>
                                    <td className="border p-2">{record.time_in || "-"}</td>
                                    <td className="border p-2">{record.time_out || "-"}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No records found for the selected date.</p>
                )}
            </div>
        </div>
    );
};

export  { DisplayAttendance };
