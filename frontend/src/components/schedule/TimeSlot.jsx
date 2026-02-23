const TimeSlot = ({ slot }) => {
  if (!slot) {
    return (
      <td className="border border-gray-200 p-2 bg-gray-50 text-center text-xs text-gray-400">
        &mdash;
      </td>
    );
  }

  return (
    <td className="border border-gray-200 p-2 bg-blue-50 hover:bg-blue-100 transition-colors">
      <div className="text-xs font-semibold text-blue-800">
        {slot.startTime} - {slot.endTime}
      </div>
      <div className="text-sm font-bold text-gray-900 mt-0.5">
        {slot.program?.name || slot.programName || 'Program'}
      </div>
      {(slot.coach?.name || slot.coachName) && (
        <div className="text-xs text-gray-500 mt-0.5">
          {slot.coach?.name || slot.coachName}
        </div>
      )}
      {(slot.venue || slot.location) && (
        <div className="text-xs text-gray-400 mt-0.5">
          {slot.venue || slot.location}
        </div>
      )}
    </td>
  );
};

export default TimeSlot;
