import { useParams, Link } from 'react-router-dom';
import { MdPerson, MdArrowBack, MdEmail, MdPhone, MdSportsSoccer, MdWorkHistory, MdVerified } from 'react-icons/md';
import useFetch from '../../hooks/useFetch';
import SEO from '../common/SEO';

const CoachDetail = () => {
  const { id } = useParams();
  const { data: coach, loading, error } = useFetch(`/coaches/${id}`);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-8" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 h-80 bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !coach) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Coach Not Found</h2>
        <p className="text-gray-600 mb-6">The coach profile you are looking for does not exist.</p>
        <Link to="/coaches" className="text-blue-600 hover:underline font-semibold">
          &larr; Back to Coaches
        </Link>
      </div>
    );
  }

  const coachData = coach;

  return (
    <>
      <SEO title={coachData.name} description={coachData.bio?.substring(0, 160)} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/coaches"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold mb-8"
        >
          <MdArrowBack /> Back to Coaches
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Photo */}
            <div className="w-full md:w-1/3">
              {coachData.photo ? (
                <img
                  src={coachData.photo}
                  alt={coachData.name}
                  className="w-full h-80 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-80 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <MdPerson className="text-8xl text-gray-400" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 p-6 md:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {coachData.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  <MdSportsSoccer className="text-sm" />
                  {coachData.sport || coachData.specialization}
                </span>
                {coachData.experience && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    <MdWorkHistory className="text-sm" />
                    {coachData.experience} years
                  </span>
                )}
              </div>

              {/* Bio */}
              {coachData.bio && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-600 leading-relaxed">{coachData.bio}</p>
                </div>
              )}

              {/* Certifications */}
              {coachData.certifications && coachData.certifications.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Certifications</h2>
                  <ul className="space-y-2">
                    {coachData.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <MdVerified className="text-blue-500 flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact */}
              <div className="border-t border-gray-100 pt-6 space-y-2">
                {coachData.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MdEmail className="text-blue-500" />
                    <a href={`mailto:${coachData.email}`} className="hover:text-blue-600">
                      {coachData.email}
                    </a>
                  </div>
                )}
                {coachData.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MdPhone className="text-blue-500" />
                    <a href={`tel:${coachData.phone}`} className="hover:text-blue-600">
                      {coachData.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDetail;
