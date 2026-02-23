import { Link } from 'react-router-dom';
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Register', path: '/register' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, url: '#' },
    { name: 'Instagram', icon: FaInstagram, url: '#' },
    { name: 'Twitter', icon: FaTwitter, url: '#' },
    { name: 'YouTube', icon: FaYoutube, url: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="text-blue-400">Sports</span> Academy
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Nurturing champions through world-class coaching, state-of-the-art
              facilities, and a passion for sporting excellence. Join us and
              unlock your true athletic potential.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-green-400 text-sm transition-colors duration-200"
                >
                  <FaWhatsapp className="text-lg flex-shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  <MdPhone className="text-lg flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sportsacademy.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  <MdEmail className="text-lg flex-shrink-0" />
                  <span>info@sportsacademy.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-gray-400 text-sm">
                  <MdLocationOn className="text-lg flex-shrink-0 mt-0.5" />
                  <span>123 Sports Avenue, Chennai, Tamil Nadu, India</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Stay connected and follow our journey on social media.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
            <p>&copy; {currentYear} Sports Academy. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <Link
                to="/privacy"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
