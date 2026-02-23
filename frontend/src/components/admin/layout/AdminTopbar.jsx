import { MdMenu, MdLogout, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import * as authService from '../../../services/authService';

const AdminTopbar = ({ onMenuClick }) => {
  const { admin, setAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      setAdmin(null);
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200 shadow-sm">
      {/* Left: Hamburger (mobile) + Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <MdMenu className="text-2xl" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
      </div>

      {/* Right: Admin info + Logout */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {admin?.avatar ? (
            <img
              src={admin.avatar}
              alt={admin.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <MdPerson className="text-white text-lg" />
            </div>
          )}
          <span className="hidden md:inline text-sm font-medium text-gray-700">
            {admin?.name || 'Admin'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <MdLogout className="text-xl" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
