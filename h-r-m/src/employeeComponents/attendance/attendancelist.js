const AttendanceList = () => {
  const attendanceData = [
    { date: '26 Jan 2025, Sun', status: 'Weekly Off' },
    { date: '27 Jan 2025, Mon', status: 'On Leave (Earned Leave)' },
    {
      date: '28 Jan 2025, Tue',
      timeIn: '10:17:09',
      timeOut: '19:18:34',
      totalWork: '09:01:25',
      lateBy: '00:17:09',
      recordedClockIn: '10:17:09',
      recordedClockOut: '19:18:34',
      status: 'Present',
    },
    // Add more data as needed
  ];

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
        <table className="w-full">
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
            {attendanceData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.timeIn || '-'}</td>
                <td className="px-4 py-2">{row.timeOut || '-'}</td>
                <td className="px-4 py-2">{row.totalWork || '-'}</td>
                <td className="px-4 py-2">{row.lateBy || '-'}</td>
                <td className="px-4 py-2">{row.recordedClockIn || '-'}</td>
                <td className="px-4 py-2">{row.recordedClockOut || '-'}</td>
                <td className="px-4 py-2">
                  <span
                    className={`${
                      row.status === 'Weekly Off'
                        ? 'text-purple-600'
                        : row.status.includes('Leave')
                        ? 'text-green-600'
                        : 'text-black'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AttendanceList;