import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Calendar, Clock, FileText, Loader2, CheckCircle, X } from "lucide-react";

const ShortLeaveForm = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [shortLeaves, setShortLeaves] = useState([]);

  const [formData, setFormData] = useState({
    emp_id: user.emp_id,
    shortLeaveDate: "",
    shortLeavePeriod: "",
    shortLeaveReason: "",
  });

  useEffect(() => {
    fetchShortLeaves();
  }, []);

  const fetchShortLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/short-leaves/${user.emp_id}`);
      
      setShortLeaves(response.data);
    } catch (error) {
      console.error("Error fetching short leaves:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (feedback.message) setFeedback({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/leave/apply-short-leave", formData);
      setFeedback({ type: "success", message: response.data.message });
      fetchShortLeaves();
      setFormData({ emp_id: user.emp_id, shortLeaveDate: "", shortLeavePeriod: "", shortLeaveReason: "" });
    } catch (error) {
      setFeedback({ type: "error", message: "Unable to submit leave request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Form */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" /> Short Leave Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="date" name="shortLeaveDate" value={formData.shortLeaveDate} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <select name="shortLeavePeriod" value={formData.shortLeavePeriod} onChange={handleChange} required className="w-full p-3 border rounded-lg">
            <option value="">Select Period</option>
            <option value="Morning">Morning (10:00 AM - 12:00 PM)</option>
            <option value="Evening">Evening (5:00 PM - 7:00 PM)</option>
          </select>
          <textarea name="shortLeaveReason" placeholder="Provide a reason" value={formData.shortLeaveReason} onChange={handleChange} required className="w-full p-3 border rounded-lg h-24" />
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center gap-2">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />} Submit
          </button>
        </form>
      </div>

      {/* Leave Table */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border">
        <h2 className="text-xl font-bold mb-4">Leave History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Period</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {shortLeaves.map((leave) => (
                <tr key={leave._id} className="border">
                  <td className="p-2 border">{leave.shortLeaveDate}</td>
                  <td className="p-2 border">{leave.shortLeavePeriod}</td>
                  <td className="p-2 border">{leave.shortLeaveReason}</td>
                  <td className={`p-2 border font-semibold ${leave.leaveStatus === "Pending" ? "text-yellow-500" : "text-green-500"}`}>{leave.leaveStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShortLeaveForm;