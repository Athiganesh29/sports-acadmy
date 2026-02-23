import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../components/admin/layout/AdminLayout';

import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import CoachesPage from '../pages/admin/CoachesPage';
import CoachFormPage from '../pages/admin/CoachFormPage';
import ProgramsPage from '../pages/admin/ProgramsPage';
import ProgramFormPage from '../pages/admin/ProgramFormPage';
import SchedulePage from '../pages/admin/SchedulePage';
import RegistrationsPage from '../pages/admin/RegistrationsPage';
import RegistrationDetailPage from '../pages/admin/RegistrationDetailPage';
import GalleryPage from '../pages/admin/GalleryPage';
import MessagesPage from '../pages/admin/MessagesPage';
import MessageDetailPage from '../pages/admin/MessageDetailPage';
import BlogsPage from '../pages/admin/BlogsPage';
import BlogFormPage from '../pages/admin/BlogFormPage';
import TestimonialsPage from '../pages/admin/TestimonialsPage';
import SettingsPage from '../pages/admin/SettingsPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/coaches" element={<CoachesPage />} />
                <Route path="/coaches/new" element={<CoachFormPage />} />
                <Route path="/coaches/:id/edit" element={<CoachFormPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/new" element={<ProgramFormPage />} />
                <Route path="/programs/:id/edit" element={<ProgramFormPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/registrations" element={<RegistrationsPage />} />
                <Route path="/registrations/:id" element={<RegistrationDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/messages/:id" element={<MessageDetailPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/new" element={<BlogFormPage />} />
                <Route path="/blogs/:id/edit" element={<BlogFormPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
