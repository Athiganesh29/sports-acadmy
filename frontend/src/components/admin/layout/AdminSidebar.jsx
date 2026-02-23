import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdSports,
  MdSchedule,
  MdAssignment,
  MdPhotoLibrary,
  MdEmail,
  MdArticle,
  MdStar,
  MdSettings,
  MdClose,
} from 'react-icons/md';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/admin/coaches', label: 'Coaches', icon: MdPeople },
  { path: '/admin/programs', label: 'Programs', icon: MdSports },
  { path: '/admin/schedule', label: 'Schedule', icon: MdSchedule },
  { path: '/admin/registrations', label: 'Registrations', icon: MdAssignment },
  { path: '/admin/gallery', label: 'Gallery', icon: MdPhotoLibrary },
  { path: '/admin/messages', label: 'Messages', icon: MdEmail },
  { path: '/admin/blogs', label: 'Blogs', icon: MdArticle },
  { path: '/admin/testimonials', label: 'Testimonials', icon: MdStar },
  { path: '/admin/settings', label: 'Settings', icon: MdSettings },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo / Academy name */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <MdSports className="text-2xl text-blue-400" />
          <span className="text-lg font-bold tracking-wide">Sports Academy</span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
              `}
            >
              <Icon className="text-xl flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
