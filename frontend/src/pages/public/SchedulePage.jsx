import { useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import ScheduleTable from '../../components/schedule/ScheduleTable';
import ScheduleFilter from '../../components/schedule/ScheduleFilter';
import useFetch from '../../hooks/useFetch';

const SchedulePage = () => {
  const { data, loading, error } = useFetch('/schedules');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  const schedules = data || [];

  // Extract unique sports
  const sports = useMemo(() => {
    const sportSet = new Set();
    schedules.forEach((schedule) => {
      const sport =
        schedule.sport ||
        schedule.program?.sport ||
        schedule.programName;
      if (sport) sportSet.add(sport);
    });
    return Array.from(sportSet).sort();
  }, [schedules]);

  // Filtered schedules
  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const matchDay = !selectedDay || schedule.day === selectedDay;
      const sport =
        schedule.sport ||
        schedule.program?.sport ||
        schedule.programName;
      const matchSport = !selectedSport || sport === selectedSport;
      return matchDay && matchSport;
    });
  }, [schedules, selectedDay, selectedSport]);

  return (
    <>
      <SEO title="Schedule" description="View the weekly training schedule at Sports Academy. Find sessions by day and sport." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Training Schedule
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Plan your week with our comprehensive training schedule across all sports.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8">
            <ScheduleFilter
              selectedDay={selectedDay}
              selectedSport={selectedSport}
              sports={sports}
              onDayChange={setSelectedDay}
              onSportChange={setSelectedSport}
            />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-200 rounded" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded" />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Schedule table */}
          {!loading && !error && (
            <ScheduleTable
              schedules={filteredSchedules}
              selectedDay={selectedDay}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default SchedulePage;
