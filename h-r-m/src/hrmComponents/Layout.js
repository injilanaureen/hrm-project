import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiSearch, FiBell, FiX } from "react-icons/fi";
import { SquareMenu } from 'lucide-react';

const Layout = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null); // Ref to focus the search input
  const searchModalRef = useRef(null); // Ref to detect clicks outside the search modal
  const notificationsRef = useRef(null); // Ref to detect clicks outside the notifications dropdown

  const notifications = [
    { id: 1, text: "New employee added", time: "5m ago", isNew: true },
    { id: 2, text: "Attendance marked for today", time: "10m ago", isNew: true },
    { id: 3, text: "Leave request approved", time: "1h ago", isNew: true },
  ];
  const newNotifications = notifications.filter((n) => n.isNew);
  const oldNotifications = notifications.filter((n) => !n.isNew);
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the search input visibility
  };

  const handleSearchCancel = () => {
    setIsSearchOpen(false); // Hide the search input
  };

  // Focus on the search input when it opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close the search modal when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setIsSearchOpen(false); // Close search if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false); // Close notifications if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-400 shadow-sm fixed w-full z-20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-xl flex gap-2 items-center font-bold text-white">
            <SquareMenu/>
             <p>HRM Dashboard</p> 
            </Link>

            {/* Search and Notifications */}
            <div className="flex items-center gap-4">
              {/* Mobile Search Icon */}
              <button
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                onClick={handleSearchToggle} // Toggle search input
              >
                <FiSearch size={20} />
              </button>

              {/* Full Search Input (Visible on Desktop) */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search employees or departments..."
                  className="w-64 px-4 py-2 pl-10 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>

              {/* Mobile Search Input (Appears when toggled) */}
              {isSearchOpen && (
                <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-start justify-center pt-6">
                  <div ref={searchModalRef} className="relative bg-white w-full max-w-md mx-auto p-4 rounded-lg shadow-lg">
                    {/* Cancel Button */}
                    <button
                      onClick={handleSearchCancel}
                      className="absolute top-1 right-3 text-gray-500 hover:text-gray-700"
                      aria-label="Close search"
                    >
                      <FiX size={24} />
                    </button>

                    {/* Search Input */}
                    <div className="flex items-center gap-2 mt-2">
                      <FiSearch size={24} className="text-gray-400" />
                      <input
                        ref={searchInputRef} // Focus the input when it opens
                        type="text"
                        placeholder="Search employees or departments..."
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 relative"
                >
                  <FiBell size={20} />
                  {notifications.some((n) => n.isNew) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
                    {newNotifications.length > 0 ? (
                      <>
                        <p className="px-4 py-2 text-sm text-blue-600 font-semibold border-b">New Notifications</p>
                        <ul className="py-2">
                          {newNotifications.map((notification) => (
                            <li
                              key={notification.id}
                              className="px-4 py-2 bg-blue-50 hover:bg-gray-100"
                            >
                              <p className="text-sm font-medium">{notification.text}</p>
                              <p className="text-xs text-gray-400">{notification.time}</p>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : oldNotifications.length > 0 ? (
                      <>
                        <p className="px-4 py-2 text-sm text-gray-600 font-semibold border-b">Earlier Notifications</p>
                        <ul className="py-2">
                          {oldNotifications.map((notification) => (
                            <li
                              key={notification.id}
                              className="px-4 py-2 hover:bg-gray-100"
                            >
                              <p className="text-sm font-medium">{notification.text}</p>
                              <p className="text-xs text-gray-400">{notification.time}</p>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="px-4 py-2 text-sm text-gray-400">No notifications available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
