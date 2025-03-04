import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  emp_id: { type: String, required: false },  // Employee ID
  date: { type: String, required: false },  // Date of attendance (YYYY-MM-DD)
  time_in: { type: String, required: false },  // Time In (HH:mm)
  time_out: { type: String },  // Time Out (HH:mm) (Optional)
  total_work_duration: { type: String },  // Work duration (HH:mm)
  late_by: { type: String, default: "N/A" },  // Late minutes (if applicable)
  early_out: { type: String, default: "N/A" },  // Early leaving time
  status: { type: String }, // Attendance status
  holidayName: { type: String, required: false},
  leaveType: { type: String,  }, 
  earlyStatus:{ type: String},
  lateStatus:{ type: String},
  halfDayStatus:{ type: String},
  halfDayPeriod:{ type: String, },
  shortLeaveStatus: { type: String},
  shortLeavePeriod: { type: String, },
 
});




const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;


// Create a unique index for emp_id + date (to prevent duplicate records for the same day)