import { useState, useEffect } from 'react';
import api from '../../../services/api';

const RegistrationChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const { data } = await api.get('/dashboard/chart');
        setChartData(data.data || []);
      } catch {
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChart();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="flex items-end space-x-4 h-40">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-200 rounded-t"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map((d) => d.count || 0), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Registration Trends</h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-sm">No chart data available.</p>
      ) : (
        <div className="flex items-end justify-between space-x-2 h-48">
          {chartData.map((item, index) => {
            const heightPercent = ((item.count || 0) / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <span className="text-xs font-medium text-gray-700 mb-1">
                  {item.count || 0}
                </span>
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors min-h-[4px]"
                  style={{ height: `${Math.max(heightPercent, 2)}%` }}
                  title={`${item.month || item.label}: ${item.count || 0}`}
                />
                <span className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                  {item.month || item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RegistrationChart;
