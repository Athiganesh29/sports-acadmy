import { useState } from 'react';
import { MdPlayCircle, MdClose, MdVideocam } from 'react-icons/md';

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const getYouTubeThumbnail = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

const VideoGrid = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <MdVideocam className="text-5xl text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No videos available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => {
          const thumbnail =
            video.thumbnail || getYouTubeThumbnail(video.url || video.videoUrl);
          const videoId = getYouTubeId(video.url || video.videoUrl);

          return (
            <div
              key={video._id || index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              onClick={() => setActiveVideo(video)}
            >
              <div className="relative">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={video.title || `Video ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <MdVideocam className="text-5xl text-gray-400" />
                  </div>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MdPlayCircle className="text-6xl text-white drop-shadow-lg" />
                </div>
              </div>
              {video.title && (
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Close video"
          >
            <MdClose className="text-3xl text-white" />
          </button>
          <div className="w-full max-w-4xl aspect-video">
            {getYouTubeId(activeVideo.url || activeVideo.videoUrl) ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(
                  activeVideo.url || activeVideo.videoUrl
                )}?autoplay=1`}
                title={activeVideo.title || 'Video'}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={activeVideo.url || activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGrid;
