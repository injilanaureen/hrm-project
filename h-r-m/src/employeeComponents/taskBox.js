import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ClipboardEdit } from "lucide-react";
import axios from "axios";
import { ArrowLeft }   from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const ActionModal = ({ isOpen, onClose, project }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [extendedDate, setExtendedDate] = useState("");
  const [reasonText, setReasonText] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const { user } = useAuth();
  const reasonTypes = [
    "Project Completed",
    "Extend Deadline",
    "Need Clarification",
    "Technical Issues",
    "Other",

  ];

  // Fetch email recipients when modal opens
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tastbox/getmail');
        console.log(response.data);
        
        setRecipients(response.data);
      } catch (error) {
        console.error("Error fetching email recipients:", error);
      }
    };

    if (isOpen) {
      fetchRecipients();
    }
  }, [isOpen]);

  const handleSubmit = async () => {

    if (!selectedReason) {
      alert("Please select a reason type.");
      return;
    }
  
    if (selectedReason === "Extend Deadline" && !extendedDate) {
      alert("Please select an extended date.");
      return;
    }
  
    if (!selectedRecipient) {
      alert("Please select a recipient.");
      return;
    }
  
    if (!reasonText.trim()) {
      alert("Please provide a reason description.");
      return;
    }
  
    const requestData = {
      empId: user?.emp_id,
      empName: user?.emp_full_name,
      emp_email: user?.emp_email,
      taskId: project?.task_id,
      taskName: project?.task_name,
      reasonType: selectedReason,
      extendedDate: extendedDate || null, // Send null if not required
      reasonText: reasonText,
      recipientEmail: selectedRecipient,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/tastbox/setmail", requestData);
      console.log("API Response:", response.data); // Debugging
      alert(response.data.message);
      onClose();
      setSelectedReason("");
      setExtendedDate("");
      setReasonText("");
      setSelectedRecipient("");
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error.message);
      alert(`Failed to update task. ${error.response ? error.response.data.message : error.message}`);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Update Task Status</div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <div className="mt-1 text-gray-900">{project?.task_name}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason Type
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a reason</option>
              {reasonTypes.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {selectedReason === "Extend Deadline" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Extended Date
              </label>
              <input
                type="date"
                value={extendedDate}
                onChange={(e) => setExtendedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
          
          {/* {mail part } */}
          <label className="block text-sm font-medium text-gray-700">
              Send To
            </label>
            <select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select recipient</option>
              {recipients.map((recipient) => (
                <option key={recipient.acc_id} value={recipient.acc_mail_id}>
                  {recipient.acc_name} - {recipient.acc_mail_id}
                </option>
              ))}
            </select>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason Description
            </label>
            <textarea
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Please provide details..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">{title}</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 text-gray-700 whitespace-pre-wrap">{children}</div>
      </div>
    </div>
  );
};

const TaskBox = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsPerPage = 10;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

 

  const handleActionClick = (project) => {
    setSelectedProject(project);
    setIsActionModalOpen(true);
  };
  
  useEffect(() => {
    if (user?.emp_id) {
      const fetchTaskBoxRequests = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tastbox/task-box/${user.emp_id}`
          );
          // console.log(response.data);
          setProjects(response.data);
        } catch (error) {
          console.error("Error fetching leave requests:", error);
        }
      };

      fetchTaskBoxRequests();
    }
  }, [user?.emp_id]);

  return (

    <div className="max-h-screen">

    <div className="flex items-center gap-1">
    <Link to='/'>
    <ArrowLeft />
    </Link>
    </div>
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 my-4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
            My Task Box
          </h2>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-300 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider  md:table-cell">
                      Description
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="py-3 px-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {currentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {project.task_id}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {project.task_name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        <button
                          onClick={() => handleReasonClick(project.task_description)}
                          className="text-left hover:text-blue-600 cursor-pointer"
                        >
                          {truncateText(project.task_description)}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                          ${
                            project.task_status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : project.task_status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {project.task_status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {new Date(project.task_start_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {new Date(project.task_end_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        <button
                          onClick={() => handleActionClick(project)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <ClipboardEdit className="w-4 h-4 mr-2" />
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Full Description"
      >
        {selectedReason}
      </Modal>
      <ActionModal
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          project={selectedProject}
        />

    </div>
    </div>
    
  );
};

export default TaskBox;