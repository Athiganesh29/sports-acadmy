import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import ScrollToTop from '../components/common/ScrollToTop';

import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import CoachesPage from '../pages/public/CoachesPage';
import CoachDetailPage from '../pages/public/CoachDetailPage';
import ProgramsPage from '../pages/public/ProgramsPage';
import ProgramDetailPage from '../pages/public/ProgramDetailPage';
import SchedulePage from '../pages/public/SchedulePage';
import GalleryPage from '../pages/public/GalleryPage';
import RegisterPage from '../pages/public/RegisterPage';
import ContactPage from '../pages/public/ContactPage';
import BlogPage from '../pages/public/BlogPage';
import BlogPostPage from '../pages/public/BlogPostPage';
import NotFoundPage from '../pages/public/NotFoundPage';

const PublicRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/coaches" element={<CoachesPage />} />
          <Route path="/coaches/:id" element={<CoachDetailPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default PublicRoutes;
