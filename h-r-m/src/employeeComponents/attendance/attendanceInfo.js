// InfoSections.js
import React from 'react';
 
const InfoSections = ({ attendanceData }) => {
  const totalPresent = attendanceData.filter((entry) => entry.status === "Present").length;
  const totalLeave = attendanceData.filter((entry) => entry.status.includes("Leave")).length;
  const totalAbsent = attendanceData.filter((entry) => entry.status === "Absent").length;
  const totalLateBy = attendanceData.reduce((acc, entry) => acc + (entry.late_by !== "N/A" ? parseInt(entry.late_by) : 0), 0);
 
  return (
    <div>
      {/* Total Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="font-medium mb-4 text-sm">Total</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xl font-bold">{totalLeave}</div>
              <div className="text-gray-500 text-sm">Leave Days</div>
            </div>
            <div>
              <div className="text-xl font-bold">{totalPresent}</div>
              <div className="text-gray-500 text-sm">Present Days</div>
            </div>
            <div>
              <div className="text-xl font-bold">{totalAbsent}</div>
              <div className="text-gray-500 text-sm">Absent Days</div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="font-medium mb-4 text-sm">AVERAGE</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xl font-bold">09:02</div>
              <div className="text-gray-500 text-sm">Work Duration</div>
            </div>
            <div>
              <div className="text-xl font-bold">{totalLateBy} mins</div>
              <div className="text-gray-500 text-sm">Late By</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default InfoSections;
 
 