import React from "react";
import { Link } from "react-router-dom";

const DashboardGrid = () => {
  const modules = [
    { label: "Task Box", image: "/task.png", path: "taskbox" },
    { label: "Profile", image: "/employees.png", path: "employee" },
    { label: "Attendance", image: "/attendance.png", path: "attendance" },
    { label: "Leave", image: "/leaves.png", path: "leave" },
    { label: "HR Policies", image: "/hr-policies.png", path: "hrPolicies" },
    { label: "My Documents", image: "/hr-document.png", path: "hrDocuments" },
    // { label: "Recruitment", image: "/recruitment.png", path: "recruitment" },
    { label: "Calendar", image: "/calendar.png", path: "calendar" },
    { label: "Performance", image: "/performance.png", path: "performance" },
    // { label: "Logit", image: "/parcel.png", path: "logit" },
    // { label: "Evolve", image: "/evolution.png", path: "evolve" },
    // { label: "EPFO Website", image: "/epfo.png", path: "epfoWebite" },
    { label: "Policies", image: "/privacy-policy.png", path: "policies" },
    // { label: "P2P", image: "/p2p.png", path: "p2p" },
    // { label: "Happay", image: "/happay.png", path: "happay" },
    // { label: "Blue Box", image: "/blue-box.png", path: "bluebox" },
    { label: "Helpdesk", image: "/help-desk.png", path: "helpdesk" },
    { label: "More", image: "/more.png", path: "yatya" },
  ];

  return (
      <>
        <div className="p-4 md:p-6">
          <h1 className="mb-6 text-xl">My Access</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {modules.map((module, index) => (
              <Link
                to={module.path}
                key={index}
                className="text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-4 md:p-3"
              >
                <div className="flex justify-center items-center mb-2">
                  <img
                    src={module.image}
                    alt={module.label}
                    className="h-20 w-20 object-contain" // Making the image size a bit smaller
                  />
                </div>
                <p className="font-medium text-gray-700 mt-2">{module.label}</p> {/* Adjusting space between image and label */}
              </Link>
            ))}
          </div>
        </div>
      </>
  );
};

export default DashboardGrid;
