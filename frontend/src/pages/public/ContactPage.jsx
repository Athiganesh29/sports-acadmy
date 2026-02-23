import SEO from '../../components/common/SEO';
import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';
import GoogleMap from '../../components/contact/GoogleMap';

const ContactPage = () => {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with Sports Academy. We are here to answer your questions." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Have questions? We would love to hear from you. Reach out anytime.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <ContactInfo />
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
            <GoogleMap />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
