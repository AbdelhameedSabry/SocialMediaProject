import { useState } from "react";

export default function useFormValidation(initialState, requiredFields) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const resetFormData = (values) => {
    setFormData({ ...values });
  };

  const validateForm = () => {
    const newErrors = {};

    requiredFields.forEach((fieldName) => {
      if (!formData[fieldName]) {
        newErrors[fieldName] = "This field is required";
      }

      if (
        fieldName === "confirmPassword" &&
        formData[fieldName] !== formData["password"]
      ) {
        newErrors[fieldName] = "Password and confirm password not match";
      }

      if (fieldName === "email" && formData["email"]) {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          formData["email"]
        );
        if (!isValidEmail) {
          newErrors[fieldName] = "Invalid email";
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
    resetFormData,
  };
}
