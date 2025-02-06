import React, { useState } from 'react';
import { format, addMonths, subMonths, isToday, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';

const CustomCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [events, setEvents] = useState([
    { date: '2025-01-20', type: 'holiday', title: 'Office Closed', color: '#FF0000' },
    { date: '2025-01-23', type: 'event', title: 'Team Meeting', color: '#00FF00' },
    { date: '2025-01-25', type: 'event', title: 'Project Deadline', color: '#0000FF' },
  ]);
  const [newEvent, setNewEvent] = useState({ date: format(today, 'yyyy-MM-dd'), title: '', color: '#000000' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  const getMonthYear = () => format(currentMonth, 'MMMM yyyy');

  const generateCalendar = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const changeMonth = (direction) => {
    setCurrentMonth(direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1));
  };

  const isSpecialDate = (date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return events.filter((event) => event.date === dateString);
  };

  const handleOpenModal = (eventIndex = null, selectedDate = format(today, 'yyyy-MM-dd')) => {
    if (eventIndex !== null) {
      setNewEvent(events[eventIndex]);
      setEditingEventIndex(eventIndex);
    } else {
      setNewEvent({ date: selectedDate, type: 'event', title: '', color: '#000000' });
      setEditingEventIndex(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEventIndex(null);
    setNewEvent({ date: format(today, 'yyyy-MM-dd'), type: 'event', title: '', color: '#000000' });
  };

  const handleSaveEvent = () => {
    if (!newEvent.date || !newEvent.title) {
      alert('Please fill in all fields!');
      return;
    }

    if (editingEventIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editingEventIndex] = newEvent;
      setEvents(updatedEvents);
    } else {
      setEvents([...events, newEvent]);
    }

    handleCloseModal();
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const calendar = generateCalendar();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Calendar Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => changeMonth('prev')}
            >
              Previous
            </button>
            <h2 className="text-2xl font-bold">{getMonthYear()}</h2>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => changeMonth('next')}
            >
              Next
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {calendar.map((date, index) => {
              const specials = isSpecialDate(date);
              return (
                <div
                  key={index}
                  className={`p-2 text-center border rounded ${
                    isToday(date) ? 'bg-blue-100 font-bold' : ''
                  }`}
                  onClick={() => handleOpenModal(null, format(date, 'yyyy-MM-dd'))}
                >
                  <div>{format(date, 'd')}</div>
                  {specials.map((special, i) => (
                    <div
                      key={i}
                      className="text-xs mt-1 rounded px-2"
                      style={{ backgroundColor: special.color, color: '#fff' }}
                    >
                      {special.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Management Section */}
        <div className="w-full md:w-1/3 pl-6 mt-4 md:mt-0">
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
          >
            Add Event
          </button>
          <div className="mt-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="p-2 mb-2 bg-gray-100 rounded shadow-md flex items-center justify-between"
              >
                <div>
                  <span className="font-bold">{event.title}</span>
                  <p className="text-xs">{event.date}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="text-blue-500 text-xs"
                    onClick={() => handleOpenModal(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 text-xs"
                    onClick={() => handleDeleteEvent(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
            <h3 className="text-lg font-bold mb-4">
              {editingEventIndex !== null ? 'Edit Event' : 'Add Event'}
            </h3>
            <div className="space-y-4">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event Title"
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="color"
                value={newEvent.color}
                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <button
                onClick={handleSaveEvent}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
