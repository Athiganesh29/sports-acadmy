import SEO from '../../components/common/SEO';
import HeroBanner from '../../components/home/HeroBanner';
import Highlights from '../../components/home/Highlights';
import FeaturedPrograms from '../../components/home/FeaturedPrograms';
import Testimonials from '../../components/home/Testimonials';

const HomePage = () => {
  return (
    <>
      <SEO title="Home" description="Sports Academy - Premier sports training for all ages. Join 500+ students across 10+ sports disciplines." />
      <HeroBanner />
      <Highlights />
      <FeaturedPrograms />
      <Testimonials />
    </>
  );
};

export default HomePage;
