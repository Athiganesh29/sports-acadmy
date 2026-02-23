import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import MessageDetail from '../../components/admin/messages/MessageDetail';

const MessageDetailPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/contact/${id}`);
      setMessage(data.data);
    } catch {
      toast.error('Failed to load message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/messages"
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MdArrowBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Message Details</h1>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-32 bg-gray-200 rounded w-full" />
          </div>
        ) : (
          <MessageDetail message={message} onRefresh={fetchMessage} />
        )}
      </div>
    </>
  );
};

export default MessageDetailPage;
