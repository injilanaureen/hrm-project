
import { useEffect, useState } from "react";
import axios from "axios";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/holiday/holidays")
      .then((response) => {
        setHolidays(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Holiday List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Holiday Name</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Day</th>
              <th className="border px-4 py-2">Weekday</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday._id} className="text-center">
                <td className="border px-4 py-2">{holiday.holidayName}</td>
                <td className="border px-4 py-2">{holiday.month}</td>
                <td className="border px-4 py-2">{holiday.day}</td>
                <td className="border px-4 py-2">{holiday.weekDateName}</td>
                <td className="border px-4 py-2">{holiday.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolidayList;
