const milestones = [
  { year: '2008', title: 'Foundation', description: 'Sports Academy was founded with a vision to nurture young athletic talent in the community.' },
  { year: '2010', title: 'First Championship', description: 'Our students won their first state-level championship in athletics, marking a major milestone.' },
  { year: '2013', title: 'Campus Expansion', description: 'Expanded to a full-scale campus with indoor courts, swimming pool, and multi-sport facilities.' },
  { year: '2016', title: 'National Recognition', description: 'Received national accreditation as a premier sports training academy with certified coaching staff.' },
  { year: '2019', title: 'International Programs', description: 'Launched international exchange programs and hosted coaches from around the world.' },
  { year: '2022', title: '500+ Students Milestone', description: 'Crossed 500 active students across 10+ sports disciplines with a 95% parent satisfaction rate.' },
  { year: '2024', title: 'Digital Transformation', description: 'Launched online registration, live scheduling, and a parent portal for seamless communication.' },
];

const AcademyHistory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Our Journey
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A timeline of milestones that shaped Sports Academy into what it is today.
          </p>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-blue-200 hidden md:block" />
          <div className="absolute left-4 w-1 h-full bg-blue-200 md:hidden" />

          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={milestone.year} className="relative flex items-start">
                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <div className="ml-6 bg-gray-50 rounded-lg p-5 shadow-sm flex-1">
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Desktop layout - alternating */}
                  <div className="hidden md:flex items-center w-full">
                    {isLeft ? (
                      <>
                        <div className="w-5/12 text-right pr-8">
                          <div className="bg-gray-50 rounded-lg p-6 shadow-sm inline-block text-left">
                            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
                              {milestone.year}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{milestone.title}</h3>
                            <p className="text-gray-600 text-sm">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                        <div className="w-5/12" />
                      </>
                    ) : (
                      <>
                        <div className="w-5/12" />
                        <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                        <div className="w-5/12 pl-8">
                          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
                              {milestone.year}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{milestone.title}</h3>
                            <p className="text-gray-600 text-sm">{milestone.description}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyHistory;
