import { useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import CoachList from '../../components/coaches/CoachList';
import useFetch from '../../hooks/useFetch';

const CoachesPage = () => {
  const { data, loading, error } = useFetch('/coaches');
  const [selectedSport, setSelectedSport] = useState('');

  const coaches = data || [];

  // Extract unique sports for the filter dropdown
  const sports = useMemo(() => {
    const sportSet = new Set();
    coaches.forEach((coach) => {
      const sport = coach.sport || coach.specialization;
      if (sport) sportSet.add(sport);
    });
    return Array.from(sportSet).sort();
  }, [coaches]);

  // Filtered coaches
  const filteredCoaches = useMemo(() => {
    if (!selectedSport) return coaches;
    return coaches.filter(
      (coach) => (coach.sport || coach.specialization) === selectedSport
    );
  }, [coaches, selectedSport]);

  return (
    <>
      <SEO title="Our Coaches" description="Meet our expert coaches with years of experience across multiple sports disciplines." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our Coaches
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Learn from experienced professionals who are passionate about developing the next generation of athletes.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sport filter */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label htmlFor="sport-filter" className="text-sm font-medium text-gray-700">
              Filter by Sport:
            </label>
            <select
              id="sport-filter"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-w-[200px]"
            >
              <option value="">All Sports</option>
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Coach list */}
          {!loading && !error && <CoachList coaches={filteredCoaches} />}
        </div>
      </section>
    </>
  );
};

export default CoachesPage;
