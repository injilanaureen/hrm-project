import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft }   from 'lucide-react';
import Tab1Component from "./tab1";
import ShortLeaveForm from "./shortLeave";
// Modal Component

const LeaveManagement = () => {
   const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tab) => setActiveTab(tab);


  return (
    <div className="p-4 h-full flex flex-col">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-4">
        <button
          className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === "tab1"
              ? "bg-indigo-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleTabClick("tab1")}
        >
        Apply Leave
        </button>
        <button
          className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === "tab2"
              ? "bg-indigo-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleTabClick("tab2")}
        >
         Apply Short Leave
        </button>
      </div>
      
    </div>
    {activeTab === "tab1" &&  <Tab1Component /> }
    {activeTab === "tab2" &&  <ShortLeaveForm /> }
    </div>
  );
};

export default LeaveManagement;
