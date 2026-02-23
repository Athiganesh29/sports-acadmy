import SEO from '../../components/common/SEO';
import AcademyHistory from '../../components/about/AcademyHistory';
import MissionVision from '../../components/about/MissionVision';
import Achievements from '../../components/about/Achievements';
import Facilities from '../../components/about/Facilities';

const AboutPage = () => {
  return (
    <>
      <SEO title="About Us" description="Learn about Sports Academy - our history, mission, achievements, and world-class facilities." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About Sports Academy
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Building champions since 2008 through dedication, discipline, and world-class coaching.
          </p>
        </div>
      </section>

      <MissionVision />
      <AcademyHistory />
      <Achievements />
      <Facilities />
    </>
  );
};

export default AboutPage;
