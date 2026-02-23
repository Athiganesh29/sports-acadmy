import { useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import AgeGroupFilter from '../../components/programs/AgeGroupFilter';
import ProgramList from '../../components/programs/ProgramList';
import useFetch from '../../hooks/useFetch';

const ProgramsPage = () => {
  const { data, loading, error } = useFetch('/programs');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');

  const programs = data || [];

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    if (!selectedAgeGroup) return programs;
    return programs.filter((program) => program.ageGroup === selectedAgeGroup);
  }, [programs, selectedAgeGroup]);

  return (
    <>
      <SEO title="Programs" description="Explore our comprehensive sports training programs for all age groups and skill levels." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our Programs
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Find the perfect training program tailored to your age and skill level.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Age group filter */}
          <div className="mb-8">
            <AgeGroupFilter
              selected={selectedAgeGroup}
              onSelect={setSelectedAgeGroup}
            />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
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

          {/* Program list */}
          {!loading && !error && <ProgramList programs={filteredPrograms} />}
        </div>
      </section>
    </>
  );
};

export default ProgramsPage;
