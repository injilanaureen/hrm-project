import React, { useState } from 'react';
const UpdateResignedEmployeeForm = ({ setShowDialog2, selectedEmployee1 }) => {
    const [formData, setFormData] = useState({
      last_working_day: "",
      total_work_period: "",
      last_ctc_drawn: "",
      last_designation: selectedEmployee1.emp_designation,
      employee_name: selectedEmployee1.emp_full_name,
      emp_status:'resigned',
      emp_empstatus:'resigned',
      reason_for_resignation: "",
      feedback: "",
      exit_interview_done: false,
      notice_period_served: false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // API call to update resigned employee data
      try {
        const response = await fetch("http://localhost:5000/api/adduser/resigned_employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emp_id: selectedEmployee1.emp_id, ...formData }),
        }
    
      );
        if (response.ok) {
          alert("Resignation details updated successfully");
          console.log(formData)
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
            onChange={handleChange}
          
          />
  
          <label className="block">Last CTC Drawn</label>
          <input
            type="number"
            name="last_ctc_drawn"
            className="w-full border p-2 rounded mb-2"
            value={formData.last_ctc_drawn}
            onChange={handleChange}
     
                      />
  
          <label className="block">Last Designation</label>
          <input
            type="text"
            name="last_designation"
            className="w-full border p-2 rounded mb-2"
            value={formData.last_designation}
            onChange={handleChange}
            placeholder={formData.last_designation}
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
  
          <label className=" flex items-center gap-2">
            <input
              type="checkbox"
              name="exit_interview_done"
              checked={formData.exit_interview_done}
              onChange={handleChange}
            />
            Exit Interview Done
          </label>
  
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notice_period_served"
              checked={formData.notice_period_served}
              onChange={handleChange}
            />
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