import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import ScheduleGrid from '../../components/admin/schedule/ScheduleGrid';
import ScheduleEntryForm from '../../components/admin/schedule/ScheduleEntryForm';

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [defaultDay, setDefaultDay] = useState('');
  const [defaultTime, setDefaultTime] = useState('');

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/schedules');
      setSchedule(data.data || []);
    } catch {
      toast.error('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (day, time) => {
    setEditingEntry(null);
    setDefaultDay(day);
    setDefaultTime(time);
    setShowForm(true);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setDefaultDay('');
    setDefaultTime('');
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingEntry) {
        await api.put(`/schedule/${editingEntry._id}`, formData);
        toast.success('Schedule entry updated');
      } else {
        await api.post('/schedules', formData);
        toast.success('Schedule entry added');
      }
      setShowForm(false);
      fetchSchedule();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save schedule entry');
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>

        <ScheduleGrid
          schedule={schedule}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onRefresh={fetchSchedule}
        />

        <ScheduleEntryForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          initialData={editingEntry}
          defaultDay={defaultDay}
          defaultTime={defaultTime}
        />
      </div>
    </>
  );
};

export default SchedulePage;
