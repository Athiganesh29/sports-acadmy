import BlogPost from '../../components/blog/BlogPost';
import SEO from '../../components/common/SEO';

const BlogPostPage = () => {
  return (
    <>
      <SEO title="Blog Post" description="Read our latest news and articles" />
      <BlogPost />
    </>
  );
};

export default BlogPostPage;
