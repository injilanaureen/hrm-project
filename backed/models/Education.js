import mongoose from 'mongoose';

// Education Schema
const educationSchema = new mongoose.Schema({
  emp_id: { type: String, required: true, unique: true }, // Reference to the User's emp_id
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year_of_passing: { type: Number, required: true },
});

const Education = mongoose.model('Education', educationSchema);

export default Education;
