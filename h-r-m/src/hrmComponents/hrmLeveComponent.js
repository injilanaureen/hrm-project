import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";

const Modal = ({ subject, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Leave Request Details
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{subject}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const LeaveRequestCard = ({ request, emp, onShowSubject, onStatusChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {emp ? emp.emp_full_name : "N/A"}
              </p>
              <p className="text-sm text-gray-500">ID: {request.emp_id}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              request.leaveStatus === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : request.leaveStatus === "Approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {request.leaveStatus}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">
                {new Date(request.leaveStartDate).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">
                {new Date(request.leaveEndDate).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Leave Type</p>
            <p className="font-medium">{request.leaveType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Days Requested</p>
            <p className="font-medium">{request.days_requested}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Reason</p>
          <button
            onClick={() => onShowSubject(request.leaveReason)}
            className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
          >
            {request.leaveReason?.split(" ").slice(0, 5).join(" ")}
            {request.leaveReason?.split(" ").length > 5 ? "..." : ""}
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onStatusChange(request.emp_id, "Approved")}
            disabled={request.leaveStatus === "Approved"}
            className={`flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 ${
              request.leaveStatus === "Approved"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </button>
          <button
            onClick={() => onStatusChange(request.emp_id, "Rejected")}
            disabled={request.leaveStatus === "Rejected"}
            className={`flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors duration-200 ${
              request.leaveStatus === "Rejected"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <XCircle className="h-4 w-4" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

const HRMLeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState("");
  const [employee, setEmployee] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [shortLeaveRequest, setShortLeaveRequest] = useState({});
  const handleShowFullSubject = (subject) => {
    setModalSubject(subject);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchShortRequests = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/leave/short-leaves`
        );
        console.log(response.data);
        setShortLeaveRequest(response.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };
    fetchShortRequests();
  }, []);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/leave/leave-requests`
        );
        setLeaveRequests(response.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };
    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    const fetchEmployeesUsingEmpIds = async () => {
      try {
        if (!leaveRequests || leaveRequests.length === 0) return;
        const empIds = [...new Set(leaveRequests.map((req) => req.emp_id))];
        if (empIds.length === 0) return;
        const empIdsString = empIds.join(",");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/leave/fetch/employee?emp_ids=${empIdsString}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployeesUsingEmpIds();
  }, [leaveRequests]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log(id);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/leave/updatedLeaveBalance`, {
        id,
        leaveRequests,
        newStatus,
      });
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };
  const handleStatusChangeRejected = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/leave/RejectedLeave`, {
        id,
        newStatus,
      });
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const shortLeaveFunctionByApproved = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/leave/updated-Short-leaves/${id}`);
  
      if (response.status === 200) {
        alert("Leave status updated successfully!");
      } else {
        alert("Failed to update leave status.");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("An error occurred while updating leave status.");
    }
  };
  const shortLeaveFunctionByRejected = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/leave/updated-Short-leaves-Rejected/${id}`);
  
      if (response.status === 200) {
        alert("Leave status updated successfully!");
      } else {
        alert("Failed to update leave status.");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("An error occurred while updating leave status.");
    }
  };
  
  

  const StatCard = ({ title, count, icon: Icon, color }) => (
    <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className={`text-3xl font-semibold ${color}`}>{count || "0"}</p>
        </div>
        <div
          className={`h-12 w-12 rounded-full ${color
            .replace("text", "bg")
            .replace("-600", "-100")} flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Leave Management Dashboard
          </h1>
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TableIcon className="h-4 w-4" />
              Table
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                viewMode === "cards"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Cards
            </button>
            <button
              onClick={() => setViewMode("Short Leave")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                viewMode === "Short Leave"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Short Leave
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Pending Requests"
            count={
              Object.values(leaveRequests).filter(
                (req) => req?.leaveStatus === "Pending"
              ).length
            }
            icon={Clock}
            color="text-yellow-600"
          />
          <StatCard
            title="Approved Requests"
            count={
              Object.values(leaveRequests).filter(
                (req) => req?.leaveStatus === "Approved"
              ).length
            }
            icon={CheckCircle}
            color="text-green-600"
          />
          <StatCard
            title="Rejected Requests"
            count={
              Object.values(leaveRequests).filter(
                (req) => req?.leaveStatus === "Rejected"
              ).length
            }
            icon={XCircle}
            color="text-red-600"
          />
        </div>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Leave Requests
            </h2>
          </div>

          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.values(leaveRequests).map((request) => {
                    const emp = employee.find(
                      (emp) => emp.emp_id === request.emp_id
                    );
                    return (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {emp ? emp.emp_full_name : "N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                              ID: {request.emp_id}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p>
                              {new Date(
                                request.leaveStartDate
                              ).toLocaleDateString("en-GB")}
                            </p>
                            <p className="text-gray-500">to</p>
                            <p>
                              {new Date(
                                request.leaveEndDate
                              ).toLocaleDateString("en-GB")}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {request.leaveType}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {request.days_requested}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              request.leaveStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : request.leaveStatus === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {request.leaveStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              handleShowFullSubject(request.leaveReason)
                            }
                            className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                          >
                            {request.leaveReason
                              ?.split(" ")
                              .slice(0, 5)
                              .join(" ")}
                            {request.leaveReason?.split(" ").length > 5
                              ? "..."
                              : ""}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleStatusChange(request.emp_id, "Approved")
                              }
                              disabled={request.leaveStatus === "Approved"}
                              className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                                request.leaveStatus === "Approved"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-green-100 text-green-600 hover:bg-green-200"
                              }`}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChangeRejected(
                                  request._id,
                                  "Rejected"
                                )
                              }
                              disabled={request.leaveStatus === "Rejected"}
                              className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                                request.leaveStatus === "Rejected"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-red-100 text-red-600 hover:bg-red-200"
                              }`}
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : viewMode === "cards" ? (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(leaveRequests).map((request) => {
                const emp = employee.find(
                  (emp) => emp.emp_id === request.emp_id
                );
                return (
                  <LeaveRequestCard
                    key={request.id}
                    request={request}
                    emp={emp}
                    onShowSubject={handleShowFullSubject}
                    onStatusChange={handleStatusChange}
                  />
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
             <table className="w-full">
             <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Short Leave Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Short Leave Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {shortLeaveRequest.map((request) => (
                  <tr key={request.emp_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {request.emp_id}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {new Date(request.appliedOn).toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          request.leaveStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : request.leaveStatus === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {request.leaveStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {request.shortLeaveCount}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {request.shortLeavePeriod}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleShowFullSubject(request.shortLeaveReason)
                        }
                        className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                      >
                        {request.shortLeaveReason
                          ?.split(" ")
                          .slice(0, 5)
                          .join(" ")}
                        {request.shortLeaveReason?.split(" ").length > 5
                          ? "..."
                          : ""}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {request.shortLeaveTime}
                    </td>
                    <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                              shortLeaveFunctionByApproved(request._id)
                              }
                              disabled={request.leaveStatus === "Approved"}
                              className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                                request.leaveStatus === "Approved"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-green-100 text-green-600 hover:bg-green-200"
                              }`}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                shortLeaveFunctionByRejected(
                                  request._id,
                                  "Rejected"
                                )
                              }
                              disabled={request.leaveStatus === "Rejected"}
                              className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                                request.leaveStatus === "Rejected"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-red-100 text-red-600 hover:bg-red-200"
                              }`}
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                  </tr>
                ))}
              </tbody>
             </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal subject={modalSubject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default HRMLeaveManagement;
