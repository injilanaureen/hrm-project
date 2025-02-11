import { useState,useEffect
} from "react";
import axios from "axios";

const EditEmployeeDetails = ({ selectedEmployee, setEmployementStatus }) => {
 const [updatedData, setUpdatedData] = useState({
   newDesignation: "",
   newStatus: "",
   newMobileNumber: "",
   newTeamLeader: "",
   newManager: "",
 });
   const [designations, setDesignations] = useState([]);
   const[allEmployee,setAllEmployees] = useState([]);

  
   const [managerList, setManagerList] = useState([]);
   const [teamLeaderList, setTeamLeaderList] = useState([]);
   const fetchAllEmployees = async () => {
     try {
       const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/api/adduser/getAllEmployees`);
       if (response.data.success) {
         const employeesData = response.data.data;
         setAllEmployees(employeesData.employees)
  
         
         // Separate employees based on their statuses and roles
         const managers = employeesData.filter(emp => emp.emp_designation === 5);
         const teamLeaders = employeesData.filter(emp => emp.emp_designation === 7);
         console.log(managers)
         
         setManagerList(managers);
         setTeamLeaderList(teamLeaders);
       } else {
         console.error('Failed to fetch employees:', response.data.error);
       }
     } catch (error) {
       console.error('Failed to fetch employees:', error);
     }
  
   };
 
 const fetchDesignations = async (dept_id) => {

   try {
     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/api/adduser/fetchDesignation?dept_id=${dept_id}`);
     if (response.data.success) {
       setDesignations(response.data.data);
   
     } else {
       console.error("Failed to fetch designations", response.data.error);
     }
   } catch (error) {
     console.error("Error fetching designations", error);
   }
 };

 const handleEitEmploymeeDetails = async (e) => {
e.preventDefault();
   if (!selectedEmployee) return;

   try {
     const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/api/adduser/editEmployeeDetails`, {
       id: selectedEmployee.emp_id,
       newDesignation: updatedData.newDesignation,
       newStatus: updatedData.newStatus,
       newMobileNumber: updatedData.newMobileNumber,
       newTeamLeader: updatedData.newTeamLeader,
       newManager: updatedData.newManager,
     });

     if (response.status === 200) {
       alert("Employment details updated successfully");
       setEmployementStatus(false);
     } else {
       alert("Failed to update employment details");
     }
   } catch (error) {
     console.error("Error updating employment details:", error);
     alert("An error occurred while updating employment details.");
   }
 };
 useEffect(() => {
   fetchAllEmployees();
   fetchDesignations(selectedEmployee.emp_department);
 }, []);

 return (
   <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
     <div className="bg-white p-8 rounded-md w-3/4 md:w-1/2 lg:w-1/3">
       <h2 className="text-lg mb-4 font-semibold">Edit Employee Details</h2>
       <form onSubmit={handleEitEmploymeeDetails}>
         
         {/* Update Employment Status */}
         <div className="mb-4">
           <label className="block mb-1">Change Employment Status</label>
           <select
             className="w-full p-2 border border-gray-300 rounded"
             value={updatedData.newStatus}
             onChange={(e) => setUpdatedData({ ...updatedData, newStatus: e.target.value })}
           >
             <option value="">Select Status</option>
             <option value="Permanent">Permanent</option>
             <option value="Probation">Probation</option>
             <option value="On Resign">On Resign</option>
           </select>
         </div>

         {/* Update Designation */}
         <div className="mb-4">
           <label className="block mb-1">Update Designation</label>
          <select
           name="newDesignation"
           value={updatedData.newDesignation}
           onChange={(e) => setUpdatedData({ ...updatedData, newDesignation: e.target.value })}
           className="w-full p-2 border border-gray-300 rounded-md text-sm">
          {designations.map((designation) => (
 <option key={designation.designation_id} value={designation.designation_id}>
   {designation.designation_name}
 </option>
))}

          </select>
         </div>

         {/* Update Mobile Number */}
         <div className="mb-4">
           <label className="block mb-1">Update Mobile Number</label>
           <input
             type="text"
             className="w-full p-2 border border-gray-300 rounded"
             value={updatedData.newMobileNumber}
             onChange={(e) => setUpdatedData({ ...updatedData, newMobileNumber: e.target.value })}
           />
         </div>

         {/* Update Team Leader */}
         <div className="mb-4">
 <label className="block text-sm">Change Manager</label>
 <select
   name="empManager"
   value={updatedData.newManager}

   className="w-full p-2 border border-gray-300 rounded-md text-sm"
 >
   <option value="" disabled>Select Manager</option> {/* Empty option for the first value */}
   {managerList
     .filter(manager => manager.emp_id !== selectedEmployee.emp_id) // Exclude the current user
     .map(manager => (
       <option key={manager.emp_id} value={manager.emp_id}>{manager.emp_full_name || 'No Manager Availble'}</option>
     ))}
 </select>
</div>

<div className="mb-4">
 <label className="block text-sm">ChangeTeam Leader</label>
 <select
   name="empTeamLeader"
   value={updatedData.newTeamLeader}

   className="w-full p-2 border border-gray-300 rounded-md text-sm"
 >
   <option value="" disabled>Select Team Leader</option> {/* Empty option for the first value */}
   {teamLeaderList
     .filter(leader => leader.emp_id !== selectedEmployee.emp_id) // Exclude the current user
     .map(leader => (
       <option key={leader.emp_id} value={leader.emp_id}>{leader.emp_full_name || 'No Team Leader Available'}</option>
     ))}
 </select>
id</div>


         <div className="flex justify-end gap-2">
           <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setEmployementStatus(false)}>
             Cancel
           </button>
           <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded">
             Save
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};

export default EditEmployeeDetails;
