import { Link } from 'react-router-dom';
import { MdPerson, MdSportsSoccer, MdWorkHistory } from 'react-icons/md';

const CoachCard = ({ coach }) => {
  return (
    <Link
      to={`/coaches/${coach._id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Photo */}
      {coach.photo ? (
        <img
          src={coach.photo}
          alt={coach.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <MdPerson className="text-7xl text-gray-400" />
        </div>
      )}

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {coach.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <MdSportsSoccer className="text-blue-500 text-sm" />
          <span className="text-sm text-gray-600">{coach.sport || coach.specialization}</span>
        </div>

        {coach.experience && (
          <div className="flex items-center gap-2 mb-3">
            <MdWorkHistory className="text-green-500 text-sm" />
            <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              {coach.experience} years experience
            </span>
          </div>
        )}

        {coach.bio && (
          <p className="text-gray-500 text-sm line-clamp-2">
            {coach.bio}
          </p>
        )}

        <p className="mt-3 text-blue-600 font-semibold text-sm group-hover:underline">
          View Profile &rarr;
        </p>
      </div>
    </Link>
  );
};

export default CoachCard;
