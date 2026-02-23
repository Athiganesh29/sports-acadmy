import ProgramCard from './ProgramCard';

const ProgramList = ({ programs }) => {
  if (!programs || programs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No programs found for the selected filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program._id} program={program} />
      ))}
    </div>
  );
};

export default ProgramList;
