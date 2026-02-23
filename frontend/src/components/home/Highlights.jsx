import { MdSchool, MdAccessTime, MdSportsSoccer, MdPeople } from 'react-icons/md';

const stats = [
  { icon: MdSchool, count: '500+', label: 'Students', color: 'text-blue-600', bg: 'bg-blue-100' },
  { icon: MdAccessTime, count: '15+', label: 'Years', color: 'text-green-600', bg: 'bg-green-100' },
  { icon: MdSportsSoccer, count: '10+', label: 'Sports', color: 'text-orange-600', bg: 'bg-orange-100' },
  { icon: MdPeople, count: '20+', label: 'Coaches', color: 'text-purple-600', bg: 'bg-purple-100' },
];

const Highlights = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bg} rounded-full mb-4`}>
                <stat.icon className={`text-3xl ${stat.color}`} />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
                {stat.count}
              </h3>
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
