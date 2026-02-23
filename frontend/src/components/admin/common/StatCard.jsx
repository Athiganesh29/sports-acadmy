const colorMap = {
  blue: 'border-blue-500 bg-blue-50 text-blue-600',
  green: 'border-green-500 bg-green-50 text-green-600',
  yellow: 'border-yellow-500 bg-yellow-50 text-yellow-600',
  red: 'border-red-500 bg-red-50 text-red-600',
  purple: 'border-purple-500 bg-purple-50 text-purple-600',
  indigo: 'border-indigo-500 bg-indigo-50 text-indigo-600',
};

const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colors = colorMap[color] || colorMap.blue;
  const borderColor = colors.split(' ')[0];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-full ${colors}`}>
            <Icon className="text-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
