import SEO from '../../components/common/SEO';
import BlogList from '../../components/blog/BlogList';
import useFetch from '../../hooks/useFetch';

const BlogPage = () => {
  const { data, loading, error } = useFetch('/blogs?status=published');

  const blogs = data || [];

  return (
    <>
      <SEO title="Blog" description="Read the latest news, tips, and stories from Sports Academy." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, training tips, and stories from the academy.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Blog list */}
          {!loading && !error && <BlogList blogs={blogs} />}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
