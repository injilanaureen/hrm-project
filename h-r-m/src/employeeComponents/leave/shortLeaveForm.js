import { useState } from "react";

const ShortLeaveForm = () => {
  const [formData, setFormData] = useState({
    emp_id: "",
    shortLeaveDate: "",
    shortLeavePeriod: "",
    shortLeaveReason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/apply-short-leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);

    } catch (error) {
      console.error("Error submitting short leave:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Apply for Short Leave</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="emp_id" placeholder="Employee ID" value={formData.emp_id} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

        <input type="date" name="shortLeaveDate" value={formData.shortLeaveDate} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

        <select name="shortLeavePeriod" value={formData.shortLeavePeriod} onChange={handleChange} required className="w-full p-2 border rounded mb-2">
          <option value="">Select Period</option>
          <option value="Morning">Morning (10:00 AM - 12:00 PM)</option>
          <option value="Evening">Evening (5:00 PM - 7:00 PM)</option>
        </select>

        <textarea name="shortLeaveReason" placeholder="Reason for short leave" value={formData.shortLeaveReason} onChange={handleChange} required className="w-full p-2 border rounded mb-2"></textarea>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default ShortLeaveForm;
