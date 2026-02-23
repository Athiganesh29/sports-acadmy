import { MdEmojiEvents, MdMilitaryTech, MdStar, MdGroups, MdSportsScore, MdWorkspacePremium } from 'react-icons/md';

const achievements = [
  { icon: MdEmojiEvents, count: '50+', label: 'State Champions', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { icon: MdMilitaryTech, count: '20+', label: 'National Medalists', color: 'text-blue-600', bg: 'bg-blue-100' },
  { icon: MdStar, count: '5', label: 'Star Ratings', color: 'text-orange-600', bg: 'bg-orange-100' },
  { icon: MdGroups, count: '100+', label: 'Tournament Wins', color: 'text-green-600', bg: 'bg-green-100' },
  { icon: MdSportsScore, count: '30+', label: 'District Titles', color: 'text-purple-600', bg: 'bg-purple-100' },
  { icon: MdWorkspacePremium, count: '10+', label: 'Academy Awards', color: 'text-red-600', bg: 'bg-red-100' },
];

const Achievements = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Our Achievements
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A proud record of excellence across multiple sports and competitions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 ${item.bg} rounded-full mb-4`}>
                <item.icon className={`text-2xl ${item.color}`} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                {item.count}
              </h3>
              <p className="text-gray-600 font-medium text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
