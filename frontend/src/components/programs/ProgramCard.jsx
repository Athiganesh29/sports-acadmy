import { Link } from 'react-router-dom';
import { MdSportsSoccer, MdAccessTime, MdCurrencyRupee } from 'react-icons/md';

const ProgramCard = ({ program }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      {program.image ? (
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <MdSportsSoccer className="text-5xl text-blue-400" />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {program.name}
        </h3>

        {program.sport && (
          <p className="text-sm text-gray-500 mb-2">{program.sport}</p>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {program.ageGroup && (
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {program.ageGroup}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {program.fee !== undefined && (
            <span className="flex items-center gap-1">
              <MdCurrencyRupee className="text-green-600" />
              {program.fee}
            </span>
          )}
          {program.duration && (
            <span className="flex items-center gap-1">
              <MdAccessTime className="text-blue-600" />
              {program.duration}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-3">
          <Link
            to={`/programs/${program._id}`}
            className="flex-1 text-center px-4 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Details
          </Link>
          <Link
            to="/register"
            className="flex-1 text-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
