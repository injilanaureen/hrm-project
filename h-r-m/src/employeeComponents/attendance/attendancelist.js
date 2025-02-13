import { useEffect } from "react";
 
const AttendanceList = ({ attendanceData }) => {
  useEffect(() => {
    console.log("Attendance Data:", attendanceData);
  }, [attendanceData]);
  const calculateTotalWork = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return '-';
 
    const [inHours, inMinutes] = timeIn.split(':').map(Number);
    const [outHours, outMinutes] = timeOut.split(':').map(Number);
 
    const inDate = new Date();
    inDate.setHours(inHours, inMinutes, 0);
 
    const outDate = new Date();
    outDate.setHours(outHours, outMinutes, 0);
 
    const diffMs = outDate.getTime() - inDate.getTime();
    if (diffMs < 0) return '-'; // Agar time out pehle ka ho, invalid case
 
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
 
    return `${hours}h ${minutes}m`;
  };
 
 
  return (
    <div>
      {/* Legend */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span>Pending request</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Approved requests</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span>Weekly Off</span>
        </div>
      </div>
 
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">DATE</th>
              <th className="px-4 py-2 text-left">TIME IN</th>
              <th className="px-4 py-2 text-left">TIME OUT</th>
              <th className="px-4 py-2 text-left">TOTAL WORK DURATION</th>
              <th className="px-4 py-2 text-left">LATE BY</th>
              <th className="px-4 py-2 text-left">RECORDED CLOCKIN</th>
              <th className="px-4 py-2 text-left">RECORDED CLOCKOUT</th>
              <th className="px-4 py-2 text-left">STATUS</th>
              <th className="px-4 py-2 text-left">OPERATION</th>
              <th className="px-4 py-2 text-left">ASSIGNMENT</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData && attendanceData.length > 0 ? (
              attendanceData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">{row.time_in || '-'}</td>
                  <td className="px-4 py-2">{row.time_out || '-'}</td>
                  <td className="px-4 py-2">{calculateTotalWork(row.time_in, row.time_out)}</td>
                  <td className="px-4 py-2">{row.late_by || '-'}</td>
                  <td className="px-4 py-2">{row.recordedClockIn || '-'}</td>
                  <td className="px-4 py-2">{row.recordedClockOut || '-'}</td>
                  <td className="px-4 py-2">
                    <span
                      className={  `flex gap-1 ${
                        row.status === 'Weekly Off'
                          ? 'text-purple-600'
                          : row.status.includes('Leave')
                          ? 'text-green-600'
                          : 'text-black'
                        
                      }`}
                    >
                      <span>{row.status}</span> 
                      {row.status === 'Leave' && (
  <span className="text-purple-600 font-semibold">{row.leaveType}</span>
)}

{row.lateStatus === 'Late' && (
  <span className="text-yellow-600 font-semibold">(Late)</span>
)}

{row.earlyStatus === 'On Time' && (
  <span className="text-green-600 font-semibold">(On Time)</span>
)}

{row.halfDayStatus === 'Half-Day' && (
  <span className="text-orange-600 font-semibold">(Half-Day)</span>
)}

                      <span>{row.Status ===''}</span>
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        ✏️
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        🗑️
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No attendance data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default AttendanceList;
 
 