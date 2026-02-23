import { GALLERY_CATEGORIES } from '../../utils/constants';

const typeOptions = [
  { label: 'All', value: '' },
  { label: 'Photos', value: 'photo' },
  { label: 'Videos', value: 'video' },
];

const GalleryFilter = ({ selectedType, selectedCategory, onTypeChange, onCategoryChange }) => {
  return (
    <div className="space-y-4">
      {/* Type filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Type</h3>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTypeChange(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                selectedType === option.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryFilter;
