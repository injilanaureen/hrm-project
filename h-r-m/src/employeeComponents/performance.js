import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jan', performance: 15, teamAverage: 82 },
  { month: 'Feb', performance: 88, teamAverage: 83 },
  { month: 'Mar', performance: 92, teamAverage: 85 },
  { month: 'Apr', performance: 90, teamAverage: 86 },
  { month: 'May', performance: 95, teamAverage: 84 },
  { month: 'Jun', performance: 93, teamAverage: 87 },
];

const kpiData = [
  { metric: 'Projects Completed', value: 12 },
  { metric: 'Team Satisfaction', value: '95%' },
  { metric: 'Code Quality Score', value: '92%' },
  { metric: 'On-time Delivery', value: '98%' },
];

function Performance() {
  const [selectedEmployee] = useState({
    name: 'Sarah Johnson',
    position: 'Lead Developer',
    department: 'Product Engineering',
    joinDate: 'June 2022',
    rating: 4.8,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4"> {/* This sets the overall page background to a light color */}
      <main className="max-w-5xl mx-auto bg-gray-100 p-6 space-y-8 rounded-lg shadow-lg"> {/* This sets the content area background */}
      
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm text-gray-500">{kpi.metric}</h3>
              <div className="text-2xl font-semibold text-gray-800">{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Performance Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="performance" stroke="#4F46E5" strokeWidth={2} />
              <Line type="monotone" dataKey="teamAverage" stroke="#A0AEC0" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default Performance;
