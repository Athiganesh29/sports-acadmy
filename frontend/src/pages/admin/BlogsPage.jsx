import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import BlogTable from '../../components/admin/blogs/BlogTable';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/blogs/all');
      setBlogs(data.data || []);
    } catch {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <Link
            to="/admin/blogs/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdAdd className="text-lg" />
            <span>Add Post</span>
          </Link>
        </div>

        <BlogTable blogs={blogs} loading={loading} onRefresh={fetchBlogs} />
      </div>
    </>
  );
};

export default BlogsPage;
