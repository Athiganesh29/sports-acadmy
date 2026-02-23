import { MdSportsSoccer, MdAccessTime, MdCurrencyRupee } from 'react-icons/md';
import useFetch from '../../hooks/useFetch';

const ProgramSelection = ({ formData, onChange }) => {
  const { data, loading, error } = useFetch('/programs');
  const programs = data || [];

  const selectedProgram = programs.find((p) => p._id === formData.programId);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        <MdSportsSoccer className="text-blue-600" />
        Program Selection
      </h2>
      <p className="text-gray-500 text-sm mb-6">Step 3 of 4 &mdash; Select the program to enroll in</p>

      <div className="space-y-4">
        {/* Program Dropdown */}
        <div>
          <label htmlFor="programId" className="block text-sm font-medium text-gray-700 mb-1">
            Select Program <span className="text-red-500">*</span>
          </label>
          {loading ? (
            <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse" />
          ) : error ? (
            <p className="text-red-500 text-sm">Failed to load programs. Please try again.</p>
          ) : (
            <select
              id="programId"
              name="programId"
              value={formData.programId || ''}
              onChange={onChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              <option value="">-- Choose a program --</option>
              {programs.map((program) => (
                <option key={program._id} value={program._id}>
                  {program.name} {program.ageGroup ? `(${program.ageGroup})` : ''}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Selected program info */}
        {selectedProgram && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 text-lg mb-3">{selectedProgram.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {selectedProgram.sport && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MdSportsSoccer className="text-blue-500" />
                  <span><strong>Sport:</strong> {selectedProgram.sport}</span>
                </div>
              )}
              {selectedProgram.ageGroup && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-xs font-bold">A</span>
                  <span><strong>Age Group:</strong> {selectedProgram.ageGroup}</span>
                </div>
              )}
              {selectedProgram.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MdAccessTime className="text-blue-500" />
                  <span><strong>Duration:</strong> {selectedProgram.duration}</span>
                </div>
              )}
              {selectedProgram.fee !== undefined && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MdCurrencyRupee className="text-green-500" />
                  <span><strong>Fee:</strong> {selectedProgram.fee}</span>
                </div>
              )}
            </div>
            {selectedProgram.description && (
              <p className="mt-3 text-gray-500 text-sm">{selectedProgram.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramSelection;
