import React from 'react';
import { FileText, CalendarDays, List } from 'lucide-react';
 
const SearchControls = ({
  onhandleCalender,
  onhandleList,
  attendanceCalender,
  attendancelist
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left section: Search and ONE VIEW button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search Employee"
          className="px-4 py-1 text-sm border rounded-sm"
        />
        <button className="px-4 py-2 text-xs font-semibold text-indigo-400 border border-gray-100 rounded-sm">
          ONE VIEW
        </button>
      </div>
 
      {/* Right section: Filters and Buttons */}
      <div className="flex gap-2">
        <div className="px-4 py-1 border border-gray-200 rounded-sm">
          <FileText className="text-indigo-400 text-xl" />
        </div>
        <select className="px-4 py-1 border text-gray-600 text-sm rounded-sm">
          <option>2025-Feb</option>
          <option>2025-Jan</option>
          <option>2024-Dec</option>
        </select>
        <select className="px-4 py-1 border text-gray-600 text-sm rounded-sm">
          <option>2025</option>
          <option>2024</option>
        </select>
        <button className="px-4 py-1 text-sm font-semibold text-indigo-400 border border-gray-200 rounded-sm">
          REGULARIZE
        </button>
 
        {/* Calendar and List buttons */}
        <div className="flex border border-indigo-400">
          {/* Calendar Button */}
          <div
            className={`px-4 py-1 cursor-pointer ${attendanceCalender ? 'bg-indigo-400' : ''}`}
          >
            <button onClick={onhandleCalender}>
              <CalendarDays className={`text-xl ${attendanceCalender ? 'text-white' : 'text-indigo-400'}`} />
            </button>
          </div>
 
          {/* List Button */}
          <div
            className={`px-4 py-1 cursor-pointer ${attendancelist ? 'bg-indigo-400' : ''}`}
          >
            <button onClick={onhandleList}>
              <List className={`text-xl ${attendancelist ? 'text-white' : 'text-indigo-400'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default SearchControls;
 
 