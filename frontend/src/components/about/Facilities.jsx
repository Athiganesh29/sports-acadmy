import { MdPool, MdSportsTennis, MdSportsCricket, MdFitnessCenter, MdStadium, MdSportsSoccer } from 'react-icons/md';

const facilities = [
  {
    icon: MdStadium,
    name: 'Olympic-size Track',
    description: 'A 400m synthetic track with 8 lanes, ideal for athletics training and inter-school meets.',
  },
  {
    icon: MdPool,
    name: 'Swimming Pool',
    description: '25m temperature-controlled pool with separate lanes for training and recreational swimming.',
  },
  {
    icon: MdSportsTennis,
    name: 'Indoor Courts',
    description: 'Multi-purpose indoor courts for badminton, table tennis, and basketball with professional-grade flooring.',
  },
  {
    icon: MdSportsCricket,
    name: 'Cricket Nets & Ground',
    description: 'Full-size cricket ground with practice nets, bowling machines, and flood lights for evening sessions.',
  },
  {
    icon: MdFitnessCenter,
    name: 'Fitness Center',
    description: 'State-of-the-art gym equipped with cardio machines, free weights, and dedicated stretching areas.',
  },
  {
    icon: MdSportsSoccer,
    name: 'Football Field',
    description: 'FIFA-standard turf field with goalposts, seating, and night lighting for year-round play.',
  },
];

const Facilities = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            World-Class Facilities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Train like a champion with our top-tier infrastructure and equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.name}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <facility.icon className="text-6xl text-blue-400" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {facility.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
