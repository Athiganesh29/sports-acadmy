import { Link } from 'react-router-dom';
import { MdSentimentDissatisfied } from 'react-icons/md';
import SEO from '../../components/common/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <MdSentimentDissatisfied className="text-8xl text-gray-300 mx-auto mb-6" />
          <h1 className="text-6xl sm:text-8xl font-extrabold text-blue-600 mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
            Let us get you back on track.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
