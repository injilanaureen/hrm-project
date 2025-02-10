import React, { useState } from "react";

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Get the current date
  const currentDate = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YYYY

  return (
    <div className="p-4">
      {/* Date & Tabs Aligned Properly */}
      <div className="flex justify-between items-center mb-2">
        {/* Tab Buttons */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "tab1" ? "bg-indigo-400 text-white" : "bg-gray-200 text-gray-800"
            } rounded-md text-sm`}
            onClick={() => handleTabClick("tab1")}
          >
            Add Attendance
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "tab2" ? "bg-indigo-400 text-white" : "bg-gray-200 text-gray-800"
            } rounded-md text-sm`}
            onClick={() => handleTabClick("tab2")}
          >
            Update Attendance
          </button>
        </div>

        {/* Date Display (Right Aligned) */}
        <div className="text-gray-600 text-sm font-semibold">
          {currentDate}
        </div>
      </div>

      {/* Bottom Border */}
      <hr className="border-gray-300 my-2" />

      {/* Tab Content */}
      {activeTab === "tab1" && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Employee Attendance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
              <thead className="bg-indigo-400 text-white">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Designation</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Row - You can replace this with dynamic data */}
                <tr className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-4 py-2 border text-center">1</td>
                  <td className="px-4 py-2 border text-center">John Doe</td>
                  <td className="px-4 py-2 border text-center">Software Engineer</td>
                  <td className="px-4 py-2 border text-center">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">
                      Present
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Absent
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">2</td>
                  <td className="px-4 py-2 border text-center">Jane Smith</td>
                  <td className="px-4 py-2 border text-center">HR Manager</td>
                  <td className="px-4 py-2 border text-center">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">
                      Present
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Absent
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "tab2" && (
        <div className="mt-4 text-gray-600">
          <h2 className="text-lg font-semibold">Update Attendance Section</h2>
          <p>Content for updating attendance will go here.</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
