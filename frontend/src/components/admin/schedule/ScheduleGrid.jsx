import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00',
];

const ScheduleGrid = ({ schedule, loading, onAdd, onEdit, onRefresh }) => {
  const getEntry = (day, time) => {
    return schedule.find(
      (entry) => entry.day === day && entry.startTime === time
    );
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/schedules/${id}`);
      toast.success('Schedule entry deleted');
      onRefresh();
    } catch {
      toast.error('Failed to delete entry');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-3 text-xs font-semibold text-gray-600 uppercase text-left w-20">
                Time
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-3 py-3 text-xs font-semibold text-gray-600 uppercase text-center min-w-[140px]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {timeSlots.map((time) => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-xs font-medium text-gray-500 whitespace-nowrap">
                  {time}
                </td>
                {days.map((day) => {
                  const entry = getEntry(day, time);
                  return (
                    <td key={`${day}-${time}`} className="px-2 py-1 text-center">
                      {entry ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs group relative">
                          <p className="font-medium text-blue-800 truncate">
                            {entry.program?.name || entry.programName}
                          </p>
                          <p className="text-blue-600 truncate">
                            {entry.coach?.name || entry.coachName}
                          </p>
                          <p className="text-blue-400">
                            {entry.startTime} - {entry.endTime}
                          </p>
                          {/* Hover actions */}
                          <div className="absolute top-1 right-1 hidden group-hover:flex space-x-1">
                            <button
                              onClick={() => onEdit(entry)}
                              className="p-0.5 bg-white rounded shadow text-blue-600 hover:text-blue-800"
                            >
                              <MdEdit className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDelete(entry._id)}
                              className="p-0.5 bg-white rounded shadow text-red-600 hover:text-red-800"
                            >
                              <MdDelete className="text-sm" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAdd(day, time)}
                          className="w-full h-full min-h-[40px] flex items-center justify-center text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <MdAdd className="text-lg" />
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleGrid;
