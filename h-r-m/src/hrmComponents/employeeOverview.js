import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; 

function EmployeeOverview() {
  const { id } = useParams(); 
  console.log(id);
  const [employee, setEmployee] = useState(null); 

  const getEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/adduser/getSingleEmployee/${id}`);
      console.log(response.data.data);
      if (response.data.success) {
        setEmployee(response.data.data);
      } else {
        console.error("Failed to fetch employee:", response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    }
  };

  useEffect(() => {
    if (id) getEmployee();
  }, [id]); 

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Overview</h2>
        <div className="space-x-2">
         <Link to={`/personaldetails/${employee.emp_id}`}><button className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm">VIEW PERSONAL DETAILS</button></Link>
          <button className="bg-purple-500 text-white px-3 py-1.5 rounded text-sm">DOWNLOAD</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Main Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-xs">Employee ID</p>
            <p className="text-sm">{employee.emp_id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Email ID</p>
            <p className="text-sm">{employee.emp_personal_email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Department</p>
            <p className="text-sm">{employee.emp_department?.[0]?.dep_name || "Department Not Found"}</p>

          </div>
          <div>
            <p className="text-gray-500 text-xs">Current Office Location</p>
            <p className="text-sm">
              {employee.office_location ||
                "Nikatby technologies pvt ltd, Noida, Uttar Pradesh, India (Non-Metro City)"}
            </p>
          </div>
              
          <div>
            <p className="text-gray-500 text-xs">HOD</p>
            <p className="text-sm">
              {employee.hod || "Dr Bandana Kedia (PPIN311)"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Gender</p>
            <p className="text-sm">{employee.emp_gender}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Date of Joining</p>
            <p className="text-sm">
              {new Date(employee.emp_join_date).toLocaleDateString() ||
                "28-02-2022"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date of Confirmation</p>
            <p className="text-sm">
              {new Date(employee.emp_confirmation_date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Company</p>
            <p className="text-sm">
              {employee.company || "NikatBy Technologies  Pvt. Ltd."}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Team Leader</p>
            <p className="text-sm">{employee.team_leader_name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Manager</p>
            <p className="text-sm">{employee.manager_name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Assigned Permission</p>
            <p className="text-sm">{employee.role_info?.[0]?.permission}</p>
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
              <p className="text-sm">{employee.first_name || "User"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Middle Name</p>
              <p className="text-sm">{employee.middle_name || "N.A"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Last Name</p>
              <p className="text-sm">{employee.last_name || "name"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Date of Birth</p>
              <p className="text-sm">{employee.dob || "22-04-1994"}</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Contact Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Contact</h3>
          <div>
            <p className="text-gray-500 text-xs">Office Mobile No1</p>
            <p className="text-sm">{employee.office_mobile_no || "8595800754"}</p>
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
      // Dynamically extract initials from the full name string using optional chaining
      employee?.manager_name 
      ? employee.manager_name
          .split(' ')  // Split the name by spaces
          .map((namePart) => namePart.charAt(0).toUpperCase())  // Get first letter of each part
          .join('')  // Join the initials together
      : ''  // Default to empty string if no manager_name exists
  }
</div>
<div className="text-center">
  <p className="text-xs font-medium">{employee?.manager_name}</p>  {/* Full name dynamically rendered */}
  <p className="text-xs text-gray-500">Director- People & Culture</p>
</div>
<div className="h-8 w-px bg-gray-300 my-2"></div>
</div>

<div className="flex flex-col items-center">
  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs mb-1 border-2 border-gray-300">
    {
      // Dynamically extract initials from the full name string using optional chaining
      employee?.team_leader_name 
      ? employee.team_leader_name
          .split(' ')  // Split the name by spaces
          .map((namePart) => namePart.charAt(0).toUpperCase())  // Get first letter of each part
          .join('')  // Join the initials together
      : ''  // Default to empty string if no team_leader_name exists
    }
  </div>
  <div className="text-center">
    <p className="text-xs font-medium">{employee?.team_leader_name}</p>  {/* Full name dynamically rendered */}
    <p className="text-xs text-gray-500">Director- People & Culture</p>
  </div>
  <div className="h-8 w-px bg-gray-300 my-2"></div>
</div>


            {/* Current Employee */}
            <div className="flex justify-center">
  <div className="flex bg-indigo-600 p-6 gap-3 items-center rounded-lg shadow-lg shadow-sky-400/50">
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white border-2 mb-1">
      {employee.emp_full_name
        .split(' ')  // Split the full name by space to get the first and last names
        .map((namePart) => namePart.charAt(0).toUpperCase())  // Take the first letter of each name part
        .join('')}  {/* Join the initials together */}
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-white">{employee.emp_full_name}</p>
      <p className="text-sm">{employee.emp_designation?.[0]?.designation_name || "Designation Not Found"}</p>
      <p className="text-sm">{employee.emp_department?.[0]?.dep_name || "Department Not Found"}</p>
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
