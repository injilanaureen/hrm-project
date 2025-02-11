import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  emp_id: { type: String, required: false },  // Employee ID
  date: { type: String, required: false },  // Date of attendance (YYYY-MM-DD)
  time_in: { type: String, required: false },  // Time In (HH:mm)
  time_out: { type: String },  // Time Out (HH:mm) (Optional)
  total_work_duration: { type: String },  // Work duration (HH:mm)
  late_by: { type: String, default: "N/A" },  // Late minutes (if applicable)
  early_out: { type: String, default: "N/A" },  // Early leaving time
  record_clock_in: { type: Boolean, default: true },  // Marked when employee clocks in
  record_clock_out: { type: Boolean, default: false },  // Marked when employee clocks out
  status: { type: String, enum: ["Present", "Leave", "Half day"], default: "Present" }, // Attendance status
  lateStatus:{ type: String},
  leaveReason:{ type: String},
  leaveType:{ type: String},
  leaveStartDate:{ type: Date},
  leaveEndDate:{ type: Date},
  leaveStatus:{ type: String},

});

// Create a unique index for emp_id + date (to prevent duplicate records for the same day)


const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
