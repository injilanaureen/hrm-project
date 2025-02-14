import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import AttendanceCalendar from './attendanceCAlender';
import AttendanceList from './attendancelist';
import InfoSections from './attendanceInfo';
import SearchControls from './attendanceSearchControl';
import { useAuth } from "../../context/AuthContext";
 
const Attendance = () => {
  const { user } = useAuth();
 
  const [attendancelist, setAttendanceList] = useState(true);
  const [attendanceCalender, setAttendanceCalender] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 
  const onhandleCalender = () => {
    setAttendanceCalender(true);
    setAttendanceList(false);
  };
 
  const onhandleList = () => {
    setAttendanceCalender(false);
    setAttendanceList(true);
  };
 
  useEffect(() => {
    if (user?.emp_id) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/attendance/getAttendance/${user.emp_id}`)
        .then((response) => {
          setAttendanceData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching attendance:", error);
        });
    }
  }, [user?.emp_id]);
 
  const filteredAttendanceData = attendanceData.filter((entry) =>
    entry.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <div className="p-4 bg-white shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className='flex gap-2 items-center'>
          <h1 className="text-xl font-semibold">Attendance for 2025-Feb</h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending Request (0)</span>
           <Link to="/holidayList"><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Holiday List </span></Link> 
          </div>
        </div>
        <button className="px-4 py-1 bg-indigo-400 text-sm text-white font-bold">APPLY</button>
      </div>
     
      {/* Search and Controls */}
      <SearchControls
        onhandleCalender={onhandleCalender}
        onhandleList={onhandleList}
        attendancelist={attendancelist}
        attendanceCalender={attendanceCalender}
        setSearchQuery={setSearchQuery}
      />
 
      {/* Info Sections */}
      <InfoSections attendanceData={attendanceData} />
 
      {/* Attendance Views */}
      {attendanceCalender && <AttendanceCalendar attendanceData={filteredAttendanceData} />}
      {attendancelist && <AttendanceList attendanceData={filteredAttendanceData} />}
    </div>
  );
};
 
export default Attendance;
 
 