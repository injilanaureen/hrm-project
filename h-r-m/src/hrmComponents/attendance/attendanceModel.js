import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";

const AttendanceModal = ({ showModal, onClose, setShowModal, emp_id, selectedDate }) => {
    const [punchInTime, setPunchInTime] = useState("");
    const [punchOutTime, setPunchOutTime] = useState("");
    const [attendanceId, setAttendanceId] = useState(null);
    const [shiftEndTime, setShiftEndTime] = useState("19:00"); // Default shift end time
    
    useEffect(() => {
        if (showModal) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/attendance/getAttendance`).then((response) => {
                const record = response.data.find(
                    (att) => att.emp_id === emp_id && att.date === selectedDate
                );
                if (record) {
                    setAttendanceId(record._id);
                    setPunchInTime(record.time_in || "");
                    setPunchOutTime(record.time_out || "");
                }
            }).catch((error) => {
                console.error("Error fetching attendance:", error);
            });
        }
    }, [showModal, emp_id, selectedDate]);
    
    const handleUpdateAttendance = async () => {
        if (!punchInTime) {
            alert("Punch-in time is required before punch-out.");
            return;
        }
        
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/attendance/updateAttendance/${attendanceId}`, 
                {
                    emp_id,
                    time_out: punchOutTime,
                    date: selectedDate, // Ensure date is sent
                }
            );
            alert("Punch-out time updated successfully!");
            setShowModal(false);
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    };
    
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showModal ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-6 w-2/5 shadow-lg relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">Edit Attendance</h3>
                <hr className="mb-4" />
                <p><strong>Shift Date:</strong> {selectedDate}</p>
                <p><strong>Shift End Time:</strong> {shiftEndTime}</p>
                <hr />
                <div className="mt-4 space-y-4">
                    <div className="flex space-x-6">
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Punch-In Time</label>
                            <input type="text" className="border p-2 rounded-lg" value={punchInTime} readOnly />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600 font-medium">Punch-Out Time</label>
                            <input type="time" className="border p-2 rounded-lg" value={punchOutTime} onChange={(e) => setPunchOutTime(e.target.value)} />
                        </div>
                    </div>
                </div>
                <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700" onClick={handleUpdateAttendance}>
                    Update
                </button>
            </div>
        </div>
    );
};

const AttendanceItem = ({ emp_id, date }) => {
    return (
        <div className="flex items-center space-x-4 p-2 border rounded-lg shadow">
            <span>{date}</span>
        </div>
    );
};

const AttendanceButton = ({ onEdit }) => {
    return (
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" onClick={onEdit}>
            Edit Attendance
        </button>
    );
};

export { AttendanceModal, AttendanceItem, AttendanceButton };
