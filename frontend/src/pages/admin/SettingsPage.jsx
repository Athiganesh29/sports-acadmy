import { useState } from 'react';
import ProfileSettings from '../../components/admin/settings/ProfileSettings';
import ChangePassword from '../../components/admin/settings/ChangePassword';
import SiteSettings from '../../components/admin/settings/SiteSettings';
import ManageAdmins from '../../components/admin/settings/ManageAdmins';

const tabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'password', label: 'Password' },
  { key: 'site', label: 'Site Settings' },
  { key: 'admins', label: 'Manage Admins' },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'password':
        return <ChangePassword />;
      case 'site':
        return <SiteSettings />;
      case 'admins':
        return <ManageAdmins />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Settings tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  pb-3 px-1 text-sm font-medium border-b-2 whitespace-nowrap transition-colors
                  ${activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        {renderTab()}
      </div>
    </>
  );
};

export default SettingsPage;
