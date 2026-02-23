import { useState } from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const reset = (newValues) => {
    setValues(newValues || initialValues);
    setErrors({});
  };

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, errors, setErrors, handleChange, reset, setFieldValue, setValues };
};

export default useForm;
