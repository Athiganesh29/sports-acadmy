import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import MessageTable from '../../components/admin/messages/MessageTable';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/contact');
      setMessages(data.data || []);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <MessageTable messages={messages} loading={loading} />
      </div>
    </>
  );
};

export default MessagesPage;
