import SEO from '../../components/common/SEO';
import RegistrationForm from '../../components/registration/RegistrationForm';

const RegisterPage = () => {
  return (
    <>
      <SEO title="Register" description="Register your child at Sports Academy. Simple 4-step enrollment process." />

      {/* Page header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Student Registration
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Complete the form below to enroll in our sports training programs.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
