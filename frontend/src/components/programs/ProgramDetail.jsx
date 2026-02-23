import { useParams, Link } from 'react-router-dom';
import {
  MdArrowBack,
  MdSportsSoccer,
  MdAccessTime,
  MdCurrencyRupee,
  MdPerson,
  MdCalendarMonth,
} from 'react-icons/md';
import useFetch from '../../hooks/useFetch';
import SEO from '../common/SEO';

const ProgramDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/programs/${id}`);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h2>
        <p className="text-gray-600 mb-6">The program you are looking for does not exist.</p>
        <Link to="/programs" className="text-blue-600 hover:underline font-semibold">
          &larr; Back to Programs
        </Link>
      </div>
    );
  }

  const program = data;

  return (
    <>
      <SEO title={program.name} description={program.description?.substring(0, 160)} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/programs"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold mb-8"
        >
          <MdArrowBack /> Back to Programs
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image */}
          {program.image ? (
            <img
              src={program.image}
              alt={program.name}
              className="w-full h-64 md:h-80 object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <MdSportsSoccer className="text-8xl text-blue-400" />
            </div>
          )}

          {/* Details */}
          <div className="p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {program.name}
            </h1>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {program.sport && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  <MdSportsSoccer className="text-sm" />
                  {program.sport}
                </span>
              )}
              {program.ageGroup && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                  {program.ageGroup}
                </span>
              )}
              {program.duration && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  <MdAccessTime className="text-sm" />
                  {program.duration}
                </span>
              )}
              {program.fee !== undefined && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                  <MdCurrencyRupee className="text-sm" />
                  {program.fee}
                </span>
              )}
            </div>

            {/* Description */}
            {program.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {program.description}
                </p>
              </div>
            )}

            {/* Coach info */}
            {program.coach && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MdPerson className="text-blue-600" /> Coach
                </h2>
                <p className="text-gray-600">
                  {typeof program.coach === 'object' ? program.coach.name : program.coach}
                </p>
              </div>
            )}

            {/* Schedule preview */}
            {program.schedule && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MdCalendarMonth className="text-blue-600" /> Schedule
                </h2>
                <p className="text-gray-600">{program.schedule}</p>
              </div>
            )}

            {/* Register CTA */}
            <div className="border-t border-gray-100 pt-6 mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="flex-1 text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Register for this Program
              </Link>
              <Link
                to="/schedule"
                className="flex-1 text-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                View Full Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramDetail;
