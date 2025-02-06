import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";

function ChangePassword() {
    const { user } = useAuth();
   const [isLoading, setIsLoading] = useState(false);  // Initially not loading
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Basic validation
          if (oldPassword.trim() === "") {
              toast.error("Old password is required!");
              return;
          }
          if (newPassword.trim() === "") {
              toast.error("New password is required!");
              return;
          }
          if (confirmPassword.trim() === "") {
              toast.error("Confirm password is required!");
              return;
          }
  
          // Password requirements validation
          if (newPassword.length < 8) {
              toast.error("New password must be at least 8 characters long!");
              return;
          }
          if (newPassword !== confirmPassword) {
              toast.error("New password and confirm password do not match!");
              return;
          }
  
          // Show loading state
          setIsLoading(true);
  
          const response = await axios.put('http://localhost:5000/api/auth/updateUserPassword', {
              empId: user.emp_id,
              oldPassword,
              newPassword,
          });
  
          // Success case
          if (response.data.success) {
            alert(response.data.message);
              // Reset form
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
          } else {
              // Handle unsuccessful response
              alert(response.data.message || "Failed to update password");
          }
  
      } catch (error) {
          // Error handling
          const errorMessage = error.response?.data?.message || "Failed to update password. Please try again.";
          alert(errorMessage);
          console.error("Password reset error:", error);
      } finally {
          setIsLoading(false);
      }
  };
    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}

                <div className="relative">
                    <label className="block mb-2">Old Password</label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                        {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="relative">
                    <label className="block mb-2">New Password</label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="relative">
                    <label className="block mb-2">Confirm New Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
