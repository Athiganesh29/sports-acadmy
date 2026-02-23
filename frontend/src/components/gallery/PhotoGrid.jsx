import { useState } from 'react';
import { MdImage } from 'react-icons/md';
import Lightbox from './Lightbox';

const PhotoGrid = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12">
        <MdImage className="text-5xl text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No photos available.</p>
      </div>
    );
  }

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo, index) => (
          <div
            key={photo._id || index}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => setLightboxIndex(index)}
          >
            <div className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              {photo.url || photo.image || photo.src ? (
                <img
                  src={photo.url || photo.image || photo.src}
                  alt={photo.title || photo.caption || `Photo ${index + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <MdImage className="text-4xl text-gray-400" />
                </div>
              )}
            </div>
            {(photo.title || photo.caption) && (
              <p className="text-sm text-gray-600 mt-1 px-1 truncate">
                {photo.title || photo.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {lightboxIndex >= 0 && (
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default PhotoGrid;
