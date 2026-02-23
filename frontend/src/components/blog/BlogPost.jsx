import { useParams, Link } from 'react-router-dom';
import { MdArrowBack, MdCalendarToday, MdArticle } from 'react-icons/md';
import useFetch from '../../hooks/useFetch';
import SEO from '../common/SEO';

const BlogPost = () => {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(`/blogs/${slug}`);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-6">The blog post you are looking for does not exist.</p>
        <Link to="/blog" className="text-blue-600 hover:underline font-semibold">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  const blog = data;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <SEO title={blog.title} description={blog.excerpt || blog.summary} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold mb-8"
        >
          <MdArrowBack /> Back to Blog
        </Link>

        <article>
          {/* Featured Image */}
          {blog.image || blog.coverImage ? (
            <img
              src={blog.image || blog.coverImage}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
          ) : (
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-xl mb-8">
              <MdArticle className="text-8xl text-blue-400" />
            </div>
          )}

          {/* Date */}
          {formattedDate && (
            <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
              <MdCalendarToday className="text-sm" />
              {formattedDate}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content || blog.body || '' }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  );
};

export default BlogPost;
