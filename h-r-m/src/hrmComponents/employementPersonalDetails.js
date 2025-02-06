import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeePersonalDetailsForm({ setShowDialog1,selectedEmployee1}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    permanent_address: '',
    permanent_city: '',
    permanent_state: '',
    permanent_zip_code: '',
    current_address: '',
    current_city: '',
    current_state: '',
    current_zip_code: '',
    alternate_mob_no: '',
    emergency_person_name: '',
    emergency_relationship: '',
    emergency_mob_no: '',
    emergency_address: '',
    marital_status: '',
    blood_group:'',
    account_holder_name: '',
    bank_name: '',
    branch_name: '',
    account_no: '',
    IFSC_code: '',
    education: [
      { degree: 'High School', institution: '', year_of_passing: '' },
      { degree: 'Intermediate', institution: '', year_of_passing: '' },
      { degree: 'Graduation', institution: '', year_of_passing: '' },
      { degree: 'Post Graduation', institution: '', year_of_passing: '' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index][name] = value;
    setFormData({ ...formData, education: updatedEducation });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
      console.log(selectedEmployee1)
      const dataToSubmit = { ...formData, emp_id: selectedEmployee1.emp_id };

      const response = await axios.post("http://localhost:5000/api/adduser/submitPersonalInformation",dataToSubmit)
      if(response.data.success){
        console.log("User profile data added successfully:", response.data);
        setShowDialog1(false);
        setFormData({
          permanent_address: '',
          permanent_city: '',
          permanent_state: '',
          permanent_zip_code: '',
          current_address: '',
          current_city: '',
          current_state: '',
          current_zip_code: '',
          alternate_mob_no: '',
          emergency_person_name: '',
          emergency_relationship: '',
          emergency_mob_no: '',
          emergency_address: '',
          marital_status: '',
          blood_group:'',
          account_holder_name: '',
          bank_name: '',
          branch_name: '',
          account_no: '',
          IFSC_code: '',
        education: [
          { degree: 'High School', institution: '', year_of_passing: '' },
          { degree: 'Intermediate', institution: '', year_of_passing: '' },
          { degree: 'Graduation', institution: '', year_of_passing: '' },
          { degree: 'Post Graduation', institution: '', year_of_passing: '' }
        ]
        })

      }
      else{
        console.error("Failed to add user profile data:", response.data.error);
      }
    }
    
    catch(error){
      console.error('Failed to submit form:', error);
      return;
    }
    console.log('Form submitted:', formData);
    setShowDialog1(false)
  };

  return (
<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
  <div className="bg-white p-8 rounded-md w-full md:w-3/4 lg:w-2/3">
  <h2 className="text-lg mb-4 font-semibold">Add Employee - Step {step}</h2>
  <form onSubmit={handleSubmit}>
    {step === 1 && (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
         
          <div>
            <label>Permanent Address *</label>
            <input
              type="text"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Permanent Address"
            />
          </div>
          <div>
            <label>Permanent City *</label>
            <input
              type="text"
              name="permanent_city"
              value={formData.permanent_city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Permanent City"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
         
          <div>
            <label>Permanent State *</label>
            <input
              type="text"
              name="permanent_state"
              value={formData.permanent_state}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Permanent State"
            />
          </div>
          <div>
            <label>Permanent Zip Code *</label>
            <input
              type="text"
              name="permanent_zip_code"
              value={formData.permanent_zip_code}
              onChange={handleChange}
              pattern="\d{6}"
              title="Please enter a 6-digit Zip Code"
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Zip Code"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          
          <div>
            <label>Current Address *</label>
            <input
              type="text"
              name="current_address"
              value={formData.current_address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Current Address"
            />
          </div>
          <div>
            <label>Current City *</label>
            <input
              type="text"
              name="current_city"
              value={formData.current_city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Current City"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          
          <div>
            <label>Current State *</label>
            <input
              type="text"
              name="current_state"
              value={formData.current_state}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Current State"
            />
          </div>
          <div>
            <label>Current Zip Code *</label>
            <input
              type="text"
              name="current_zip_code"
              value={formData.current_zip_code}
              onChange={handleChange}
              pattern="\d{6}"
              title="Please enter a 6-digit Zip Code"
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Current Zip Code"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
         
          <div>
            <label>Alternate Mobile Number *</label>
            <div className="flex items-center border rounded-md">
              <span className="px-2 bg-gray-200 text-gray-700">+91</span>
              <input
                type="text"
                name="alternate_mob_no"
                value={formData.alternate_mob_no}
                onChange={handleChange}
                pattern="\d{10}"
                title="Please enter a 10-digit mobile number"
                className="w-full p-2 border-l-0 rounded-md"
                placeholder="Enter Alternate Mobile Number"
              />
            </div>
          </div>
          <div>
            <label>Emergency Contact Name *</label>
            <input
              type="text"
              name="emergency_person_name"
              value={formData.emergency_person_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Emergency Contact Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
       
          <div>
            <label>Emergency Relationship *</label>
            <select
              name="emergency_relationship"
              value={formData.emergency_relationship}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Relationship</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Spouse">Spouse</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Emergency Mobile Number *</label>
            <input
              type="text"
              name="emergency_mob_no"
              value={formData.emergency_mob_no}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Emergency Mobile Number"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          
          <div>
            <label>Emergency Address *</label>
            <input
              type="text"
              name="emergency_address"
              value={formData.emergency_address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter Emergency Address"
            />
          </div>
          <div>
            <label>Marital Status *</label>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">  
        <div>
  <label className="block text-sm font-medium text-gray-700">Blood Group</label>
  <select
    name="blood_group"
    value={formData.blood_group}
    onChange={handleChange}
    required
    className="w-full p-2 border rounded-md"
  >
    <option value="">Select Blood Group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
  </select>
</div>

        
        </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setStep(2)} className="col-span-2 mt-4 p-2 bg-blue-500 text-white rounded-md">
          Next
        </button>

        <button onClick={() => setShowDialog1(false)} className="col-span-2  mt-4 p-2 bg-red-500 text-white rounded-md">
          Cancel
        </button>
      </div>

      </div>
    )}

    {step === 2 && (
      <div className="space-y-4">
        <div>
          <label>Account Holder Name *</label>
          <input
            type="text"
            name="account_holder_name"
            value={formData.account_holder_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter Account Holder Name"
          />
        </div>
        <div>
          <label>Bank Name *</label>
          <input
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter Bank Name"
          />
        </div>
        <div>
          <label>Branch Name *</label>
          <input
            type="text"
            name="branch_name"
            value={formData.branch_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter Branch Name"
          />
        </div>
        <div>
          <label>Account Number *</label>
          <input
            type="text"
            name="account_no"
            value={formData.account_no}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter Account Number"
          />
        </div>
        <div>
          <label>IFSC Code *</label>
          <input
            type="text"
            name="IFSC_code"
            value={formData.IFSC_code}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter IFSC Code"
          />
        </div>
        
      <div className="flex justify-end gap-2">
          <button onClick={() => setStep(1)} className="col-span-2 mt-4 p-2 bg-blue-500 text-white rounded-md">
            Previous
          </button>
          <button onClick={() => setStep(3)} className="col-span-2 mt-4 p-2 bg-blue-500 text-white rounded-md">
            Next
          </button>
          <button onClick={() => setShowDialog1(false)} className="col-span-2  mt-4 p-2 bg-red-500 text-white rounded-md">
            Cancel
          </button>
      </div>
      </div>
    )}

    {step === 3 && (
       <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div key={index}>
            <label>{edu.degree} - Institution *</label>
            <input
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, e)}
             
              className="w-full p-2 border rounded-md"
              placeholder="Enter Institution Name"
            />
            <label>Year of Passing *</label>
            <input
              type="text"
              name="year_of_passing"
              value={edu.year_of_passing}
              onChange={(e) => handleEducationChange(index, e)}
         
              className="w-full p-2 border rounded-md"
              placeholder="Enter Year of Passing"
            />
          </div>
        ))}
        <button onClick={() => setStep(2)} className="mr-4 p-2 bg-gray-500 text-white rounded-md">
          Previous
        </button>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
        <button onClick={()=>{setShowDialog1(false)}} type="submit" className="p-2 bg-red-500 text-white rounded-md">
          Close
        </button>
      </div>
    )}
  </form>
</div>

  </div>
  
  
  
  
  );
}

export default EmployeePersonalDetailsForm;
