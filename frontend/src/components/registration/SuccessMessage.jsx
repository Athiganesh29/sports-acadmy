import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

const SuccessMessage = ({ registrationId }) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <MdCheckCircle className="text-5xl text-green-600" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Registration Successful!
      </h2>

      <p className="text-gray-600 text-lg mb-2 max-w-md mx-auto">
        Your registration has been submitted successfully. We will contact you shortly with further details.
      </p>

      {registrationId && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg inline-block px-6 py-3 mb-6">
          <p className="text-sm text-gray-500">Registration ID</p>
          <p className="text-lg font-bold text-blue-700">{registrationId}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
        <Link
          to="/"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Back to Home
        </Link>
        <Link
          to="/programs"
          className="px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          View Programs
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;
