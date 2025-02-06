import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiUploadCloud, FiX, FiFileText } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const HRDocuments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  // Function to fetch documents
  const fetchDocuments = async () => {
    if (!user?.emp_id) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/upload/getdocuments/${user.emp_id}`
      );
      setDocuments(response.data.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user?.emp_id]);

  // Validate file (only image types allowed)
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, PNG)");
      return false;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file || !title.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("user_id", user.emp_id);

    try {
      await axios.post("http://localhost:5000/api/upload/uploading", formData);

      setUploadStatus("success");
      setTimeout(() => {
        setIsModalVisible(false);
        setUploadStatus(null);
        setFile(null);
        setTitle("");
        fetchDocuments();
      }, 2000);
    } catch (error) {
      setUploadStatus("error");
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans p-6">
      <h2 className="text-xl font-semibold mb-4">Your Uploaded Documents</h2>

      {/* Uploaded Documents List */}
      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li
              key={doc.doc_id}
              className="border p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <FiFileText className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-lg font-medium">{doc.doc_title}</p>
                  <p className="text-sm text-gray-500">
                    Status: {doc.doc_status}
                  </p>
                </div>
              </div>
              <a
                href={doc.doc_url}
                download
                className="text-blue-600 hover:underline"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Floating Upload Button */}
      <button
        onClick={() => setIsModalVisible(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
      >
        <FiUploadCloud className="w-6 h-6" />
        <span className="text-sm hidden md:inline">Upload Document</span>
      </button>

      {/* Upload Modal */}
      {isModalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) =>
            e.target === e.currentTarget && setIsModalVisible(false)
          }
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Upload New Document
              </h2>
              <button
                onClick={() => setIsModalVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Employee Handbook 2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document File <span className="text-red-500">*</span>
                </label>
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer border-gray-300 hover:border-blue-400"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="space-y-4">
                    <FiUploadCloud className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">
                      Click to upload or{" "}
                      <span className="text-blue-600">browse</span>
                    </p>
                    {file && (
                      <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                        <FiFileText className="text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  multiple={false} // Restricts multiple file uploads
                />
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setIsModalVisible(false)}
                className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-5 py-2.5 text-white bg-blue-600 rounded-lg flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDocuments;
