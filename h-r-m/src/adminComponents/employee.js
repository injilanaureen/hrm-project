import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Filter } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Eye } from 'lucide-react';
import { FolderInput } from 'lucide-react';
import { CSVLink } from 'react-csv';

import { EllipsisVertical } from 'lucide-react';
import ResignedEmployees from "./resignedEmployees";

const EmployeeTabs = () => {
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'inactive', 'Resigned'
  const [employees, setEmployees] = useState([]);
  const [inactiveEmployees, setInactiveEmployees] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [teamLeaderList, setTeamLeaderList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
  const [formData, setFormData] = useState({
    empStatus: '',
    empManager: '',
    empTeamLeader: '',
    workEmail: '',
    empPassword: '',
  });

  // Fetch all employees
  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adduser/getAllEmployees');
      if (response.data.success) {
        const employeesData = response.data.data;
        setEmployees(employeesData);
        
        // Separate employees based on their statuses and roles
        const inactiveEmployeesData = employeesData.filter(emp => emp.emp_status === 'Inactive');
        const activeEmployeesData = employeesData.filter(emp => emp.emp_status === 'Active');
        const managers = employeesData.filter(emp => emp.emp_designation === 'Manager');
        const teamLeaders = employeesData.filter(emp => emp.emp_designation === 'Team Leader');
        
        setInactiveEmployees(inactiveEmployeesData);
        setActiveEmployees(activeEmployeesData);
        setManagerList(managers);
        setTeamLeaderList(teamLeaders);
      } else {
        console.error('Failed to fetch employees:', response.data.error);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
    console.log(activeEmployees)
  };
  const handleSearch = (e)=>{
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const searchResults  = employees.filter((employee) => 
      employee.emp_full_name.toLowerCase().includes(value)
    );
    
    setFilteredEmployees(searchResults );
  }
  const resetSearch= ()=>{
    setSearchTerm('');
    setFilteredEmployees(employees);
  }
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm(''); // Clear search when filters are applied

    console.log("Filters applied:", filters); // Debugging the filter state

  
    const filteredData = employees.filter((employee) => {
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
    setFilteredEmployees(employees); // Reset table to full data
  };
  // Run fetchEmployees when component mounts
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open dialog for editing employee details
  const openDialog = (employee) => {

    const tempPassword = Math.random().toString(36).slice(-8);
    const generatedEmail = employee.emp_full_name.toLowerCase().replace(/\s+/g, '.') + '@nikatby.com';
    
    setSelectedEmployee(employee);
    setFormData({
      id: employee.id, // Ensure correct `id` is stored
    empStatus: '',
    empManager: '',
    empTeamLeader: '',
    workEmail: employee.emp_email || generatedEmail,
    empPassword: tempPassword,
    });
    setShowDialog(true);
  };
  const headers = [
    { label: 'ID', key: 'emp_id' },
    { label: 'Name', key: 'emp_full_name' },
    { label: 'Role', key: 'role_name' },
    { label: 'Official Email', key: 'emp_email' },
    { label: 'Department', key: 'emp_department' },
    { label: 'Designation', key: 'emp_designation' },
    { label: 'Join Date', key: 'emp_join_date' },
    { label: 'Status', key: 'emp_status' },
    { label: 'Employment Status', key: 'emp_empstatus' }
  ];
  
  const headers2 = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'emp_full_name' },
    { label: 'Role', key: 'role_name' },
    { label: 'Personal Email', key: 'emp_personal_email' },
    { label: 'Department', key: 'emp_department' },
    { label: 'Designation', key: 'emp_designation' },
    { label: 'Confirmation date', key: 'emp_confirmation_date'},
    { label: 'Joining date', key: 'emp_join_date'},
    { label: 'Offered CTC', key: 'emp_offered_ctc' },
    { label: 'Status', key: 'emp_status' },
  ];
  
  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!selectedEmployee || !selectedEmployee.id) {
      alert("Error: Employee ID is missing.");
      return;
    }
    try {
      const response = await axios.put("http://localhost:5000/api/adduser/updateUserStatus", formData, {
        headers: { "Content-Type": "application/json" }
      });



      if (response.data.success) {
        alert("Employee details updated successfully!");
        fetchAllEmployees(); // Refresh list after update
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("An error occurred while updating employee details.");
    }
    setShowDialog(false);
  };

  // Tab button handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6">
    {/* Tab Buttons */}
    <div className="mb-4">
      <button
        onClick={() => handleTabClick('active')}
        className={`py-1 px-3 ${activeTab === 'active' ? 'bg-indigo-400 text-white' : 'bg-gray-200 text-gray-800'} rounded-md mr-2 text-sm`}
      >
        Active Employees
      </button>
      <button
        onClick={() => handleTabClick('inactive')}
        className={`py-1 px-3 ${activeTab === 'inactive' ? 'bg-indigo-400 text-white' : 'bg-gray-200 text-gray-800'} rounded-md mr-2 text-sm`}
      >
        Inactive Employees
      </button>
      <button
        onClick={() => handleTabClick('resign')}
        className={`py-1 px-3 ${activeTab === 'resign' ? 'bg-indigo-400 text-white' : 'bg-gray-200 text-gray-800'} rounded-md text-sm`}
      >
        Resigned Employees
      </button>
    </div>
  
    {/* Dynamic Tab Content */}
    {activeTab === 'active' && (
      <div>
        <div>
          <h1 className="text-lg font-semibold mb-4 mt-10">Active Employees</h1>
             <div className="flex justify-between items-center m-10 mb-6 mr-0 ml-0">  
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
          data={activeEmployees}  // <-- Using filteredEmployees here
          headers={headers}
          filename={"employees.csv"}
        >
          <FolderInput className='size-4' />
        </CSVLink>
        </button>
           </div>
            </div>
        </div>
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-indigo-400">
              <th className="py-2 px-3 text-white text-left">ID</th>
              <th className="py-2 px-3 text-white text-left">Name</th>
              <th className="py-2 px-3 text-white text-left">Role</th>
              <th className="py-2 px-3 text-white text-left">Official Email</th>
              <th className="py-2 px-3 text-white text-left">Office Mobile Number</th>
              <th className="py-2 px-3 text-white text-left">Department</th>
              <th className="py-2 px-3 text-white text-left">Designation</th>
              <th className="py-2 px-3 text-white text-left">Team Leader</th>
              <th className="py-2 px-3 text-white text-left">Manager</th>
              <th className="py-2 px-3 text-white text-left">Joining Date</th>
              <th className="py-2 px-3 text-white text-left">Status</th>
              <th className="py-2 px-3 text-white text-left">Employment Status</th>
            </tr>
          </thead>
          <tbody>
            
            {activeEmployees.map(employee => (
              <tr key={employee.id} className="border-b">
                <td className="py-2 px-3">{employee.emp_id}</td>
                <td className="py-2 px-3">{employee.emp_full_name}</td>
                <td className="py-2 px-3">{employee.role_name}</td>
                <td className="py-2 px-3">{employee.emp_email}</td>
                <td className="py-2 px-3">{employee.emp_phone_no}</td>
                <td className="py-2 px-3">{employee.emp_department}</td>
                <td className="py-2 px-3">{employee.emp_designation}</td>
                <td className="py-2 px-3">{employee.team_leader_name || 'Not assigned'}</td>
                <td className="py-2 px-3">{employee.manager_name || 'Not assigned'}</td>
                <td className="py-2 px-3">{new Date(employee.emp_join_date).toLocaleDateString('en-GB')}</td>
                <td className="py-2 px-3 bg-green-500 text-white">{employee.emp_status}</td>
                <td className={`py-2 px-3 ${employee.emp_empstatus === 'Permanent' ? 'bg-green-600' : 'bg-yellow-500'} text-white`}>{employee.emp_empstatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  
    {activeTab === 'inactive' && (
      <div>
        <h1 className="text-lg font-semibold mb-4">Inactive Employees</h1>
        
        <div className="flex justify-between items-center m-10 mb-6 mr-0 ml-0">  
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
          data={inactiveEmployees}  // <-- Using filteredEmployees here
          headers={headers2}
          filename={"employees.csv"}
        >
          <FolderInput className='size-4' />
        </CSVLink>
        </button>
           </div>
      </div>
        {inactiveEmployees.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-sm">No employee inactive, Hire more...</p>
          </div>
        ) : (
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-indigo-400">
                <th className="py-2 px-3 text-white text-left">ID</th>
                <th className="py-2 px-3 text-white text-left">Full Name</th>
                <th className="py-2 px-3 text-white text-left">Role</th>
                <th className="py-2 px-3 text-white text-left">Personal email</th>
                <th className="py-2 px-3 text-white text-left">Department</th>
                <th className="py-2 px-3 text-white text-left">Offered position</th>
                <th className="py-2 px-3 text-white text-left">Department</th>
                <th className="py-2 px-3 text-white text-left">Confirmation date</th>
                <th className="py-2 px-3 text-white text-left">Expected Joining date</th>
                <th className="py-2 px-3 text-white text-left">Offered CTC</th>
                <th className="py-2 px-3 text-white text-left">Status</th>
                <th className="py-2 px-3 text-white text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {inactiveEmployees.map(employee => (
                <tr key={employee.id} className="border-b">
                  <td className="py-2 px-3">{employee.id}</td>
                  <td className="py-2 px-3">{employee.emp_full_name}</td>
                  <td className="py-2 px-3">{employee.role_name}</td>
                  <td className="py-2 px-3">{employee.emp_personal_email}</td>
                  <td className="py-2 px-3">{employee.emp_department}</td>
                  <td className="py-2 px-3">{employee.emp_designation}</td>
                  <td className="py-2 px-3">{employee.emp_department}</td>
                  <td className="py-2 px-3">{new Date(employee.emp_confirmation_date).toLocaleDateString('en-GB')}</td>
                  <td className="py-2 px-3">{new Date(employee.emp_join_date).toLocaleDateString('en-GB')}</td>
                  <td className="py-2 px-3">{employee.emp_offered_ctc}</td>
                  <td className="py-2 px-3">{employee.emp_status}</td>
                  <td className="py-2 px-3">
                    <button onClick={() => openDialog(employee)} className="text-white bg-green-600 py-1 px-3 text-sm rounded-md">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
  
     {activeTab === 'resign' && (
      <div>
        <h1 className="text-lg font-semibold mb-4">Work Report</h1>
        <ResignedEmployees/>
      </div>
    )}
    {/* Modal Dialog for editing employee details */}
    {showDialog && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm">Status</label>
          <select
            name="empStatus"
            value={formData.empStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
                        <option value="" disabled>Select Status</option> {/* Empty option for the first value */}

            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm">Manager</label>
          <select
            name="empManager"
            value={formData.empManager}
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="" disabled>Select Manager</option> {/* Empty option for the first value */}
            {managerList.map(manager => (
              <option key={manager.id} value={manager.id}>{manager.emp_full_name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm">Team Leader</label>
          <select
            name="empTeamLeader"
            value={formData.empTeamLeader}
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="" disabled>Select Team Leader</option> {/* Empty option for the first value */}
            {teamLeaderList.map(leader => (
              <option key={leader.id} value={leader.id}>{leader.emp_full_name}</option>
            ))}
          </select>
        </div>

            <div className="mb-4">
              <label className="block text-sm">Work Email</label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                required
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Password</label>
              <input
                type="password"
                name="empPassword"
                value={formData.empPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                required
                readOnly
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm">Update</button>
            <button type="button" onClick={() => setShowDialog(false)} className="ml-2 py-2 px-4 bg-gray-200 rounded-md text-sm">Cancel</button>
          </form>
        </div>
      </div>
    )}
  </div>
  
  
  );
};

export default EmployeeTabs;
