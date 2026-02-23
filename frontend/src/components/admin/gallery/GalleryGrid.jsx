import { MdDelete, MdPlayCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';

const GalleryGrid = ({ items, loading, onRefresh }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Media deleted successfully');
      onRefresh();
    } catch {
      toast.error('Failed to delete media');
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        No media items found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
        >
          {item.type === 'video' ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70"
                />
              ) : null}
              <MdPlayCircle className="absolute text-5xl text-white opacity-80" />
            </div>
          ) : (
            <img
              src={item.url || item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-end">
            <div className="w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
              <p className="text-white text-sm font-medium truncate">{item.title}</p>
              <p className="text-white text-xs opacity-75 capitalize">{item.category}</p>
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => handleDelete(item._id)}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all duration-200 shadow-lg"
            title="Delete"
          >
            <MdDelete className="text-sm" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
