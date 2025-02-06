import React from 'react';
import { useAuth } from '../context/AuthContext';

function BlueBox() {
  const { user } = useAuth(); // Access user data
console.log(user.emp_id);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
      <div className="space-y-4">
        <p><strong>Employee ID:</strong> {user.emp_id}</p>
        <p><strong>Full Name:</strong> {user.emp_full_name}</p>
        <p><strong>Email:</strong> {user.emp_email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Phone Number:</strong> {user.emp_phone_no}</p>
        <p><strong>Department:</strong> {user.emp_department}</p>
        <p><strong>Designation:</strong> {user.emp_designation}</p>
        <p><strong>Status:</strong> {user.emp_status}</p>
      </div>
    </div>
  );
}

export default BlueBox;
