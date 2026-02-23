import { DAYS } from '../../utils/constants';
import TimeSlot from './TimeSlot';

const ScheduleTable = ({ schedules, selectedDay }) => {
  if (!schedules || schedules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No schedules found for the selected filters.</p>
      </div>
    );
  }

  // Group schedules by time slot
  const timeSlots = {};
  schedules.forEach((schedule) => {
    const timeKey = `${schedule.startTime}-${schedule.endTime}`;
    if (!timeSlots[timeKey]) {
      timeSlots[timeKey] = { startTime: schedule.startTime, endTime: schedule.endTime, days: {} };
    }
    const day = schedule.day;
    if (!timeSlots[timeKey].days[day]) {
      timeSlots[timeKey].days[day] = [];
    }
    timeSlots[timeKey].days[day].push(schedule);
  });

  const sortedTimeSlots = Object.values(timeSlots).sort((a, b) =>
    (a.startTime || '').localeCompare(b.startTime || '')
  );

  const displayDays = selectedDay ? [selectedDay] : DAYS;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 min-w-[640px]">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border border-blue-500 px-4 py-3 text-left text-sm font-semibold w-32">
              Time
            </th>
            {displayDays.map((day) => (
              <th key={day} className="border border-blue-500 px-4 py-3 text-center text-sm font-semibold">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTimeSlots.length > 0 ? (
            sortedTimeSlots.map((timeSlot) => (
              <tr key={`${timeSlot.startTime}-${timeSlot.endTime}`} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50 whitespace-nowrap">
                  {timeSlot.startTime} - {timeSlot.endTime}
                </td>
                {displayDays.map((day) => {
                  const daySlots = timeSlot.days[day];
                  if (daySlots && daySlots.length > 0) {
                    return (
                      <TimeSlot key={day} slot={daySlots[0]} />
                    );
                  }
                  return <TimeSlot key={day} slot={null} />;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={displayDays.length + 1} className="text-center py-8 text-gray-500">
                No time slots available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
