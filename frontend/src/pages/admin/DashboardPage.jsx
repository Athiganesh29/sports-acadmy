import DashboardStats from '../../components/admin/dashboard/DashboardStats';
import RecentRegistrations from '../../components/admin/dashboard/RecentRegistrations';
import RegistrationChart from '../../components/admin/dashboard/RegistrationChart';

const DashboardPage = () => {
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Charts + Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegistrationChart />
          <RecentRegistrations />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
