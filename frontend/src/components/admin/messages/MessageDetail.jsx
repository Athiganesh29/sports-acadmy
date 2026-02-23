import { useState, useEffect } from 'react';
import { MdPerson, MdEmail, MdPhone, MdSend } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../../services/api';

const MessageDetail = ({ message, onRefresh }) => {
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (message && !message.isRead) {
      markAsRead();
    }
  }, [message]);

  const markAsRead = async () => {
    try {
      await api.get(`/contact/${message._id}`);
      if (onRefresh) onRefresh();
    } catch {
      // Silently fail for read status
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    setSending(true);
    try {
      await api.post(`/contact/${message._id}/reply`, { message: reply });
      toast.success('Reply sent successfully');
      setReply('');
    } catch {
      toast.error('Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  if (!message) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        Message not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {message.subject || 'No Subject'}
          </h2>
          <span className="text-sm text-gray-500">
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Sender info */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MdPerson className="text-gray-400" />
            <span>{message.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MdEmail className="text-gray-400" />
            <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
              {message.email}
            </a>
          </div>
          {message.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MdPhone className="text-gray-400" />
              <span>{message.phone}</span>
            </div>
          )}
        </div>

        {/* Message body */}
        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
          {message.message}
        </div>
      </div>

      {/* Reply form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reply</h3>
        <form onSubmit={handleReply} className="space-y-4">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={5}
            placeholder="Type your reply..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending || !reply.trim()}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <MdSend className="text-lg" />
              <span>{sending ? 'Sending...' : 'Send Reply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageDetail;
