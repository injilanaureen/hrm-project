import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
function EmployeePersonalDetails() {
  const { empId } = useParams();
  const [loading, setLoading] = useState(false); // To manage loading state
 
  const [isLoading, setIsLoading] = useState(false);
  const [modalEmployee, setModalEmployee] = useState({});
  const [employee, setEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [employeeEducation, setEmployeeEducation] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const [selectedDocument, setSelectedDocument] = useState(null); // To hold the clicked document URL
 
  const handleViewClick = (docUrl) => {
    // Open the modal to view the clicked document
    setSelectedDocument(docUrl);
    setIsModalVisible(true);
  };
 
  useEffect(() => {
    if (empId) {
      // Fetch documents from backend when employee ID is entered
      axios
        .get(`http://localhost:5000/api/upload/getdocuments/${empId}`)
        .then((response) => {
          setDocuments(response.data.documents);
        })
        .catch((error) => {
          console.error("Error fetching documents:", error);
        });
    }
  }, [empId]);
 
  const handleEditClick = () => {
    setIsModalOpen(true);
    setModalEmployee(employee); // Load current data into the modal
  };
 
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/adduser/updateEmergencyContact/${employee.emp_id}`,
        {
          emergency_person_name: modalEmployee.personal_information[0].emergency_person_name,
          emergency_relationship: modalEmployee.personal_information[0].emergency_relationship,
          emergency_address: modalEmployee.personal_information[0].emergency_address,
          emergency_mob_no: modalEmployee.personal_information[0].emergency_mob_no,
        }
      );
 
      console.log("API Response:", response); // Log the response from the API
 
      if (response.data.success) {
        // Update modalEmployee with the new data
        setEmployee((prevState) => ({
          ...prevState,
          personal_information: [
            {
              ...prevState.personal_information[0],
              emergency_person_name: modalEmployee.personal_information[0].emergency_person_name,
              emergency_relationship: modalEmployee.personal_information[0].emergency_relationship,
              emergency_address: modalEmployee.personal_information[0].emergency_address,
              emergency_mob_no: modalEmployee.personal_information[0].emergency_mob_no,
            },
          ],
        }));
 
        alert("Emergency contact updated successfully!");
        setIsModalOpen(false); // Close the modal after saving
      } else {
        console.error("Failed to update emergency contact:", response.data.error);
        alert("Failed to update emergency contact. Please try again.");
      }
    } catch (error) {
      console.error("Error updating emergency contact:", error.response ? error.response.data : error);
      alert("An error occurred while updating emergency contact. Please try again.");
    }
 
    setIsModalOpen(false); // Close modal after any error as well
};
 
 
 
  const getEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/adduser/getSingleEmployee/${empId}`
      );
      console.log(response.data);
      if (response.data.success) {
        setEmployee(response.data.data);
      } else {
        console.error("Failed to fetch employee:", response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    }
  };
 
  const getEmployeeEducation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/adduser/getSingleEmployeeeducation/${empId}`
      );
      console.log(response.data); // Check what the backend returns
      if (response.data.success && Array.isArray(response.data.data)) {
        setEmployeeEducation(response.data.data); // Use response.data.data
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch employee education:", error);
    }
  };
  useEffect(() => {
    getEmployee();
    getEmployeeEducation();
  }, [empId]);
 
  // Check if employee data is null or undefined before rendering
  if (!employee) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }
 
  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Personal Details</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium mb-3">Biographical</h3>
        {/* Biographical Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-xs">Full Name</p>
            <p className="text-sm">{employee.emp_full_name || "User"}</p>
          </div>
 
          <div>
            <p className="text-gray-500 text-xs">Gender</p>
            <p className="text-sm">{employee.emp_gender || "Not Given"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date Of Birth</p>
            <p className="text-sm">
              {new Date(employee.emp_dob).toLocaleDateString() || "Not Given "}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Marital Status</p>
            <p className="text-sm">{employee.marital_status || ""}</p>
          </div>
        </div>
 
        {/* Separator */}
        <hr className="my-6 border-gray-200" />
 
        <div>
          <h3 className="text-sm font-medium mb-3">Address</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Permanent Postal Address</p>
              <p className="text-sm">
              {employee.personal_information?.length > 0
  ? `${employee.personal_information[0].permanent_address || ''}
      ${employee.personal_information[0].permanent_city || ''}
      ${employee.personal_information[0].permanent_state || ''}
      ${employee.personal_information[0].permanent_zip_code || ''}`
  : "No Address Available"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Present Postal Address</p>
              <p className="text-sm">
                {`${employee.personal_information[0].current_address}
                 ${employee.personal_information[0].current_city}
                 ${employee.personal_information[0].current_state}
                  ${employee.personal_information[0].current_zip_code} ` ||
                  "Not provided"}
              </p>
            </div>
          </div>
        </div>
 
        {/* Separator */}
        <hr className="my-6 border-gray-200" />
 
        {/* Contact Section */}
        <div>
          <div className="flex gap-2 mb-3">
            <h3 className="text-sm font-medium">Emergency Contact</h3>
            <FaEdit
              className="text-blue-500 cursor-pointer"
              onClick={handleEditClick}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Blood Group</p>
              <p className="text-sm">
                {employee.personal_information[0].blood_group || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Contact Name</p>
              <p className="text-sm">
                {employee?.personal_information[0].emergency_person_name || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Relationship</p>
              <p className="text-sm">
                {employee?.personal_information[0].emergency_relationship || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Address</p>
              <p className="text-sm">{employee?.personal_information[0].emergency_address || "NA"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Mobile No</p>
              <p className="text-sm">{employee?.personal_information[0].emergency_mob_no || "NA"}</p>
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
          value={modalEmployee?.personal_information?.[0]?.emergency_person_name || ""}
          onChange={(e) => {
            const updatedPersonalInfo = [...modalEmployee.personal_information];
            updatedPersonalInfo[0].emergency_person_name = e.target.value;
            setModalEmployee({
              ...modalEmployee,
              personal_information: updatedPersonalInfo,
            });
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-500 text-xs">Relationship</label>
        <input
          type="text"
          value={modalEmployee?.personal_information?.[0]?.emergency_relationship || ""}
          onChange={(e) => {
            const updatedPersonalInfo = [...modalEmployee.personal_information];
            updatedPersonalInfo[0].emergency_relationship = e.target.value;
            setModalEmployee({
              ...modalEmployee,
              personal_information: updatedPersonalInfo,
            });
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-500 text-xs">
          Emergency Address
        </label>
        <input
          type="text"
          value={modalEmployee?.personal_information?.[0]?.emergency_address || ""}
          onChange={(e) => {
            const updatedPersonalInfo = [...modalEmployee.personal_information];
            updatedPersonalInfo[0].emergency_address = e.target.value;
            setModalEmployee({
              ...modalEmployee,
              personal_information: updatedPersonalInfo,
            });
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-500 text-xs">
          Emergency Mobile No
        </label>
        <input
          type="text"
          value={modalEmployee?.personal_information?.[0]?.emergency_mob_no || ""}
          onChange={(e) => {
            const updatedPersonalInfo = [...modalEmployee.personal_information];
            updatedPersonalInfo[0].emergency_mob_no = e.target.value;
            setModalEmployee({
              ...modalEmployee,
              personal_information: updatedPersonalInfo,
            });
          }}
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
 
 
        </div>
 
        {/* Separator */}
        <hr className="my-6 border-gray-200" />
 
        {/* Personal Identity
Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Personal Identity</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Addhaar</p>
              <p className="text-sm">
                {employee.emp_addhar_no || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Pan</p>
              <p className="text-sm">
                {employee.emp_pan_card_no || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Driving Licence</p>
              <p className="text-sm">
                {employee.driving_Licence || "Not Provided"}
              </p>
            </div>
          </div>
        </div>
 
        {/* Separator */}
        <hr className="my-6 border-gray-200" />
 
        {/* employeeEducation
Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Education</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {employeeEducation && employeeEducation.length > 0 ? (
              employeeEducation.map((edu, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-xs">{edu.degree}</p>
                  <p className="text-sm">{edu.institution || "Not Provided"}</p>
                  <p className="text-sm">
                    {edu.year_of_passing || "Not Provided"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm">No Education Details Provided</p>
            )}
          </div>
        </div>
 
        {/* Separator */}
        <hr className="my-6 border-gray-200" />
 
        <div>
          <h3 className="text-sm font-medium mb-3">Bank Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Account Holder Name</p>
              <p className="text-sm">
                {employee.account_holder_name || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Bank Name</p>
              <p className="text-sm">{employee.bank_name || "Not Provided"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Branch Name </p>
              <p className="text-sm">
                {employee.branch_name || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Account No</p>
              <p className="text-sm">{employee.account_no || "Not Provided"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">IFSC Code</p>
              <p className="text-sm">{employee.IFSC_code || "Not Provided"}</p>
            </div>
          </div>
        </div>
 
        {/* Personal Documents Section */}
        {/* <div>
          <h3 className="text-sm font-medium mb-3">Personal Documents</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-gray-500 text-xs">Addhaar Back</p>
            <img className="size-10" alt="adhar" src="/attendance.png"></img>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Addhar Front</p>
            <img className="size-10" alt="adhar" src="/attendance.png"></img>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Pan Card</p>
            <img className="size-10" alt="adhar" src="/attendance.png"></img>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Degree</p>
            <img className="size-10" alt="adhar" src="/attendance.png"></img>
          </div>
          <div>
            <p className="text-gray-500 text-xs">High School MarkSheet</p>
            <img className="size-10" alt="adhar" src="/attendance.png"></img>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Intermediate MarkSheet</p>
            <img className="size-10" alt="adhar" src="/attendance.png"></img>
          </div>
        </div>
        </div> */}
 
        <hr className="my-6 border-gray-200" />
        <h3 className="text-sm font-medium mb-3 mt-4">Personal Documents</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div key={doc.doc_id}>
                <p className="text-gray-500 text-xs">{doc.doc_title}</p>
                <button
                  onClick={() => handleViewClick(doc.doc_url)} // Open the document on click
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p>No documents available for this Employee ID.</p>
          )}
        </div>
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">View Document</h3>
              <img
                src={selectedDocument}
                alt="Selected Document"
                className="w-full h-auto"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalVisible(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default EmployeePersonalDetails;
 