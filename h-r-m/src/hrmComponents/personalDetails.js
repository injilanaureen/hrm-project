import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function Personaldetails() {
  const { id } = useParams();
  console.log(id);
  const [employee, setEmployee] = useState(null);
  const [employeeEducation, setEmployeeEducation] = useState([]);
  const [modalEmployee, setModalEmployee] = useState({});
  // const [employee, setEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [pisModalOpen, psetIsModalOpen] = useState(false);
  const [pmodalEmployee, psetModalEmployee] = useState({});
  const [masterisModalOpen, mastersetIsModalOpen] = useState(false);
const [mastermodalEmployee, mastersetModalEmployee] = useState({});
const [documents, setDocuments] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);

const [selectedDocument, setSelectedDocument] = useState(null); // To hold the clicked document URL

const handleViewClick = (docUrl) => {
// Open the modal to view the clicked document
setSelectedDocument(docUrl);
setIsModalVisible(true);
};

useEffect(() => {
  if (id) {
    // Fetch documents from backend when employee ID is entered
    axios
      .get(`http://localhost:5000/api/upload/getdocuments/${id}`)
      .then((response) => {
        setDocuments(response.data.documents);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      });
  }
}, [id]);


const handleMasterEditClick = () => {
  mastersetIsModalOpen(true);
  mastersetModalEmployee(employee); // Load current data into the modal
};

const handleMasterCloseModal = () => {
  mastersetIsModalOpen(false);
};

