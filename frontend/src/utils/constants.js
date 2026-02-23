export const API_URL = import.meta.env.VITE_API_URL || '';

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

export const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

export const AGE_GROUPS = [
  'Kids (5-8)',
  'Juniors (9-13)',
  'Teens (14-17)',
  'Adults (18+)',
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const GALLERY_CATEGORIES = ['events', 'training', 'tournaments', 'facilities'];

export const REGISTRATION_STATUS = ['Pending', 'Confirmed', 'Cancelled'];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Coaches', path: '/coaches' },
  { name: 'Programs', path: '/programs' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'MdDashboard' },
  { name: 'Coaches', path: '/admin/coaches', icon: 'MdPeople' },
  { name: 'Programs', path: '/admin/programs', icon: 'MdSports' },
  { name: 'Schedule', path: '/admin/schedule', icon: 'MdSchedule' },
  { name: 'Registrations', path: '/admin/registrations', icon: 'MdAssignment' },
  { name: 'Gallery', path: '/admin/gallery', icon: 'MdPhotoLibrary' },
  { name: 'Messages', path: '/admin/messages', icon: 'MdEmail' },
  { name: 'Blog', path: '/admin/blogs', icon: 'MdArticle' },
  { name: 'Testimonials', path: '/admin/testimonials', icon: 'MdStar' },
  { name: 'Settings', path: '/admin/settings', icon: 'MdSettings' },
];
