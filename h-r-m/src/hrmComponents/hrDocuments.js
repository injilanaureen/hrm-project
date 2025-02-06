import React, { useState } from 'react';
import axios from 'axios';

const HRDocuments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [documents, setDocuments] = useState({
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    degree: null,
    highSchoolMarksheet: null,
    intermediateMarksheet: null,
  });

  const handleFileChange = (e, docType) => {
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [docType]: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    if (!employeeId) {
      alert('Please enter Employee ID!');
      return;
    }

    const formData = new FormData();
    formData.append('employeeId', employeeId);
    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        formData.append(key, documents[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/upload/uploading', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Documents uploaded successfully!');
      setIsModalVisible(false);
      setEmployeeId('');
      setDocuments({
        aadharFront: null,
        aadharBack: null,
        panCard: null,
        degree: null,
        highSchoolMarksheet: null,
        intermediateMarksheet: null,
      });
    } catch (error) {
      console.error('Error:', error.response || error);
      alert('Failed to upload documents');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Upload Documents</h2>
      <button
        onClick={() => setIsModalVisible(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Upload Documents
      </button>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Upload Your Documents</h3>

            {/* Employee ID Input */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Employee ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter Employee ID"
              />
            </div>

            {/* Document Uploads */}
            {[
              ['Aadhar Front', 'aadharFront'],
              ['Aadhar Back', 'aadharBack'],
              ['Pan Card', 'panCard'],
              ['Degree', 'degree'],
              ['High School Marksheet', 'highSchoolMarksheet'],
              ['Intermediate Marksheet', 'intermediateMarksheet'],
            ].map(([label, fieldName]) => (
              <div className="mb-4" key={fieldName}>
                <label className="block mb-2 text-sm font-medium">{label}</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, fieldName)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalVisible(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDocuments;
