import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 min-h-[600px] flex items-center">
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Welcome to{' '}
          <span className="text-yellow-400">Sports Academy</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
          Unlock your athletic potential with world-class coaching,
          state-of-the-art facilities, and a community that inspires excellence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 bg-yellow-400 text-blue-900 text-lg font-bold rounded-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Register Now
          </Link>
          <Link
            to="/programs"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            Explore Programs
          </Link>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;
