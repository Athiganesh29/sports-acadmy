import { Link } from 'react-router-dom';
import { MdCalendarToday, MdArticle } from 'react-icons/md';

const BlogCard = ({ blog }) => {
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const slug = blog.slug || blog._id;

  return (
    <Link
      to={`/blog/${slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      {blog.image || blog.coverImage ? (
        <img
          src={blog.image || blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <MdArticle className="text-5xl text-blue-400" />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {formattedDate && (
          <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
            <MdCalendarToday className="text-xs" />
            {formattedDate}
          </div>
        )}

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
          {blog.title}
        </h3>

        {(blog.excerpt || blog.summary) && (
          <p className="text-gray-500 text-sm line-clamp-3 flex-1">
            {blog.excerpt || blog.summary}
          </p>
        )}

        <p className="mt-4 text-blue-600 font-semibold text-sm group-hover:underline">
          Read More &rarr;
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
