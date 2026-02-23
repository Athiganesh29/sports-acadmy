import { useState } from 'react';
import { MdPerson, MdFamilyRestroom, MdSportsSoccer, MdCheckCircle } from 'react-icons/md';
import api from '../../services/api';
import useForm from '../../hooks/useForm';
import StudentDetails from './StudentDetails';
import ParentDetails from './ParentDetails';
import ProgramSelection from './ProgramSelection';
import ReviewSubmit from './ReviewSubmit';
import SuccessMessage from './SuccessMessage';

const steps = [
  { number: 1, label: 'Student', icon: MdPerson },
  { number: 2, label: 'Parent', icon: MdFamilyRestroom },
  { number: 3, label: 'Program', icon: MdSportsSoccer },
  { number: 4, label: 'Review', icon: MdCheckCircle },
];

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [registrationId, setRegistrationId] = useState(null);

  const { values: formData, handleChange, setFieldValue } = useForm({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    photo: null,
    parentName: '',
    relationship: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    programId: '',
  });

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.gender;
      case 2:
        return (
          formData.parentName &&
          formData.relationship &&
          formData.parentPhone &&
          formData.parentEmail &&
          formData.address
        );
      case 3:
        return formData.programId;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
      setSubmitError('');
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setSubmitError('');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      const response = await api.post('/registrations', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setRegistrationId(response.data?.data?.registrationId || response.data?.data?._id || 'N/A');
      setStep(5);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (step === 5) {
    return <SuccessMessage registrationId={registrationId} />;
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                step >= s.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              <s.icon className="text-lg" />
            </div>
            <span
              className={`hidden sm:inline ml-2 text-sm font-medium ${
                step >= s.number ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {s.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-2 ${
                  step > s.number ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        {step === 1 && <StudentDetails formData={formData} onChange={handleChange} />}
        {step === 2 && <ParentDetails formData={formData} onChange={handleChange} />}
        {step === 3 && <ProgramSelection formData={formData} onChange={handleChange} />}
        {step === 4 && (
          <ReviewSubmit
            formData={formData}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        )}

        {/* Error message */}
        {submitError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {submitError}
          </div>
        )}

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!validateStep(step)}
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
