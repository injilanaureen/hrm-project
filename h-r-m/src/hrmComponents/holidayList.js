import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Plus, X, Edit2, Loader2 } from 'lucide-react';

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    holidayName: '',
    month: '',
    day: '',
    weekDateName: '',
    status: '',
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/holiday/holidays');
      setHolidays(response.data);
      setLoading(false);
    } catch (error) {
      setError(error?.message || 'An error occurred');
      setLoading(false);
    }
  };

  const openModal = (holiday) => {
    setSelectedHoliday({ ...holiday });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHoliday(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedHoliday((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/holiday/add', newHoliday);
      setHolidays([...holidays, response.data]);
      setNewHoliday({
        holidayName: '',
        month: '',
        day: '',
        weekDateName: '',
        status: '',
      });
    } catch (error) {
      alert('Failed to add holiday: ' + (error?.message || 'An error occurred'));
    }
  };

  const handleUpdate = async () => {
    if (!selectedHoliday) return;

    try {
      await axios.put(
        `http://localhost:5000/api/holiday/update-holidays/${selectedHoliday._id}`,
        selectedHoliday
      );
      setHolidays((prevHolidays) =>
        prevHolidays.map((holiday) =>
          holiday._id === selectedHoliday._id ? selectedHoliday : holiday
        )
      );
      closeModal();
    } catch (error) {
      alert('Failed to update holiday: ' + (error?.message || 'An error occurred'));
    }
  };
  const deleteHandle = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/holiday/deleteHoliday/${id}`);
      
      alert("Holiday deleted successfully!");
  
      // UI se delete karne ke liye filter method use karo
      setHolidays((prevHolidays) => prevHolidays.filter((holiday) => holiday._id !== id));
  
    } catch (error) {
      console.error("Error deleting holiday:", error);
      alert("Failed to delete holiday!");
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Holiday Management</h1>
        </div>
      </div>

      {/* Add New Holiday Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Holiday
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            name="holidayName"
            placeholder="Holiday Name"
            value={newHoliday.holidayName}
            onChange={handleNewChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            name="month"
            placeholder="Month"
            value={newHoliday.month}
            onChange={handleNewChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            name="day"
            placeholder="Day"
            value={newHoliday.day}
            onChange={handleNewChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            name="weekDateName"
            placeholder="Weekday"
            value={newHoliday.weekDateName}
            onChange={handleNewChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <select
            name="status"
            value={newHoliday.status}
            onChange={handleNewChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Holiday">Holiday</option>
          </select>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Holiday
        </button>
      </div>

      {/* Holiday List Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holiday Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weekday
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holidays.map((holiday) => (
                <tr key={holiday._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {holiday.holidayName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {holiday.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {holiday.day}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {holiday.weekDateName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        holiday.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {holiday.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => openModal(holiday)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={ () => deleteHandle(holiday._id)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Edit Holiday</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday Name
                </label>
                <input
                  type="text"
                  name="holidayName"
                  value={selectedHoliday.holidayName}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month
                </label>
                <input
                  type="text"
                  name="month"
                  value={selectedHoliday.month}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <input
                  type="text"
                  name="day"
                  value={selectedHoliday.day}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weekday
                </label>
                <input
                  type="text"
                  name="weekDateName"
                  value={selectedHoliday.weekDateName}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={selectedHoliday.status}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Holiday">Holiday</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Holiday
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayList;