import React, { useState, useEffect } from 'react';
import { ArrowLeft, EyeOff,XCircle, Plus,Minus } from 'lucide-react';
import { Link } from "react-router-dom";
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Filter } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Eye } from 'lucide-react';
import { FolderInput } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { motion } from "framer-motion";
import EmployeePersonalDetailsForm from "./employementPersonalDetails";
import UpdateEmploymentStatusModal from "./UpdateEmploymentStatusModal";
import UpdateResignedEmployeeForm from "./updateResignedEmployeeModal";
import ResignedEmployees1 from "./resignedEmployeeshr";


function Employee() {
  const [formData, setFormData] = useState({
    empFullName: '',
    empPersonalEmail: '',
    empPhoneNo: '',
    empAadhaarNo: '',
    empPanCardNo: '',
    empDepartment: '',
    empDesignation: '',
    empConfirmationdate:'',
    empofferedCTC:'',
    empJoinDate: '',
    empStatus: 'Inactive',
    empGender:'',
    empDob:'',
    role: '',
    rolePermission: '',
  });

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
  const [allEmployeeData,setAllEmployeeData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployee1, setSelectedEmployee1] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employmentStatus, setEmployementStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'inactive', 'Resigned'
 

  // Separate state for settings (different from filters)
  const [settings, setSettings] = useState({
    groupBy: '',  // For grouping employees (designation, department, etc.)
    column1: true,  // Name column
    column2: true,  // ID column
    column3: true,  // Designation column
    column4: true,  // Department column
    column5: true,  // Email column
    column6: true,  // Personal Email column
    column7: true,  // Office Mobile Number column
    column8: true,  // Current Role column
  });
  
  
  const [filterSheet,setFilterSheet] = useState(false);
  const [filters,setFilters] = useState({
    empDepartment: '',
    empDesignation: '',
    empJoinDate: '',
    empStatus: '',
    role: '',
    workLocation:'',

  });

  const applySettings = () => {
    console.log('Settings applied:', settings);
    isSidebarOpen(false); // Close sidebar after applying settings
  };

  const resetSettings = () => {
    setSettings({
      setting1: '',
      column1: false,
      column2: false,
      column3: false,
      setting2: ''
    });
    console.log('Settings reset');
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'role') {
      fetchRolePermissions(value);
    }

   
  };

  const handleFilter=(e)=>{
    const {name, value}= e.target;
    setFilters({...filters,[name]:value})
  }

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adduser/fetchRole');
      if (response.data.success) {
        setRoles(response.data.data);
      } else {
        console.error("Failed to fetch roles", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adduser/fetchDepartment');
      if (response.data.success) {
        setDepartments(response.data.data);
      } else {
        console.error("Failed to fetch department", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching department", error);
    }
  };


  const fetchDesignations = async (dept_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/adduser/fetchDesignation?dept_id=${dept_id}`);
      if (response.data.success) {
        setDesignations(response.data.data);
      } else {
        console.error("Failed to fetch designations", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching designations", error);
    }
  };

  const fetchRolePermissions = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/adduser/getRolePermissions?role_id=${roleId}`);
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          rolePermission: response.data.permissions
        }));
      } else {
        console.error('Failed to fetch permissions:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adduser/getAllEmployees');
      console.log("Response data:", response.data.data); // Log the response
      const employeesData = response.data.data;
      
      // Separate employees based on their statuses and roles
      const activeEmployeesData = employeesData.filter(emp => emp.emp_status !== 'resigned');
      if (response.data.success) {
      
        setAllEmployeeData(activeEmployeesData);
        setFilteredEmployees(activeEmployeesData);
        
      } else {
        console.error('Failed to fetch employees:', response.data.error);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleSearch = (e)=>{
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const searchResults  = allEmployeeData.filter((employee) => 
      employee.emp_full_name.toLowerCase().includes(value)
    );
    
    setFilteredEmployees(searchResults );
  }
  const resetSearch= ()=>{
    setSearchTerm('');
    setFilteredEmployees(allEmployeeData);
  }

  useEffect(() => {
    fetchRoles();
    fetchDepartment();
  }, []);


  useEffect(()=>{
    fetchAllEmployees();
  },[]);

  useEffect(() => {
    if (selectedDepartment) {
      fetchDesignations(selectedDepartment);
    }
  }, [selectedDepartment]);

  const openEmploymentModal = (employee) => {
    setSelectedEmployee(employee);
    setEmployementStatus(true);
  };
  const openUpdateFormModal = (employee) => {
    if (employee.emp_empstatus === "Probation") {
      setSelectedEmployee1(employee);
      setShowDialog1(true); // Open probation update form
    } else if (employee.emp_empstatus === "On Resign") {
      setSelectedEmployee1(employee);
      setShowDialog2(true); // Open resigned employee form
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/adduser/submitUser",
       formData
      );
          
      if (response.data.success) {
        console.log("User added successfully:", response.data);
      
        setShowDialog(false);
        // Reset form
        setFormData({
          empFullName: '',
          empPersonalEmail: '',
          empPhoneNo: '',
          empAadhaarNo: '',
          empPanCardNo: '',
          empDepartment: '',
          empDesignation: '',
          empConfirmationdate:'',
          empofferedCTC:'',
          empJoinDate: '',
          empStatus: '',
          empGender:'',
          empDob:'',
          role: '',
          rolePermission: '',
        });
      } else {
        console.error("Failed to add user:", response.data.error);
        alert("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm(''); // Clear search when filters are applied

    console.log("Filters applied:", filters); // Debugging the filter state

  
    const filteredData = allEmployeeData.filter((employee) => {
      return (
        (filters.empDepartment === '' || employee.emp_department === filters.empDepartment) &&
        (filters.empDesignation === '' || employee.emp_designation === filters.empDesignation) &&
        (filters.empJoinDate === '' || employee.emp_join_date === filters.empJoinDate) &&
        (filters.empStatus === '' || employee.emp_status === filters.empStatus) &&
        (filters.role === '' || employee.role_name === filters.role) &&
        (filters.workLocation === '' || employee.work_location === filters.workLocation)
      );
    });
  
    console.log(filteredData)
    setFilteredEmployees(filteredData);
    setFilterSheet(false); // Close filter sheet when filters are applied
      
  };
  const resetFilters = () => {
    setFilters({
      empDepartment: '',
      empDesignation: '',
      empJoinDate: '',
      empStatus: '',
      role: '',
      workLocation: '',
    });
    setSearchTerm('');
    setFilteredEmployees(allEmployeeData); // Reset table to full data
  };
  
  const renderTableData = () => {
    const groupedData = groupedEmployees();
    return Object.entries(groupedData).map(([group, employees]) => (
      <div key={group}>
        <div className="text-lg font-semibold bg-gray-200 p-2">{group}</div> {/* Group title */}
        {employees.map((row) => ( // Iterate over employees instead of group
          <div 
            key={row.id} 
            className="grid grid-cols-[50px_150px_80px_150px_150px_250px_300px_200px_150px_150px] bg-white hover:bg-gray-100"
          >
            {settings.column1 && <div className="p-2"><input type="checkbox" className="accent-secondary-color" /></div>}
            {settings.column2 && (
              <Link to="/employeeOverview">
                <div className="p-2 flex items-center gap-4 text-blue-600 font-semibold underline">
                  {row.emp_full_name} <EllipsisVertical className="text-gray-400 size-4" />
                </div>
              </Link>
            )}
            {settings.column3 && <div className="p-2 text-md">{row.emp_id}</div>}
            {settings.column4 && <div className="p-2 text-md">{row.emp_designation}</div>}
            {settings.column5 && <div className="p-2 text-md">{row.emp_department}</div>}
            {settings.column6 && <div className="p-2 text-md">{row.emp_email}</div>}
            {settings.column7 && <div className="p-2 text-md">{row.emp_personal_email}</div>}
            {settings.column8 && <div className="p-2 text-md">{row.emp_phone_no}</div>}
            {settings.column9 && <div className="p-2 text-md">{row.role_name}</div>}
          </div>
        ))}
      </div>
    ));
  };
  

  const handleSettingChange = (event) => {
    const { name, type, value, checked } = event.target;
  
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value, // Toggle checkboxes & update radio values
    }));
  };
  

  // Group filtered employees based on selected setting
  const groupedEmployees = () => {
    if (!settings.groupBy) return filteredEmployees;
    return filteredEmployees.reduce((groups, employee) => {
      const groupKey = employee[settings.groupBy];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(employee);
      return groups;
    }, {});
  };

  const headers = [
    { label: 'Name', key: 'emp_full_name' },
    { label: 'ID', key: 'emp_id' },
    { label: 'Designation', key: 'emp_designation' },
    { label: 'Department', key: 'emp_department' },
    { label: 'Email ID', key: 'emp_email' },
    { label: 'Personal Email', key: 'emp_personal_email' },
    { label: 'Office Mobile Number', key: 'emp_phone_no' },
    { label: 'Current Role', key: 'role_name' }
  ];
  // Tab button handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-h-screen">
      <Link to="/">
        <div className="flex items-center gap-1">
          <ArrowLeft />
          <p>Employee</p>
        </div>
      </Link>
      
      {/** new hire and directory row */}

      <div className="flex justify-between items-center p-2 mt-4">
          <p className="text-indigo-400 underline">Directory</p>
        
        <button
          className="text-indigo-400 border-2 border-gray-300 p-2 flex items-center"
          onClick={() => setShowDialog(true)}
        >
          <Plus className='size-4' /><p className='text-sm font-bold'>New Hire</p> 
        </button>
      </div>
   
         {/** active,inactive amnd resigned roe row */}

      <div className="mb-4">
      <button
        onClick={() => handleTabClick('active')}
        className={`py-1 px-3 ${activeTab === 'active' ? 'bg-indigo-400 text-white' : 'bg-gray-200 text-gray-800'} rounded-md mr-2 text-sm`}
      >
        All Employees
      </button>
   
      <button
        onClick={() => handleTabClick('resign')}
        className={`py-1 px-3 ${activeTab === 'resign' ? 'bg-indigo-400 text-white' : 'bg-gray-200 text-gray-800'} rounded-md text-sm`}
      >
        Resigned Employees
      </button>
    </div>

 

{/** employee table */}
   <div>
  {/* Table Section */}
  {activeTab === 'active' && (
    <div>
        {/** search and filter row */}
     <div className="flex justify-between items-center mt-10 ml-0">  
             {/** search */}
           <div className='border-2 flex gap-1 p-2 items-center border-gray-400 rounded-lg'>
             <Search className='text-gray-600 size-4'/>
             <input
              type="text" name='search'
              placeholder="Search Employee"
              className="border-none bg-transparent outline-none rounded-lg w-96 text-sm text-gray-600"
              value={searchTerm}
              onChange={handleSearch}
              />
               {searchTerm && (
                <button onClick={resetSearch} 
                className='text-gray-600'
                >
                  <XCircle/>
                </button>
              )}
    

           </div>
           {(Object.values(filters).some(value => value !== '')) && (
  <button
    onClick={resetFilters}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
  >
    Reset
  </button>
)}
 
           <div className='flex relative'>
     
        <button
          className=" border-2 border-gray-300 p-2 flex"
          onClick={() => setFilterSheet(true)}
        >
          <Filter  className='size-4' />
           <div className='rounded-full bg-indigo-400 absolute size-4 top-1 left-5 text-xs text-white'>
            {Object.values(filters).filter(value=>value !== '').length}</div>
        </button>
        
        <button
          className=" border-2 border-l-0 border-gray-300 p-2 flex"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Settings className='size-4' /> 
          <div className='rounded-full bg-indigo-400 absolute size-4 top-1 left-14 text-xs text-white'> {Object.values(settings).filter(value=>value !== '').length}</div>
        </button><button
          className=" border-2 border-l-0 border-gray-300 p-2 flex"
          onClick={() => setShowDialog(true)}
        >
          <Eye className='size-4' />
        </button>
        <button
          className=" border-2 border-l-0 border-gray-300 p-2 flex">
        <CSVLink
          data={filteredEmployees}  // <-- Using filteredEmployees here
          headers={headers}
          filename={"employees.csv"}
        >
          <FolderInput className='size-4' />
        </CSVLink>
        </button>
           </div>
      </div>
   
  <div className="overflow-x-auto border border-gray-300 mt-5 rounded-lg">
   
    <table className="min-w-full table-auto text-sm">
      <thead className="bg-primary-color text-btn-text-color font-semibold">
        <tr className="bg-indigo-400">
          <th className="py-2 px-3 text-left">
            <input type="checkbox" className="accent-secondary-color" />
          </th>
          <th className="py-2 px-3 text-white text-left">Name</th>
          <th className="py-2 px-3 text-white text-left">ID</th>
          <th className="py-2 px-3 text-white text-left">Designation</th>
          <th className="py-2 px-3 text-white text-left">Department</th>
          <th className="py-2 px-3 text-white text-left">Official Email ID</th>
          <th className="py-2 px-3 text-white text-left">Team Leader</th>
          <th className="py-2 px-3 text-white text-left">Manager</th>
          <th className="py-2 px-3 text-white text-left">Office Mobile Number</th>
          <th className="py-2 px-3 text-white text-left">Current Role</th>
          <th className="py-2 px-3 text-white text-left">Joining Date</th>
          <th className="py-2 px-3 text-white text-left">Status</th>
          <th className="py-2 px-3 text-white text-left">Employement Status</th>
          <th className="py-2 px-3 text-white text-left">Last Updated Time</th>
          <th className="py-2 px-3 text-white text-left">last Updated Status</th>
          <th className="py-2 px-3 text-white text-left">Action</th>
          <th className="py-2 px-3 text-white text-left">Update</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {filteredEmployees.map((row) => (
          <tr
            key={row.id}
            className="bg-white hover:bg-gray-100"
          >
            <td className="py-2 px-3">
              <input type="checkbox" className="accent-secondary-color" />
            </td>
            <td className="py-2 px-3">
              <Link to={`/employeeOverview/${row.emp_id}`} className="flex items-center gap-4 text-blue-600 font-semibold underline">
                {row.emp_full_name}
                <EllipsisVertical className="text-gray-400 size-4" />
              </Link>
            </td>
            <td className="py-2 px-3">{row.emp_id || 'Not Generated' }</td>
            <td className="py-2 px-3">{row.designation_name}</td>
            <td className="py-2 px-3">{row.department_name }</td>
            <td className="py-2 px-3">{row.emp_email || 'Not Generated yet' }</td>
            <td className="py-2 px-3">{row.team_leader_name || 'Not assigned'}</td>
            <td className="py-2 px-3">{row.manager_name || 'Not assigned'}</td>
            <td className="py-2 px-3">{row.emp_phone_no}</td>
            <td className="py-2 px-3">{row.role_name}</td>
            <td className="py-2 px-3">{new Date(row.emp_join_date).toLocaleDateString('en-GB')}</td>
            <td className={`py-2 px-3 ${row.emp_status === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {row.emp_status}
        </td>
      <td className={`py-2 px-3 ${row.emp_empstatus === 'Permanent' ? 'bg-green-600' : 'bg-yellow-500'} text-white`}>
                {(() => {
                  const joiningDate = new Date(row.emp_join_date);
                  const currentDate = new Date();
                  const diffInMonths =
                    (currentDate - joiningDate) / (1000 * 3600 * 24 * 30);

                  if (diffInMonths <= 3) {
                    return row.emp_empstatus ;
                  } else {
                    return "Pending Approval for Permanent Status";
                  }
                })()}
              </td>
              <td className="py-2 px-3">{row.last_updated_time}</td>
            <td className="py-2 px-3">{row.last_updated_status}</td>
            <td className="py-2 px-3"><button className='p-2 bg-indigo-500 text-white' onClick={()=>openEmploymentModal(row)}>Edit</button></td>
            <td className="py-2 px-3"><button className='p-2 bg-indigo-500 text-white' onClick={()=>openUpdateFormModal(row)}>Update</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>)}

  {activeTab === 'resign' && (
        <ResignedEmployees1/>  
    )}
   </div>

 {/* Employment Status Modal */}
 {employmentStatus && (
        <UpdateEmploymentStatusModal
        selectedEmployee={selectedEmployee}
        setEmployementStatus={setEmployementStatus}/>
        )}
  
  {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-3/4 md:w-1/2 lg:w-2/3">
            <h2 className="text-lg mb-4 font-semibold">Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empRole" className="block">Role *</label>
                  <select
                    id="empRole"
                    name="role"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a Role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="empFullName" className="block">Full Name *</label>
                  <input
                    type="text"
                    id="empFullName"
                    name="empFullName"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Full Name"
                    value={formData.empFullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empDepartment" className="block">Department *</label>
                  <select
                    id="empDepartment"
                    name="empDepartment"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empDepartment}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedDepartment(e.target.value);
                    }}
                    required
                  >
                    <option value="" disabled>Select Department</option>
                    {departments.map((department) => (
                      <option key={department.dep_id} value={department.dep_id}>
                        {department.dep_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="empDesignation" className="block">Designation *</label>
                  <select
                    id="empDesignation"
                    name="empDesignation"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empDesignation}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation.designation_id} value={designation.designation_id}>
                        {designation.designation_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               

                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empPhoneNo" className="block">Phone Number</label>
                  <input
                    type="tel"
                    id="empPhoneNo"
                    name="empPhoneNo"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Phone Number"
                    value={formData.empPhoneNo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="empAadhaarNo" className="block">Aadhaar Number</label>
                  <input
                    type="text"
                    id="empAadhaarNo"
                    name="empAadhaarNo"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Aadhaar Number"
                    value={formData.empAadhaarNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empConfirmationdate" className="block">Confirmation Date</label>
                  <input
                    type="date"
                    id="empConfirmationdate"
                    name="empConfirmationdate"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="PAN Card Number"
                    value={formData.empConfirmationdate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="empJoinDate" className="block">Date of Joining *</label>
                  <input
                    type="date"
                    id="empJoinDate"
                    name="empJoinDate"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empJoinDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empPanCardNo" className="block">PAN Card Number</label>
                  <input
                    type="text"
                    id="empPanCardNo"
                    name="empPanCardNo"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="PAN Card Number"
                    value={formData.empPanCardNo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="empJoinDate" className="block">Offered CTC *</label>
                  <input
                    type="text"
                    id="empofferedCTC"
                    name="empofferedCTC"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empofferedCTC}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empStatus" className="block">Status *</label>
                  <select
                    id="empStatus"
                    name="empStatus"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="Inactive" disabled>Inactive</option>
                  
                  </select>
                </div>
                <div>
                  <label htmlFor="empPersonalEmail" className="block">Personal Email *</label>
                  <input
                    type="email"
                    id="empPersonalEmail"
                    name="empPersonalEmail"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Personal Email"
                    value={formData.empPersonalEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empDob" className="block">Date of Birth *</label>
                  <input
                    type="date"
                    id="empDob"
                    name="empDob"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empDob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="empGender" className="block">Gender *</label>
                  <select
                    id="empGender"
                    name="empGender"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empGender}
                    onChange={handleChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="rolePermission" className="block">Role Permissions</label>
                <textarea
                  id="rolePermission"
                  name="rolePermission"
                  className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                  value={formData.rolePermission || "Role permissions will be displayed here"}
                  readOnly
                />
              </div>

              <div className="mt-4 flex justify-between">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  Submit
                </button>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => setShowDialog(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

 {showDialog1 && selectedEmployee1?.emp_empstatus === "Probation" && (
   <EmployeePersonalDetailsForm
       setSelectedDepartment={setSelectedDepartment}
       setShowDialog1={setShowDialog1}    
       selectedEmployee1={selectedEmployee1}
   />
)}

{showDialog2 && selectedEmployee1?.emp_empstatus === "On Resign" && (
   <UpdateResignedEmployeeForm
       setShowDialog2={setShowDialog2}
       selectedEmployee1={selectedEmployee1}
   />
)}

{filterSheet && (
          <div className="fixed top-0 right-0 z-50 items-center bg-black bg-opacity-50 backdrop-blur-sm w-full justify-center h-screen">
                 <motion.div
        initial={{ x: "100%" }} // Start outside the screen
        animate={{ x: filterSheet ? "0%" : "100%" }} // Slide in/out
        transition={{ type: "spring", stiffness: 100, damping: 15 }} // Smooth effect
        className="relative h-screen w-[400px] sm:w-[500px] bg-white shadow-2xl rounded-l-xl p-6 flex flex-col"
      >
 

        {/* Filter Form */}
        <h2 className="text-lg font-semibold text-gray-800">Filter Employees</h2>
            <form onSubmit={handleFilterSubmit} className='flex flex-col gap-6 '> 
                <div>   
                  <select
                    id="role"
                    name="role"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={filters.role}
                    onChange={handleFilter}
                    
                  >
                    <option value="" disabled>Select a Role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>

                  <select
                    id="empDepartment"
                    name="empDepartment"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={filters.empDepartment}
                    onChange={(e) => {
                      handleFilter(e);
                      setSelectedDepartment(e.target.value);
                    }}
                  >
                    <option value="" disabled>Select Department</option>
                    {departments.map((department) => (
                      <option key={department.dep_id} value={department.dep_name}>
                        {department.dep_name}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  
                  <select
                    id="empDesignation"
                    name="empDesignation"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={filters.empDesignation}
                    onChange={handleFilter}
                    
                  >
                    <option value="" disabled>Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation.designation_id} value={designation.designation_name}>
                        {designation.designation_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="empJoinDate" className="block">Date of Joining *</label>
                  <input
                    type="date"
                    id="empJoinDate"
                    name="empJoinDate"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={filters.empJoinDate}
                    onChange={handleFilter}
                    
                  />
                </div>

                <div>
                  <select
                    id="empStatus"
                    name="empStatus"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={filters.empStatus}
                    onChange={handleFilter}
                
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="Inactive" >Inactive</option>
                    <option value="Active" >Active</option>
                    
                  </select>
                </div>
                <div>
                  <select
                    id="workLocation"
                    name="workLocation"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={filters.workLocation}
                    onChange={handleFilter}
                
                  >
                    <option value="" disabled>Select Work Location</option>
                    <option value="Noida" >Noida</option>
                    <option value="Bihar" >Bihar</option>
                    
                  </select>
                </div>

                <div className="mt-4 flex justify-between">
                <button  type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  Submit
                </button>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => setFilterSheet(false)}
                >
                  Close
                </button>
              </div>
            </form>
            </motion.div>
              </div>
            
              )}

{isSidebarOpen && (
  <div className={`fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="flex justify-between p-4 bg-gray-100 border-b">
      <span className="text-lg font-semibold">Settings</span>
      <span className="cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
        <Minus width="12" height="12" />
      </span>
    </div>

    {/* Sidebar Content */}
    <div className="p-4 overflow-y-auto">
      {/* Grouping Setting */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Group by</h3>
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="radio"
              name="groupBy"
              value="emp_designation"
              checked={settings.groupBy === 'emp_designation'}
              onChange={handleSettingChange}
              className="mr-2"
            />
            Designation
          </label>
          <label>
            <input
              type="radio"
              name="groupBy"
              value="emp_department"
              checked={settings.groupBy === 'emp_department'}
              onChange={handleSettingChange}
              className="mr-2"
            />
            Department
          </label>
          <label>
            <input
              type="radio"
              name="groupBy"
              value="emp_join_date"
              checked={settings.groupBy === 'emp_join_date'}
              onChange={handleSettingChange}
              className="mr-2"
            />
            Join Date
          </label>
        </div>
      </div>

      {/* Column Visibility Settings */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Columns</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "column1", label: "Name" },
            { key: "column2", label: "ID" },
            { key: "column3", label: "Designation" },
            { key: "column4", label: "Department" },
            { key: "column5", label: "Email" },
            { key: "column6", label: "Personal Email" },
            { key: "column7", label: "Office Mobile Number" },
            { key: "column8", label: "Current Role" },
          ].map(({ key, label }) => (
            <label key={key}>
              <input
                type="checkbox"
                name={key}
                checked={settings[key]}
                onChange={handleSettingChange}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* Footer with Reset, Cancel, and Apply Buttons */}
    <div className="flex justify-between p-4 border-t bg-gray-100">
      <button
        onClick={() =>
          setSettings({
            groupBy: '',
            column1: true,
            column2: true,
            column3: true,
            column4: true,
            column5: true,
            column6: true,
            column7: true,
            column8: true,
          })
        }
        className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Reset
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-600 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
)}

</div>
  );
};


export default Employee;