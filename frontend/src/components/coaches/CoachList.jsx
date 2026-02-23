import CoachCard from './CoachCard';

const CoachList = ({ coaches }) => {
  if (!coaches || coaches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No coaches found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coaches.map((coach) => (
        <CoachCard key={coach._id} coach={coach} />
      ))}
    </div>
  );
};

export default CoachList;
