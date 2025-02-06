import React, { useState } from 'react';

// Modal Component for displaying full subject
const Modal = ({ subject, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Leave Request Details</h2>
        <p className="text-gray-700 mb-4">{subject}</p>
        <button 
          onClick={onClose} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const HRMLeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'John Doe', type: 'Vacation Leave', status: 'Pending', startDate: '2025-01-10', endDate: '2025-01-15', subject: 'Family trip to the mountains and need some rest after a hectic work schedule' },
    { id: 2, name: 'Jane Smith', type: 'Sick Leave', status: 'Approved', startDate: '2025-01-12', endDate: '2025-01-13', subject: 'Feeling unwell, need a sick leave to recover from flu symptoms' },
    { id: 3, name: 'Mike Ross', type: 'Unpaid Leave', status: 'Rejected', startDate: '2025-01-05', endDate: '2025-01-07', subject: 'Personal reason for taking unpaid leave, not feeling well mentally and need a break' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('');

  // Show full subject in modal
  const handleShowFullSubject = (subject) => {
    setModalSubject(subject);
    setIsModalOpen(true);
  };
  
  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">HRM Leave Management</h1>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Pending Requests</h2>
          <p className="text-3xl text-blue-600">{leaveRequests.filter((req) => req.status === 'Pending').length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Approved Requests</h2>
          <p className="text-3xl text-green-600">{leaveRequests.filter((req) => req.status === 'Approved').length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Rejected Requests</h2>
          <p className="text-3xl text-red-600">{leaveRequests.filter((req) => req.status === 'Rejected').length}</p>
        </div>
      </div>

      {/* Employee Leave Requests Table */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employee Leave Requests</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Employee Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Leave Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                <td className="border border-gray-300 px-4 py-2">{request.type}</td>
                <td className="border border-gray-300 px-4 py-2">{request.startDate}</td>
                <td className="border border-gray-300 px-4 py-2">{request.endDate}</td>
                
                <td
                  className={`border border-gray-300 px-4 py-2 font-medium ${
                    request.status === 'Pending'
                      ? 'text-yellow-600'
                      : request.status === 'Approved'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {request.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleShowFullSubject(request.subject)}
                    className="text-blue-500 hover:underline"
                  >
                    {request.subject.split(' ').slice(0, 5).join(' ')}{request.subject.split(' ').length > 5 ? '...' : ''}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                    onClick={() => handleStatusChange(request.id, 'Approved')}
                    disabled={request.status === 'Approved'}
                    className={`bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600 ${
                      request.status === 'Approved' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleStatusChange(request.id, 'Rejected')}
                    disabled={request.status === 'Rejected'}
                    className={`bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 ${
                      request.status === 'Rejected' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave Policies Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave Policies</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Maximum Sick Leave: 10 days per year</li>
          <li>Maximum Vacation Leave: 20 days per year</li>
          <li>Unpaid Leave is allowed after exhausting paid leaves</li>
        </ul>
      </div>

      {/* Modal for displaying full subject */}
      {isModalOpen && (
        <Modal subject={modalSubject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default HRMLeaveManagement;