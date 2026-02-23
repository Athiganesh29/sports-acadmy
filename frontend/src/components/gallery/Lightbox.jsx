import { useEffect, useCallback } from 'react';
import { MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  if (!images || images.length === 0 || currentIndex < 0) return null;

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        aria-label="Close lightbox"
      >
        <MdClose className="text-3xl text-white" />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          aria-label="Previous image"
        >
          <MdChevronLeft className="text-3xl text-white" />
        </button>
      )}

      {/* Image */}
      <div className="max-w-5xl max-h-[90vh] px-12">
        <img
          src={current.url || current.image || current.src}
          alt={current.title || current.caption || `Image ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain mx-auto rounded"
        />
        {(current.title || current.caption) && (
          <p className="text-white text-center mt-3 text-sm">
            {current.title || current.caption}
          </p>
        )}
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          aria-label="Next image"
        >
          <MdChevronRight className="text-3xl text-white" />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
