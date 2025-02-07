import React, { useState, useEffect } from "react";

const UpdateResignedEmployeeForm = ({ setShowDialog2, selectedEmployee1 }) => {
  const [formData, setFormData] = useState({
    last_working_day: "",
    total_work_period: "",
    last_ctc_drawn: selectedEmployee1.emp_offered_ctc,
    last_designation: selectedEmployee1.emp_designation,
    employee_name: selectedEmployee1.emp_full_name,
    emp_status: "resigned",
    emp_empstatus: "resigned",
    reason_for_resignation: "",
    feedback: "",
    exit_interview_done: false,
    notice_period_served: false,
  });

  // Function to calculate work period in Years, Months, Days
  const calculateWorkPeriod = (lastDay) => {
    if (!lastDay) return "";

    const joinDate = new Date(selectedEmployee1.emp_join_date);
    const lastDate = new Date(lastDay);

    if (isNaN(joinDate) || isNaN(lastDate)) return "";

    let years = lastDate.getFullYear() - joinDate.getFullYear();
    let months = lastDate.getMonth() - joinDate.getMonth();
    let days = lastDate.getDate() - joinDate.getDate();

    // Adjust for negative values
    if (days < 0) {
      months -= 1;
      const prevMonthDays = new Date(lastDate.getFullYear(), lastDate.getMonth(), 0).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years} years, ${months} months, ${days} days`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "last_working_day") {
      const workPeriod = calculateWorkPeriod(value);
      setFormData((prev) => ({
        ...prev,
        last_working_day: value,
        total_work_period: workPeriod, // Auto-update work period
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/adduser/resigned_employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emp_id: selectedEmployee1.emp_id, ...formData }),
      });

      if (response.ok) {
        alert("Resignation details updated successfully");
        setShowDialog2(false);
      } else {
        alert("Error updating resignation details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Resignation Details</h2>
      <form onSubmit={handleSubmit}>
        <label className="block">Last Working Day</label>
        <input
          type="date"
          name="last_working_day"
          className="w-full border p-2 rounded mb-2"
          value={formData.last_working_day}
          onChange={handleChange}
        />

        <label className="block">Total Work Period</label>
        <input
          type="text"
          name="total_work_period"
          className="w-full border p-2 rounded mb-2"
          value={formData.total_work_period}
          disabled
        />

        <label className="block">Last CTC Drawn</label>
        <input
          type="number"
          name="last_ctc_drawn"
          className="w-full border p-2 rounded mb-2"
          value={formData.last_ctc_drawn}
          disabled
        />

        <label className="block">Last Designation</label>
        <input
          type="text"
          name="last_designation"
          className="w-full border p-2 rounded mb-2"
          value={formData.last_designation}
          disabled
        />

        <label className="block">Reason for Resignation</label>
        <textarea
          name="reason_for_resignation"
          className="w-full border p-2 rounded mb-2"
          value={formData.reason_for_resignation}
          onChange={handleChange}
        ></textarea>

        <label className="block">Feedback</label>
        <textarea
          name="feedback"
          className="w-full border p-2 rounded mb-2"
          value={formData.feedback}
          onChange={handleChange}
        ></textarea>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="exit_interview_done" checked={formData.exit_interview_done} onChange={handleChange} />
          Exit Interview Done
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="notice_period_served" checked={formData.notice_period_served} onChange={handleChange} />
          Notice Period Served
        </label>

        <button type="submit" className="bg-indigo-400 text-white p-2 rounded mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateResignedEmployeeForm;
