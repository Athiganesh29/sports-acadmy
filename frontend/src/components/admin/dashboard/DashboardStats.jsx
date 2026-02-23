import { useState, useEffect } from 'react';
import { MdPeople, MdSports, MdAssignment, MdEmail } from 'react-icons/md';
import api from '../../../services/api';
import StatCard from '../common/StatCard';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data.data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Coaches',
      value: stats?.totalCoaches || 0,
      icon: MdPeople,
      color: 'blue',
    },
    {
      title: 'Active Programs',
      value: stats?.totalPrograms || 0,
      icon: MdSports,
      color: 'green',
    },
    {
      title: 'Registrations',
      value: stats?.totalRegistrations || 0,
      icon: MdAssignment,
      color: 'purple',
    },
    {
      title: 'Messages',
      value: stats?.totalMessages || 0,
      icon: MdEmail,
      color: 'yellow',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default DashboardStats;
