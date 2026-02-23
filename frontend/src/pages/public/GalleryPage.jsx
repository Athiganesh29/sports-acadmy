import { useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import PhotoGrid from '../../components/gallery/PhotoGrid';
import VideoGrid from '../../components/gallery/VideoGrid';
import GalleryFilter from '../../components/gallery/GalleryFilter';
import useFetch from '../../hooks/useFetch';

const GalleryPage = () => {
  const { data, loading, error } = useFetch('/gallery');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const galleryItems = data || [];

  // Filtered items
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchType = !selectedType || item.type === selectedType;
      const matchCategory = !selectedCategory || item.category === selectedCategory;
      return matchType && matchCategory;
    });
  }, [galleryItems, selectedType, selectedCategory]);

  const photos = filteredItems.filter((item) => item.type === 'photo');
  const videos = filteredItems.filter((item) => item.type === 'video');

  const showPhotos = !selectedType || selectedType === 'photo';
  const showVideos = !selectedType || selectedType === 'video';

  return (
    <>
      <SEO title="Gallery" description="Browse photos and videos from Sports Academy events, training sessions, and tournaments." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Gallery
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Relive the best moments from our academy through photos and videos.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8">
            <GalleryFilter
              selectedType={selectedType}
              selectedCategory={selectedCategory}
              onTypeChange={setSelectedType}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg animate-pulse" style={{ height: `${150 + Math.random() * 100}px` }} />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Gallery content */}
          {!loading && !error && (
            <div className="space-y-12">
              {showPhotos && photos.length > 0 && (
                <div>
                  {selectedType === '' && (
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Photos</h2>
                  )}
                  <PhotoGrid photos={photos} />
                </div>
              )}

              {showVideos && videos.length > 0 && (
                <div>
                  {selectedType === '' && (
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Videos</h2>
                  )}
                  <VideoGrid videos={videos} />
                </div>
              )}

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No gallery items found for the selected filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
