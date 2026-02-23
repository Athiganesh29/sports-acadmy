import { AGE_GROUPS } from '../../utils/constants';

const AgeGroupFilter = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
          selected === ''
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All Ages
      </button>
      {AGE_GROUPS.map((group) => (
        <button
          key={group}
          onClick={() => onSelect(group)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
            selected === group
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {group}
        </button>
      ))}
    </div>
  );
};

export default AgeGroupFilter;
