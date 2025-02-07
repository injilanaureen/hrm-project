import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaEdit } from "react-icons/fa"; // If using React Icons for better performance
import { FaKey, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

function Employee() {
  const [modalEmployee, setModalEmployee] = useState({});
  const { user } = useAuth();

  const [employee, setEmployee] = useState(null);

  const handleEditClick = () => {
    setIsModalOpen(true);
    setModalEmployee(employee); // Load current data into the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/adduser/getSingleEmployeeBy/${user.emp_id}`
      );
      console.log(response.data);
      
      setEmployee(response.data);
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    }
  };

  useEffect(() => {
    if (user.emp_id) getEmployee();
  }, [user.emo_id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className=" gap-1">
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Profile</h2>
        <div className="space-x-2">
          <Link to={`/employeepersonaldetails/${employee?.user?.emp_id}`}>
            <button className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm">
              VIEW PERSONAL DETAILS
            </button>
          </Link>
          <button className="bg-purple-500 text-white px-3 py-1.5 rounded text-sm">
            DOWNLOAD
          </button>

          {/* forget button  */}
          {/* <button className="bg-indigo-400 text-white px-3 py-1.5 rounded text-sm" onClick={() => setShowPasswordModal(true)}>
          FORGOT PASSWORD
          </button> */}
          {/* forget model  */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Main Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-xs">Employee ID</p>
            <p className="text-sm">{employee?.user?.emp_id || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Email ID</p>
            <p className="text-sm">
              {employee?.user?.emp_personal_email || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Department</p>
            <p className="text-sm">{employee?.department?.dep_name || "N/A"}</p>
            </div>
          <div>
            <p className="text-gray-500 text-xs">Current Office Location</p>
            <p className="text-sm">
              {employee?.office_location ||
                "Nikatby Technologies Pvt Ltd, Noida, Uttar Pradesh, India"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">HOD</p>
            <p className="text-sm">
              {employee?.hod || "Dr Bandana Kedia (PPIN311)"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Gender</p>
            <p className="text-sm">{employee?.user?.emp_gender || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date of Joining</p>
            <p className="text-sm">
              {employee?.user?.emp_join_date
                ? new Date(employee.user.emp_join_date).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date of Confirmation</p>
            <p className="text-sm">
              {employee?.user?.emp_confirmation_date
                ? new Date(
                    employee.user.emp_confirmation_date
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Biographical Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Biographical</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">First Name</p>
              <p className="text-sm">
                {" "}
                {employee?.user?.emp_full_name
                  ? employee?.user?.emp_full_name.split(" ")[0]
                  : "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Middle Name</p>
              <p className="text-sm">
                {" "}
                {employee?.user?.emp_full_name
                  ? employee?.user?.emp_full_name.split(" ")[1] || "NA"
                  : "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Last Name</p>
              <p className="text-sm">
                {employee?.user?.emp_full_name
                  ? employee?.user?.emp_full_name.split(" ")[2] || "NA"
                  : "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Date of Birth</p>
              <p className="text-sm">
                {new Date(employee?.user?.emp_dob).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        <div>
          <h3 className="text-sm font-medium mb-3">Contact</h3>
          <div>
            <p className="text-gray-500 text-xs">Office Mobile No</p>
            <p className="text-sm">{employee?.user?.emp_phone_no}</p>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Organization Chart */}
        <div>
  <h3 className="text-sm font-medium mb-6">Organization Chart</h3>
  <div className="relative">
  <div className="flex flex-col items-center">
  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs mb-1 border-2 border-gray-300">
    {
      (employee?.manager || "N/A") // Ensure it's a string
        .split(" ")
        .map((namePart) => namePart.charAt(0).toUpperCase())
        .join("")
    }
  </div>
  <div className="text-center">
    <p className="text-xs font-medium">{employee?.manager || "N/A"}</p>
    <p className="text-xs text-gray-500">Project Manager</p>
  </div>
  <div className="h-8 w-px bg-gray-300 my-2"></div>
</div>


    <div className="flex flex-col items-center">
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs mb-1 border-2 border-gray-300">
        {
          (employee?.user?.team_leader_id || "") 
            .split(" ")
            .map((namePart) => namePart.charAt(0).toUpperCase())
            .join("")
        }
      </div>
      <div className="text-center">
        <p className="text-xs font-medium">{employee?.user?.team_leader_id || "N/A"}</p>
        <p className="text-xs text-gray-500">Team Leader</p>
      </div>
      <div className="h-8 w-px bg-gray-300 my-2"></div>
    </div>

    {/* Current Employee */}
    <div className="flex justify-center">
      <div className="flex bg-indigo-600 p-6 gap-3 items-center rounded-lg shadow-lg shadow-sky-400/50">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white border-2 mb-1">
          {
            (employee?.user?.emp_full_name || "") 
              .split(" ")
              .map((namePart) => namePart.charAt(0).toUpperCase())
              .join("")
          }
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-white">{employee?.user?.emp_full_name || "N/A"}</p>
          <p className="text-xs text-white">{employee?.designation?.designation_name || "N/A"}</p>
          <p className="text-sm">{employee?.department?.dep_name || "N/A"}</p>
          </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default Employee;
