import express from "express";
import Holiday from "../models/holidayList.js"; // Ensure correct file path

const addHoliday = express.Router();

// POST route to add a new holiday
addHoliday.post("/add", async (req, res) => {
  try {
    const { holidayName, month, day, weekDateName, status } = req.body;

    const newHoliday = new Holiday({
      holidayName,
      month,
      day,
      weekDateName,
      status: status || "Week Off", // Default to "Week Off" if not provided
    });

    await newHoliday.save();
    res.status(201).json({ message: "Holiday added successfully", holiday: newHoliday });
  } catch (error) {
    res.status(500).json({ message: "Error adding holiday", error });
  }
});
addHoliday.get("/holidays", async (req, res) => {
    try {
      const { month } = req.query; // Get month from query parameters
  
      let filter = {};
      if (month) {
        const monthsArray = month.split(",").map(m => m.trim()); // Convert comma-separated values into an array
        filter = { month: { $in: monthsArray } };
      }
  
      const holidays = await Holiday.find(filter);
      res.status(200).json(holidays);
    } catch (error) {
      res.status(500).json({ message: "Error fetching holidays", error });
    }
  });
  // UPDATE a holiday by ID
addHoliday.put("/update-holidays/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedHoliday = await Holiday.findByIdAndUpdate(id, req.body, {
        new: true, // Return updated document
        runValidators: true, // Validate data
      });
  
      if (!updatedHoliday) {
        return res.status(404).json({ message: "Holiday not found" });
      }
  
      res.status(200).json(updatedHoliday);
    } catch (error) {
      res.status(500).json({ message: "Error updating holiday", error });
    }
  });
  // Delete Holiday by ID
addHoliday.delete('/deleteHoliday/:id', async (req, res) => {
    try {
        const holiday = await Holiday.findByIdAndDelete(req.params.id);

        if (!holiday) {
            return res.status(404).json({ message: 'Holiday not found' });
        }

        res.json({ message: 'Holiday deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting holiday', error });
    }
});
export default addHoliday;

