import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import GalleryGrid from '../../components/admin/gallery/GalleryGrid';
import MediaUploadForm from '../../components/admin/gallery/MediaUploadForm';

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/gallery');
      setItems(data.data || []);
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>

        <MediaUploadForm onSuccess={fetchGallery} />

        <GalleryGrid items={items} loading={loading} onRefresh={fetchGallery} />
      </div>
    </>
  );
};

export default GalleryPage;
