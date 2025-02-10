import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function Personaldetails() {
  const { id } = useParams();
  console.log(id);
  const [employee, setEmployee] = useState(null);
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
        .get(`${process.env.REACT_APP_API_URL}/api/upload/getdocuments/${id}`)
        .then((response) => {
          setDocuments(response.data.documents);
        })
        .catch((error) => {
          console.error("Error fetching documents:", error);
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
        `${process.env.REACT_APP_API_URL}/api/adduser/updateNamemarital_status/${employee?.user?.emp_id}`,
        {
          emp_name: mastermodalEmployee?.user?.emp_full_name, // Fix here
          marital_status: mastermodalEmployee?.personalData?.marital_status, // Fix here
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        console.log("Name and marital status updated successfully.");
        setEmployee((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            emp_full_name: mastermodalEmployee?.user?.emp_full_name, // Fix here
          },
          personalData: {
            ...prev.personalData,
            marital_status: mastermodalEmployee?.personalData?.marital_status, // Fix here
          },
        }));
      } else {
        console.error("Failed to save data:", response.data.error);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      mastersetIsModalOpen(false); // Close modal
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
    // Validate emergency mobile number (exactly 10 digits)
    const emergencyMobNo = modalEmployee.personalData.emergency_mob_no;
    const isValidMobile = /^\d{10}$/.test(emergencyMobNo); // Only allows exactly 10 digits

    if (!isValidMobile) {
      console.error("Invalid emergency mobile number:", emergencyMobNo);
      alert("Please enter a valid 10-digit emergency mobile number.");
      return;
    }

    try {
      const response = await axios.put(
       `${process.env.REACT_APP_API_URL}/api/adduser/updateEmergencyContact/${employee.user?.emp_id}`,
        {
          emergency_person_name:
            modalEmployee.personalData.emergency_person_name,
          emergency_relationship:
            modalEmployee.personalData.emergency_relationship,
          emergency_address: modalEmployee.personalData.emergency_address,
          emergency_mob_no: emergencyMobNo, // Validated number
        }
      );

      if (response.data.success) {
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          personalData: {
            ...prevEmployee.personalData,
            emergency_person_name:
              modalEmployee.personalData.emergency_person_name,
            emergency_relationship:
              modalEmployee.personalData.emergency_relationship,
            emergency_address: modalEmployee.personalData.emergency_address,
            emergency_mob_no: emergencyMobNo,
          },
        }));

        setIsModalOpen(false);
      } else {
        console.error(
          "Failed to update emergency contact:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error updating emergency contact:", error);
    }
  };

  const handleSaveInfo = async () => {
    console.log("Saving changes...");
    
    try {
//Ensure pmodalEmployee and employee have necessary data
      if (!pmodalEmployee?.user?.emp_addhar_no || !pmodalEmployee?.user?.emp_pan_card_no) {
        console.error("Missing required fields.");
        return;
     }

       // Validate Aadhaar (12-digit number only)
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(pmodalEmployee?.user?.emp_addhar_no)) {
      console.error("Invalid Aadhaar number. It must be exactly 12 digits.");
      return;
    }

    // Validate PAN Card (Format: ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pmodalEmployee?.user?.emp_pan_card_no)) {
      console.error("Invalid PAN number. Format must be ABCDE1234F.");
      return;
    }
  
      // API call to update employee data
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/adduser/updatePersonalIdentity/${employee.user.emp_id}`, 
        {
          emp_addhar_no: pmodalEmployee.user.emp_addhar_no,
          emp_pan_card_no: pmodalEmployee.user.emp_pan_card_no,
        }
      );
  
      console.log("API response:", response.data);
  
      if (response.data.success) {
        console.log("Data saved successfully");
  
        // Update the employee state with new values
        setEmployee((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            emp_addhar_no: pmodalEmployee.user.emp_addhar_no,
            emp_pan_card_no: pmodalEmployee.user.emp_pan_card_no,
          },
        }));
  
        psetIsModalOpen(false); // Close modal on success
      } else {
        console.error("Failed to save data:", response.data.error);
      }
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error.message);
    }
  };
  

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

  if (!employee) return <div>Loading...</div>;
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
            <p className="text-sm">{employee?.user?.emp_full_name || "User"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Gender</p>

          

            <p className="text-sm">{employee?.user?.emp_gender || "Not Given"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date Of Birth</p>
            <p className="text-sm">{new Date(employee?.user?.emp_dob).toLocaleDateString() || "Not Given "}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Marital Status</p>
            <p className="text-sm">{employee?.personalData?.marital_status|| 'No provided'}</p>

          </div>
          {masterisModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow p-6 w-96">
                <h3 className="text-xl font-medium mb-4">Edit Biographical</h3>
                <div className="mb-4">
                  <label className="text-gray-500 text-xs">Full Name</label>
                  <input
                    type="text"
                    value={mastermodalEmployee?.user?.emp_full_name || ""}
                    onChange={(e) =>
                      mastersetModalEmployee((prev) => ({
                        ...prev,
                        user: {
                          ...prev.user, // Preserve existing user data
                          emp_full_name: e.target.value, // Update emp_full_name inside user
                        },
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Add Marital Status Field */}
                <div className="mb-4">
                  <label className="text-gray-500 text-xs">
                    Marital Status
                  </label>
                  <select
                    value={
                      mastermodalEmployee?.personalData?.marital_status || ""
                    }
                    onChange={(e) =>
                      mastersetModalEmployee({
                        ...mastermodalEmployee,
                        personalData: {
                          ...mastermodalEmployee.personalData, // Preserve existing personalData
                          marital_status: e.target.value, // Update marital_status inside personalData
                        },
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
                {`${employee?.personalData?.permanent_address} ${employee?.personalData?.permanent_city} ${employee?.personalData?.permanent_state} ${employee?.personalData?.permanent_zip_code} ` ||
                  "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Present Postal Address</p>
              <p className="text-sm">
                {`${employee?.personalData?.current_address} ${employee?.personalData?.current_city} ${employee?.personalData?.current_state} ${employee?.personalData?.current_zip_code} ` ||
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

              

                {employee?.personalData?.blood_group || "Not Provided"}

              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Contact Name</p>
              <p className="text-sm">
                {employee?.personalData?.emergency_person_name || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Relationship</p>
              <p className="text-sm">
                {employee?.personalData?.emergency_relationship || "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Address</p>

            

              <p className="text-sm">{employee?.personalData?.emergency_address || "NA"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Emergency Mobile No</p>
              <p className="text-sm">{employee?.personalData?.emergency_mob_no || "NA"}</p>

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
                    value={
                      modalEmployee?.personalData?.emergency_person_name || ""
                    }
                    onChange={(e) =>
                      setModalEmployee({
                        ...modalEmployee,
                        personalData: {
                          ...modalEmployee.personalData, // Preserve existing personalData
                          emergency_person_name: e.target.value,
                        },
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-500 text-xs">Relationship</label>
                  <input
                    type="text"
                    value={
                      modalEmployee?.personalData?.emergency_relationship || ""
                    }
                    onChange={(e) =>
                      setModalEmployee({
                        ...modalEmployee,
                        personalData: {
                          ...modalEmployee.personalData, // Preserve existing personalData
                          emergency_relationship: e.target.value,
                        },
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
                    value={modalEmployee?.personalData?.emergency_address || ""}
                    onChange={(e) =>
                      setModalEmployee({
                        ...modalEmployee,
                        personalData: {
                          ...modalEmployee.personalData, // Preserve existing personalData
                          emergency_address: e.target.value,
                        },
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
                    value={modalEmployee?.personalData?.emergency_mob_no || ""}
                    onChange={(e) =>
                      setModalEmployee({
                        ...modalEmployee,
                        personalData: {
                          ...modalEmployee.personalData, // Preserve existing personalData
                          emergency_mob_no: e.target.value,
                        },
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
          <p className="text-sm">{employee?.user?.emp_addhar_no || "Not Provided"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Pan</p>
          <p className="text-sm">{employee?.user?.emp_pan_card_no || "Not Provided"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Driving Licence</p>
          <p className="text-sm">{employee?.user?.driving_Licence || "Not Provided"}</p>
        </div>
      </div>


          {/* Modal for Editing Personal Identity */}
          {pisModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow p-6 w-96">
                <h3 className="text-xl font-medium mb-4">
                  Edit Personal Identity
                </h3>
                <input
                  type="text"
                  value={pmodalEmployee?.user?.emp_addhar_no || ""}
                  onChange={(e) =>
                    psetModalEmployee({
                      ...pmodalEmployee,
                      user: {
                        ...pmodalEmployee.user, // Preserve existing user data
                        emp_addhar_no: e.target.value, // Update emp_addhar_no inside user
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="mb-4">
                  <label className="text-gray-500 text-xs">Pan Card</label>
                  <input
                    type="text"
                    value={pmodalEmployee?.user?.emp_pan_card_no || ""}
                    onChange={(e) =>
                      psetModalEmployee({
                        ...pmodalEmployee,
                        user: {
                          ...pmodalEmployee.user, // Preserve existing user data
                          emp_pan_card_no: e.target.value, // Update emp_pan_card_no inside user
                        },
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

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
  {employee.education.education && employee.education.education.length > 0 ? (
    employee.education.education.map((edu, index) => (
      <div key={edu._id || index} className="p-2 border rounded-lg shadow-sm">
        <p className="text-gray-600 text-xs font-semibold">{edu.degree || "Not Provided"}</p>
        <p className="text-sm text-gray-800">{edu.institution || "Not Provided"}</p>
        <p className="text-sm text-gray-700">{edu.year_of_passing || "Not Provided"}</p>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-600 col-span-2 md:col-span-5 text-center">
      No Education Details Provided
    </p>
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

               

                {employee.banking?.account_holder_name	 || "Not Provided"}

              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Bank Name</p>
              <p className="text-sm">
                {employee.banking?.bank_name || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Branch Name </p>
              <p className="text-sm">
                {employee.banking?.branch_name || "Not Provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Account No</p>
              <p className="text-sm">


                {employee.banking?.account_number|| "Not Provided"}

              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">IFSC Code</p>
              <p className="text-sm">

                {employee.banking?.ifsc_code || "Not Provided"}

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
    </div>
  );
}

export default Personaldetails;
