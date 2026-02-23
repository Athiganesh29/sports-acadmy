import { DAYS } from '../../utils/constants';

const ScheduleFilter = ({ selectedDay, selectedSport, sports, onDayChange, onSportChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Day filter */}
      <div className="flex-1">
        <label htmlFor="day-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Day
        </label>
        <select
          id="day-filter"
          value={selectedDay}
          onChange={(e) => onDayChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <option value="">All Days</option>
          {DAYS.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Sport filter */}
      <div className="flex-1">
        <label htmlFor="sport-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Sport
        </label>
        <select
          id="sport-filter"
          value={selectedSport}
          onChange={(e) => onSportChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <option value="">All Sports</option>
          {(sports || []).map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScheduleFilter;
