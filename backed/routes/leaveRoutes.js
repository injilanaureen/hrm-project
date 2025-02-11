import express from "express";
import Leave from "../models/Leave.js";
const leaveRouter = express.Router();

// 📌 Add a new leave record
leaveRouter.post("/addedLeave", async (req, res) => {
  try {
    const { emp_id, earned_leave, casual_leave, sick_leave } = req.body;
    const total_leave = earned_leave + casual_leave + sick_leave;

    const newLeave = new Leave({ emp_id, earned_leave, casual_leave, sick_leave, total_leave });
    await newLeave.save();

    res.status(201).json({ message: "Leave record added", leave: newLeave });
  } catch (error) {
    res.status(500).json({ message: "Error adding leave record", error });
  }
});

// 📌 Get all leave records
leaveRouter.get("/allEmployeeData", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave records", error });
  }
});

// 📌 Get a specific leave record by emp_id
leaveRouter.get("/getSingleLeaveData/:emp_id", async (req, res) => {
  try {
    const leave = await Leave.findOne({ emp_id: req.params.emp_id });

    if (!leave) return res.status(404).json({ message: "Leave record not found" });

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave record", error });
  }
});

// 📌 Update leave record
leaveRouter.put("/update/:emp_id", async (req, res) => {
  try {
    const { earned_leave, casual_leave, sick_leave } = req.body;
    const total_leave = earned_leave + casual_leave + sick_leave;

    const updatedLeave = await Leave.findOneAndUpdate(
      { emp_id: req.params.emp_id },
      { earned_leave, casual_leave, sick_leave, total_leave },
      { new: true }
    );

    if (!updatedLeave) return res.status(404).json({ message: "Leave record not found" });

    res.status(200).json({ message: "Leave record updated", leave: updatedLeave });
  } catch (error) {
    res.status(500).json({ message: "Error updating leave record", error });
  }
});

// 📌 Delete a leave record
leaveRouter.delete("/delete/:emp_id", async (req, res) => {
  try {
    const deletedLeave = await Leave.findOneAndDelete({ emp_id: req.params.emp_id });

    if (!deletedLeave) return res.status(404).json({ message: "Leave record not found" });

    res.status(200).json({ message: "Leave record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting leave record", error });
  }
});

export default leaveRouter;
