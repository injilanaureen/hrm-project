import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft }   from 'lucide-react';
// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        {/* Flex container for the header */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Leave Request Reason</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {/* Content below the header */}
        <div className="mt-4 text-gray-700 whitespace-pre-wrap">
          {children}
        </div>
      </div>
    </div>
  );
};
const LeaveManagement = () => {
  const { user } = useAuth();
  const [leaveBalance, setLeaveBalance] = useState({
    total_leave: 0,
  });
  const [earnedLeave, setEarnedLeave] = useState({
    earned_leave: 0,
  });
  const [casualLeave, setCasualLeave] = useState({
    casual_leave: 0,
  });
  const [sickLeave, setSickLeave] = useState({
    sick_leave: 0,
  });

  const [statusOfLeave, setStatusOfLeave] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [daysRequested, setDaysRequested] = useState(0);


  useEffect(() => {
    setTotalPages(Math.ceil(leaveRequests.length / ITEMS_PER_PAGE));
  }, [leaveRequests]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return leaveRequests.slice(startIndex, endIndex);
  };
  useEffect(() => {
    const fetchTotalLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/getSingleLeaveData/${user.emp_id}`
        );
        console.log("Leave Requests:", response.data);
        setLeaveBalance({
          total_leave: response.data.total_leave,
        });
        setEarnedLeave({
          earned_leave: response.data.earned_leave,
        });
        setCasualLeave({
          casual_leave: response.data.casual_leave,
        });
        setSickLeave({
          sick_leave: response.data.sick_leave,
        });
        
      } catch (error) {
        console.error("Error fetching total leave:", error);
      }
    };

    if (user?.emp_id) {
      fetchTotalLeave();
    }
  }, [user?.emp_id]);

  useEffect(() => {
    if (user?.emp_id) {
      const fetchLeaveRequests = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/leave/leave-requests/${user.emp_id}`
          );
         
          
          setLeaveRequests(response.data); // Store the leave requests in state
        } catch (error) {
          console.error("Error fetching leave requests:", error);
        }
      };

      fetchLeaveRequests();
    }
  }, [user?.emp_id]);

  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

 // Function to calculate days requested
const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 : 0;
};

// Handle Input Change
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// **Validation Effect** (Runs whenever startDate, endDate, or leaveType changes)
useEffect(() => {
  if (!formData.startDate || !formData.endDate) {
    setStatusOfLeave("");
    return;
  }

  const days = calculateDays(formData.startDate, formData.endDate);
  setDaysRequested(days);

  if (days <= 0) {
    setStatusOfLeave("Invalid date range. End date must be after start date.");
    return;
  }

  if (formData.leaveType === "Casual Leave" && days > casualLeave.casual_leave) {
    setStatusOfLeave("Insufficient casual leave");
  } else if (formData.leaveType === "Earned Leave" && days > earnedLeave.earned_leave) {
    setStatusOfLeave("Insufficient earned leave");
  } else if (formData.leaveType === "Sick Leave" && days > sickLeave.sick_leave) {
    setStatusOfLeave("Insufficient sick leave");
  } else {
    setStatusOfLeave(""); // Clear error if valid
  }
}, [formData.startDate, formData.endDate, formData.leaveType]);

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData);

  if (!formData.leaveType) {
    alert("Please select a leave type.");
    return;
  }

  // Check if there's an insufficient leave error
  if (statusOfLeave) {
    alert(statusOfLeave); // Show the error message to the user
    return;
  }

  // Ensure dates are formatted for backend
  const startDateFormatted = new Date(formData.startDate).toISOString().split("T")[0];
  const endDateFormatted = new Date(formData.endDate).toISOString().split("T")[0];

  const leaveRequest = {
    emp_id: user.emp_id,
    leaveType: formData.leaveType,
    leaveStartDate: startDateFormatted,
    leaveEndDate: endDateFormatted,
    days_requested: daysRequested,
    leaveReason: formData.reason,
  };

  console.log("request", leaveRequest);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/leave/apply-leave",
      leaveRequest
    );

    console.log(response.data.message);
    setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
    setStatusOfLeave(""); // Reset status after successful submission
  } catch (error) {
    console.error("Error submitting leave request:", error);
    alert(error.response?.data?.message || "Failed to submit leave request. Please try again.");
  }
};

  
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleReasonClick = (reason) => {
    setSelectedReason(reason);
    setIsModalOpen(true);
  };

  return (
    <div className="max-h-screen">

<div className="hidden lg:flex items-center gap-1">
  <ArrowLeft />
  <p>Employee</p>
</div>


      {/* Leave Balance Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-4xl mx-auto">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave Balance</h2>
  <ul className="space-y-2">
  <li className="flex justify-between text-lg text-gray-700">
    <span>Casual leave:</span>
      <span>{casualLeave.casual_leave} days</span>
    </li><li className="flex justify-between text-lg text-gray-700">
    <span>Sick leave:</span>
      <span>{sickLeave.sick_leave} days</span>
    </li><li className="flex justify-between text-lg text-gray-700">
    <span>Earned leave:</span>
      <span>{earnedLeave.earned_leave} days</span>
    </li><li className="flex justify-between text-lg text-gray-700">
    <span>Total leave:</span>
      <span>{leaveBalance.total_leave} days</span>
    </li>
  </ul>
</div>


      {/* Leave Request Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Request Leave
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Earned Leave">Earned Leave </option>
              <option value="Casual Leave">Casual Leave </option>
              <option value="Other">Other</option>

            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>
          </div>

          {/* Display Days and Validation Message */}
    {formData.startDate && formData.endDate && (
      <div className="bg-gray-50 p-3 rounded-lg flex gap-2">
        <p className="text-gray-700 font-medium">
          Days Requested: {daysRequested}
        </p>
        <p className={statusOfLeave ? "text-red-500" : "text-black"}>
          {statusOfLeave}
        </p>
      </div>
    )}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
              focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      {/* Display Leave Requests */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Your Leave Requests
        </h2>
        {leaveRequests.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      S.No
                    </th> <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Apply Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Leave Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Start Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      End Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Days Requested
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Reason
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData().map((request , index) => (
                    <tr
                      key={request.leave_app_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                    
                    <td className="px-6 py-4 text-sm text-gray-600 border-b">
                      {index+1}
                      </td>
                       <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        {new Date(request.leaveApplydate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        {request.leaveType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        {new Date(request.leaveStartDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        {new Date(request.leaveEndDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                      {request.days_requested ?? "N/A"} 
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        <button
                          onClick={() => handleReasonClick(request.leaveReason)}
                          className="text-left hover:text-blue-600 cursor-pointer"
                        >
                          {truncateText(request.leaveReason)}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm border-b">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.leaveStatus === "Approved"
                              ? "bg-green-100 text-green-800"
                              : request.leaveStatus === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.leaveStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No leave requests found.
          </p>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  {selectedReason}
</Modal>;
    </div>
  );
};

export default LeaveManagement;
