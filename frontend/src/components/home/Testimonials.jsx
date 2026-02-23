import { useState, useEffect } from 'react';
import { MdStar, MdStarBorder, MdChevronLeft, MdChevronRight, MdFormatQuote } from 'react-icons/md';
import useFetch from '../../hooks/useFetch';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        star <= rating ? (
          <MdStar key={star} className="text-yellow-400 text-xl" />
        ) : (
          <MdStarBorder key={star} className="text-yellow-400 text-xl" />
        )
      ))}
    </div>
  );
};

const Testimonials = () => {
  const { data, loading, error } = useFetch('/testimonials?active=true');
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = data || [];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Parents Say</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            What Parents Say
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from the families who trust us with their children&apos;s athletic journey.
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 md:p-12">
          <MdFormatQuote className="absolute top-6 left-6 text-5xl text-blue-200" />

          <div className="text-center">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 italic relative z-10">
              &ldquo;{current.message || current.content}&rdquo;
            </p>

            <StarRating rating={current.rating || 5} />

            <div className="mt-4">
              <p className="font-bold text-gray-900 text-lg">
                {current.parentName || current.name}
              </p>
              {current.studentName && (
                <p className="text-gray-500 text-sm">
                  Parent of {current.studentName}
                </p>
              )}
            </div>
          </div>

          {/* Navigation arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <MdChevronLeft className="text-2xl text-gray-600" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <MdChevronRight className="text-2xl text-gray-600" />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
