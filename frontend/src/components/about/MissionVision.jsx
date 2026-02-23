import { MdFlag, MdVisibility, MdFavorite } from 'react-icons/md';

const cards = [
  {
    icon: MdFlag,
    title: 'Our Mission',
    description:
      'To provide world-class sports training that develops athletic skills, builds character, and instills a lifelong love for sports in every student who walks through our doors.',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    icon: MdVisibility,
    title: 'Our Vision',
    description:
      'To be the leading sports academy in the region, recognized for producing champions on and off the field while fostering an inclusive environment for athletes of all backgrounds.',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    icon: MdFavorite,
    title: 'Our Values',
    description:
      'Discipline, teamwork, integrity, and perseverance. We believe in nurturing the whole athlete - mind, body, and spirit - through structured training and mentorship.',
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
];

const MissionVision = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${card.bg} rounded-full mb-6`}>
                <card.icon className={`text-3xl ${card.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
