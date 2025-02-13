import { useState, useEffect } from "react";

const LeaveTracker = ({ approvedLeaves, approvedShortLeaves }) => {
  const today = new Date().toISOString().split("T")[0]; // Default to today
  const [selectedDate, setSelectedDate] = useState(today);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    // Filter leaves when selectedDate changes
    const filtered = [...approvedLeaves, ...approvedShortLeaves].filter((leave) => {
      const startDate = new Date(leave.leaveStartDate).toISOString().split("T")[0];
      const endDate = new Date(leave.leaveEndDate).toISOString().split("T")[0];

      return selectedDate >= startDate && selectedDate <= endDate;
    });

    setFilteredLeaves(filtered); // Update state with filtered data
  }, [selectedDate, approvedLeaves, approvedShortLeaves]); // Re-run when selectedDate or leaves change

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <label className="text-lg font-semibold text-gray-700">Select a Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {selectedDate && (
        <p className="text-gray-600">
          Selected Date: <strong>{selectedDate}</strong>
        </p>
      )}

      {/* Display Filtered Leave Data */}
      <div className="mt-4 w-full max-w-md">
        {filteredLeaves.length > 0 ? (
          <ul className="bg-white shadow-md rounded-md p-4 w-full">
            {filteredLeaves.map((leave, index) => (
              <li key={index} className="p-2 border-b border-gray-200">
                <strong>Type:</strong> {leave.leaveType} <br />
                <strong>Reason:</strong> {leave.leaveReason} <br />
                <strong>From:</strong> {leave.leaveStartDate.split("T")[0]} <br />
                <strong>To:</strong> {leave.leaveEndDate.split("T")[0]} <br />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No leave records found for this date.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveTracker;
