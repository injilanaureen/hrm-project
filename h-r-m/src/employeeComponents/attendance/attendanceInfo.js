// InfoSections.js
import React from 'react';

const InfoSections = () => {
  return (
    <div>
      {/* Total Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="font-medium mb-4 text-sm">Total</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xl font-bold">2</div>
              <div className="text-gray-500 text-sm">Leave Days</div>
            </div>
            <div>
              <div className="text-xl font-bold">9</div>
              <div className="text-gray-500 text-sm">Present Days</div>
            </div>
            <div>
              <div className="text-xl font-bold">0</div>
              <div className="text-gray-500 text-sm">Absent Days</div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="font-medium mb-4 text-sm">AVERAGE</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xl font-bold">09:02</div>
              <div className="text-gray-500 text-sm">Work Duration</div>
            </div>
            <div>
              <div className="text-xl font-bold">00:19</div>
              <div className="text-gray-500 text-sm">Late By</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium mb-2 text-sm">Clocking Priority</h3>
          <p className="text-xs">BIOMETRIC</p>
        </div>
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium mb-2 text-sm">Shift</h3>
          <p className="text-xs">Standard Shift(noida ) (10:00:00 - 19:00:00)</p>
        </div>
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium mb-2 text-sm">Policy</h3>
          <p className="text-purple-600 text-xs">New Attendance Policy</p>
        </div>
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium mb-2 text-sm">Weekly Off</h3>
          <p className="text-xs">Sunday Weekly Off</p>
          <p className="text-xs text-gray-500">(All Sunday)</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSections;
