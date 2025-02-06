import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // If using React Icons for better performance
import { useParams } from "react-router-dom";

function EditPersonalDetails() {
  const { empId } = useParams(); // Assuming id is the employee ID.

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employee, setEmployee] = useState({
    emp_id: "EMP001",
    emp_personal_email: "janedoe@example.com",
    emp_department: "HR",
    emp_gender: "Female",
    company: "XYZ Ltd.",
    team_leader_name: "John Smith",
    manager_name: "Emma Williams",
    permission: "Read-Only",
    emergency_person_name: "Jane Doe",
    emergency_relationship: "Mother",
    Address: "123, Main Street, Noida",
    emergency_mob_no: "+91-9876543210",
  });

  // Separate state to track modal input
  const [modalEmployee, setModalEmployee] = useState(employee);

  const handleEditClick = () => {
    setIsModalOpen(true);
    setModalEmployee(employee); // Load current data into the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    setEmployee(modalEmployee); // Save changes from modal to main state
    setIsModalOpen(false);
  };

  return (
    <div>
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
            <p className="text-sm">{employee.emp_department}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Gender</p>
            <p className="text-sm">{employee.emp_gender}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Company</p>
            <p className="text-sm">{employee.company}</p>
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
            <p className="text-sm">{employee.permission}</p>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Emergency Contact Section */}
        <div>
          <div className="flex gap-2 mb-3">
            <h3 className="text-sm font-medium">Emergency Contact</h3>
            <FaEdit
              className="text-blue-500 cursor-pointer"
        
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Emergency Contact Name</p>
              <p className="text-sm">
                {employee.emergency_person_name || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Relationship</p>
              <p className="text-sm">
                {employee.emergency_relationship || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Address</p>
              <p className="text-sm">{employee.Address || "NA"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Mobile No</p>
              <p className="text-sm">{employee.emergency_mob_no || "NA"}</p>
            </div>
          </div>
        </div>

        {/* Modal for Editing */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow p-6 w-96">
              <h3 className="text-xl font-medium mb-4">
                Edit Emergency Contact
              </h3>

              <div className="mb-4">
                <label className="text-gray-500 text-xs">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  value={modalEmployee.emergency_person_name}
                  onChange={(e) =>
                    setModalEmployee({
                      ...modalEmployee,
                      emergency_person_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="text-gray-500 text-xs">Relationship</label>
                <input
                  type="text"
                  value={modalEmployee.emergency_relationship}
                  onChange={(e) =>
                    setModalEmployee({
                      ...modalEmployee,
                      emergency_relationship: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="text-gray-500 text-xs">
                  Emergency Address
                </label>
                <input
                  type="text"
                  value={modalEmployee.Address}
                  onChange={(e) =>
                    setModalEmployee({
                      ...modalEmployee,
                      Address: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="text-gray-500 text-xs">
                  Emergency Mobile No
                </label>
                <input
                  type="text"
                  value={modalEmployee.emergency_mob_no}
                  onChange={(e) =>
                    setModalEmployee({
                      ...modalEmployee,
                      emergency_mob_no: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={handleSaveChanges}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Contact Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Contact</h3>
          <div>
            <p className="text-gray-500 text-xs">Emergency Mobile No</p>
            <p className="text-sm">{employee.emergency_mob_no}</p>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />
      </div>
    </div>
  );
}

export default EditPersonalDetails;
