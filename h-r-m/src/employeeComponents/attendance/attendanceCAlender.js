import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
 
const AttendanceCalendar = ({ attendanceData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };
 
  const changeYear = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + increment);
    setCurrentDate(newDate);
  };
 
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
 
  const renderStatusColor = (status) => {
    switch (status) {
      case 'Weekly Off': return 'bg-purple-500';
      case 'Present': return 'bg-green-500';
      case 'Half Day': return 'bg-orange-500';
      case 'N.A.': return 'bg-gray-500';
      default: return 'bg-gray-200';
    }
  };
 
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
 
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border"></div>);
    }
 
    for (let day = 1; day <= daysInMonth; day++) {
      const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = checkDate.toISOString().split('T')[0];
 
      const dayData = attendanceData[dateKey];
 
      days.push(
        <div
          key={day}
          className={`h-20 border p-1 ${dayData ? renderStatusColor(dayData.status) : 'bg-gray-200'} text-white`}
        >
          <div className="font-bold">{day}</div>
          {dayData ? (
            <>
              <div className="text-xs">{dayData.status}</div>
              <div className="text-xs truncate">{dayData.shift}</div>
              <div className="text-xs truncate">{dayData.time}</div>
            </>
          ) : (
            <div className="text-xs text-gray-400">No Data</div>
          )}
        </div>
      );
    }
 
    return days;
  };
 
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button onClick={() => changeYear(-1)} className="text-gray-600 hover:text-gray-900">
            <ChevronsLeft />
          </button>
          <button onClick={() => changeMonth(-1)} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft />
          </button>
        </div>
 
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-600" />
          <h2 className="text-xl font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>
 
        <div className="flex space-x-2">
          <button onClick={() => changeMonth(1)} className="text-gray-600 hover:text-gray-900">
            <ChevronRight />
          </button>
          <button onClick={() => changeYear(1)} className="text-gray-600 hover:text-gray-900">
            <ChevronsRight />
          </button>
        </div>
      </div>
 
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map(day => (
          <div key={day} className="font-bold text-gray-600">{day}</div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};
 
export default AttendanceCalendar;
 
 