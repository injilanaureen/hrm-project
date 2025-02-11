import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CSVLink } from 'react-csv';


import axios from "axios";

import { ArrowLeft } from "lucide-react";
function EmployeeOverview() {
  const { id } = useParams();
  console.log(id);
  const [employee, setEmployee] = useState(null);
 
  const getEmployee = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/adduser/getSingleEmployeeBy/${id}`
      );
      console.log(response.data);
     
      setEmployee(response.data);
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    }
  };
 
  useEffect(() => {
    if (id) getEmployee();
  }, [id]);

  const formattedEmployeeData = [{
    emp_id: employee?.user?.emp_id || "N/A",
    emp_full_name: employee?.user?.emp_full_name || "N/A",
    emp_designation: employee?.user?.emp_designation || "N/A",
    dep_name: employee?.department?.dep_name || "N/A",
    emp_email: employee?.user?.emp_email || "N/A",
    emp_personal_email: employee?.user?.emp_personal_email || "N/A",
    emp_phone_no: employee?.user?.emp_phone_no || "N/A",
    role_name: employee?.role_name || "N/A",
    office_location: employee?.office_location || "N/A",
    hod: employee?.hod || "N/A",
    emp_gender: employee?.user?.emp_gender || "N/A",
    emp_join_date: employee?.user?.emp_join_date
      ? new Date(employee.user.emp_join_date).toLocaleDateString()
      : "N/A",
    emp_confirmation_date: employee?.user?.emp_confirmation_date
      ? new Date(employee.user.emp_confirmation_date).toLocaleDateString()
      : "N/A",
    emp_dob: employee?.user?.emp_dob
      ? new Date(employee.user.emp_dob).toLocaleDateString()
      : "N/A"
  }];
  console.log(formattedEmployeeData)
 
  if (!employee) return <div>Loading...</div>;
  const headers = [
    { label: 'Employee ID', key: 'emp_id' },
    { label: 'Full Name', key: 'emp_full_name' },
    { label: 'Designation', key: 'emp_designation' },
    { label: 'Department', key: 'dep_name' },  // Corrected key
    { label: 'Email ID', key: 'emp_email' },   // Corrected key
    { label: 'Personal Email', key: 'emp_personal_email' },
    { label: 'Office Mobile Number', key: 'emp_phone_no' },
    { label: 'Current Role', key: 'role_name' },
    { label: 'Office Location', key: 'office_location' },
    { label: 'HOD', key: 'hod' },
    { label: 'Gender', key: 'emp_gender' }, // Corrected key
    { label: 'Date of Joining', key: 'emp_join_date' },
    { label: 'Date of Confirmation', key: 'emp_confirmation_date' },
    { label: 'Date of Birth', key: 'emp_dob' }
  ];
  const fullName = employee?.user?.emp_full_name || "";
  const nameParts = fullName.split(" ");
  
  const firstName = nameParts[0] || "NA";
  const middleName = nameParts.length > 2 ? nameParts[1] : "N/A"; // Middle name is only assigned if there are more than two parts
  const lastName = nameParts.length > 2 ? nameParts[2] : nameParts[1] || "NA"; // If only two parts, assign the second as the last name
  
 
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
          <Link to={`/personaldetails/${employee?.user?.emp_id}`}>
            <button className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm">
              VIEW PERSONAL DETAILS
            </button>
          </Link>
        <CSVLink
                 data={formattedEmployeeData}  // <-- Using filteredEmployees here
                 headers={headers}
                 filename={"employee_details.csv"}
                 className="bg-purple-500 text-white px-3 py-1.5 rounded text-sm"               >
            DOWNLOAD
        </CSVLink>
 
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
              {employee?.hod || "Nitesh Pathak"}
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
  <p className="text-sm">{firstName}</p>
</div>
<div>
  <p className="text-gray-500 text-xs">Middle Name</p>
  <p className="text-sm">{middleName || " "}</p> {/* Empty if no middle name */}
</div>
<div>
  <p className="text-gray-500 text-xs">Last Name</p>
  <p className="text-sm">{lastName}</p>
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
      (employee?.manager?.name || "N/A") // Ensure it's a string
        .split(" ")
        .map((namePart) => namePart.charAt(0).toUpperCase())
        .join("")
    }
  </div>
  <div className="text-center">
    <p className="text-xs font-medium">{employee?.manager?.name|| "N/A"}</p>
    <p className="text-xs text-gray-500">{employee?.manager?.designation}</p>
  </div>
  <div className="h-8 w-px bg-gray-300 my-2">

  </div>
</div>


    <div className="flex flex-col items-center">
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs mb-1 border-2 border-gray-300">
        {
          (employee?.teamLeader?.name|| "") 
            .split(" ")
            .map((namePart) => namePart.charAt(0).toUpperCase())
            .join("")
        }
      </div>
      <div className="text-center">
        <p className="text-xs font-medium">{employee?.teamLeader?.name || "N/A"}</p>
        <p className="text-xs text-gray-500">{employee?.teamLeader?.designation}</p>
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

export default EmployeeOverview;
 
 