const handleSaveNameMaritalStatus = async () => {
  console.log("Saving Name & Marital Status:", mastermodalEmployee);

  try {
    const response = await axios.put(
      `http://localhost:5000/api/adduser/updateNamemarital_status/${employee.emp_id}`,
      {
        emp_name: mastermodalEmployee.emp_full_name, // Ensure backend expects `emp_name`
        marital_status: mastermodalEmployee.marital_status,
      }
    );

    console.log("API Response:", response.data);

    if (response.data.success) {
      console.log("Name and marital status updated successfully.");
      setEmployee((prev) => ({
        ...prev,
        emp_full_name: mastermodalEmployee.emp_full_name,
        marital_status: mastermodalEmployee.marital_status,
      }));
    } else {
      console.error("Failed to save data:", response.data.error);
    }
  } catch (error) {
    console.error("Error saving data:", error);
  } finally {
    mastersetIsModalOpen(false); // Close modal after attempt (success or fail)
  }
};

  const handleEditClick = () => {
    setIsModalOpen(true);
    setModalEmployee(employee); // Load current data into the modal
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  //Personaldetails
  const handlePeditClick = () => {
    console.log("personald");
    
    psetIsModalOpen(true);
    psetModalEmployee(employee); // Load current data into the modal
  };
  const handlePcloseModal = () => {
    psetIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `https://hrm-backend-ss54.onrender.com/api/adduser/updateEmergencyContact/${employee.emp_id}`,
        {
          emergency_person_name: modalEmployee.emergency_person_name,
          emergency_relationship: modalEmployee.emergency_relationship,
          emergency_address: modalEmployee.emergency_address,
          emergency_mob_no: modalEmployee.emergency_mob_no,
        }
      );

      if (response.data.success) {
        setEmployee({
          ...employee,
          emergency_person_name: modalEmployee.emergency_person_name,
          emergency_relationship: modalEmployee.emergency_relationship,
          emergency_address: modalEmployee.emergency_address,
          emergency_mob_no: modalEmployee.emergency_mob_no,
        });
        setIsModalOpen(false); // Close the modal after saving
      } else {
        console.error(
          "Failed to update emergency contact:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error updating emergency contact:", error);
    }
    setIsModalOpen(false);
  };


  const handleSaveInfo = async () => {
    console.log("Saving changes...");
    try {
      // API call to save the updated employee data
      const response = await axios.put(
        `http://localhost:5000/api/adduser/updatePersonalIdentity/${employee.emp_id}`, // Adjust the API endpoint
        {
          emp_addhar_no: pmodalEmployee.emp_addhar_no,
          emp_pan_card_no: pmodalEmployee.emp_pan_card_no,
        }
      );
  
      console.log("API response:", response.data); // Log the response from API
      if (response.data.success) {
        console.log("Data saved successfully");
  
        // Update the employee state with the new data
        setEmployee({
          ...employee,
          emp_addhar_no: pmodalEmployee.emp_addhar_no,  // Update the Aadhaar number
          emp_pan_card_no: pmodalEmployee.emp_pan_card_no, // Update the PAN card number
        });
  
        psetIsModalOpen(false); // Close modal on success
      } else {
        console.error("Failed to save data:", response.data.error);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  const getEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/adduser/getSingleEmployee/${id}`
      );
 console.log(response.data.data)
      if (response.data.success) {
        setEmployee(response.data.data);
      } else {
        console.error("Failed to fetch employee:", response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    }
  };
  // const getEmployeeEducation = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/adduser/getSingleEmployeeeducation/${id}`
  //     );
  
  //     console.log("API Response:", response.data); // Debugging
  
  //     if (response.data.success && response.data.data) {
  //       const educationData = response.data.data.educational_background || []; // ✅ Extract education array
  //       console.log(educationData);
  //       setEmployeeEducation(educationData); // ✅ Set extracted education data
  //       console.log("Updated Employee Education:", educationData);
  //     } else {
  //       console.error("Unexpected response format:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch employee education:", error);
  //   }
  // };
  

  useEffect(() => {
    getEmployee();
  }, [id]);

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
      <div className="flex gap-2 mb-3">
            <h3 className="text-sm font-medium">Biographical </h3>
            <FaEdit
              className="text-blue-500 cursor-pointer"
              onClick={handleMasterEditClick}
            />
          </div>
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
            <p className="text-sm">{new Date(employee.emp_dob).toLocaleDateString() || "Not Given "}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Marital Status</p>
            <p className="text-sm">{employee.personal_information?.[0]?.marital_status || ""}</p>
          </div>
          {masterisModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow p-6 w-96">
      <h3 className="text-xl font-medium mb-4">Edit Biographical</h3>
      <div className="mb-4">
        <label className="text-gray-500 text-xs">Full Name</label>
        <input
          type="text"
          value={mastermodalEmployee?.emp_full_name || ""}
          onChange={(e) =>
            mastersetModalEmployee({
              ...mastermodalEmployee,
              emp_full_name: e.target.value,
            })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      {/* Add Marital Status Field */}
      <div className="mb-4">
        <label className="text-gray-500 text-xs">Marital Status</label>
        <select
          value={mastermodalEmployee?.marital_status || ""}
          onChange={(e) =>
            mastersetModalEmployee({
              ...mastermodalEmployee,
              marital_status: e.target.value,
            })
          }
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          
        </select>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          onClick={handleMasterCloseModal}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSaveNameMaritalStatus}
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

        <div>
          <h3 className="text-sm font-medium mb-3">Address</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Permanent Postal Address</p>
              <p className="text-sm">
                {`${employee.personal_information?.[0]?.permanent_address} ${employee.personal_information?.[0]?.permanent_city} ${employee.personal_information?.[0]?.permanent_state} ${employee.personal_information?.[0]?.permanent_zip_code} ` ||
                  "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Present Postal Address</p>
              <p className="text-sm">
                {`${employee.personal_information?.[0]?.current_address} ${employee.personal_information?.[0]?.current_city} ${employee.personal_information?.[0]?.current_state} ${employee.personal_information?.[0]?.personal_information?.[0]?.current_zip_code} ` ||
                  "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Emergency Section */}
        <div>
          <div className="flex gap-2 mb-3">
            <h3 className="text-sm font-medium">Emergency </h3>
            <FaEdit
              className="text-blue-500 cursor-pointer"
              onClick={handleEditClick}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Blood Group</p>
              <p className="text-sm">
                {employee.personal_information?.[0]?.blood_group || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Contact Name</p>
              <p className="text-sm">
                {employee.personal_information?.[0]?.emergency_person_name || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Relationship</p>
              <p className="text-sm">
                {employee.personal_information?.[0]?.emergency_relationship || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Address</p>
              <p className="text-sm">{employee.personal_information?.[0]?.emergency_address || "NA"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Mobile No</p>
              <p className="text-sm">{employee.personal_information?.[0]?.emergency_mob_no || "NA"}</p>
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
                    value={modalEmployee?.emergency_person_name || ""}
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
                    value={modalEmployee?.emergency_relationship || ""}
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
                    value={modalEmployee?.emergency_address || ""}
                    onChange={(e) =>
                      setModalEmployee({
                        ...modalEmployee,
                        emergency_address: e.target.value,
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
                    value={modalEmployee?.emergency_mob_no || ""}
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
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Personal Identity
Section */}
<div>
      {/* Personal Identity Section */}
      <div className="flex gap-2 mb-3">
        <h3 className="text-sm font-medium">Personal Identity</h3>
        <FaEdit
          className="text-blue-500 cursor-pointer"
          onClick={handlePeditClick} // Open modal when clicked
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <p className="text-gray-500 text-xs">Addhaar</p>
          <p className="text-sm">{employee.emp_addhar_no || "Not Provided"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Pan</p>
          <p className="text-sm">{employee.emp_pan_card_no || "Not Provided"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Driving Licence</p>
          <p className="text-sm">{employee.driving_Licence || "Not Provided"}</p>
        </div>
      </div>

      {/* Modal for Editing Personal Identity */}
      {pisModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow p-6 w-96">
                <h3 className="text-xl font-medium mb-4">
                  Edit Personal Identity
                </h3>
                <div className="mb-4">
                  <label className="text-gray-500 text-xs">
                  Addhaar
                  </label>
                  <input
                    type="text"
                    value={pmodalEmployee?.emp_addhar_no || ""}
                    onChange={(e) =>
                      psetModalEmployee({
                        ...pmodalEmployee,
                        emp_addhar_no: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-500 text-xs">
                  Pan Card
                  </label>
                  <input
                    type="text"
                    value={pmodalEmployee?.emp_pan_card_no || ""}
                    onChange={(e) =>
                      psetModalEmployee({
                        ...pmodalEmployee,
                        emp_pan_card_no: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="text-gray-500 text-xs">
                  Driving Licence
                  </label>
                  <input
                    type="text"
                    value={pmodalEmployee?.driving_Licence || ""}
                    onChange={(e) =>
                      psetModalEmployee({
                        ...pmodalEmployee,
                        driving_Licence: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div> */}
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    onClick={handlePcloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleSaveInfo}
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

        {/* Education Section */}
        <div>
  <h3 className="text-sm font-medium mb-3">Education</h3>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {employee.educational_background?.length > 0 ? (
      employee.educational_background?.map((edu, index) => (
        <div key={edu._id || index} className="p-2 border rounded-lg shadow-sm">
          <p className="text-gray-500 text-xs font-semibold">{edu.degree || "Not Provided"}</p>
          <p className="text-sm text-gray-700">{edu.institution || "Not Provided"}</p>
          <p className="text-sm text-gray-500">{edu.year_of_passing || "Not Provided"}</p>
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-600">No Education Details Provided</p>
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
                {employee.bank_details?.[0]?.account_holder_name	 || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Bank Name</p>
              <p className="text-sm">
                {employee.bank_details?.[0]?.bank_name || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Branch Name </p>
              <p className="text-sm">
                {employee.bank_details?.[0]?.branch_name || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Account No</p>
              <p className="text-sm">
                {employee.bank_details?.[0]?.account_no || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">IFSC Code</p>
              <p className="text-sm">
                {employee.bank_details?.[0]?.IFSC_code	 || "Not Provided"}
              </p>
            </div>
          </div>
        </div>




        <hr className="my-6 border-gray-200" />


        {/* Personal Documents Section */}
        <div>
          {/* <h3 className="text-sm font-medium mb-3">Personal Documents</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
          </div> */}

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
            <img src={selectedDocument} alt="Selected Document" className="w-full h-auto" />
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
    </div>
  );
}

export default Personaldetails;
