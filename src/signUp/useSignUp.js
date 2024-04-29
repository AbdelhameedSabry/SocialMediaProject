import { useState } from "react";
import useFormValidation from "../hooks/useFormValidation";
import AuthApi from "../Api/AuthApi";

export default function useSignUp() {
  const { formData, errors, handleInputChange, validateForm } =
    useFormValidation(
      {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      },
      [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
        "phoneNumber",
      ]
    );

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  function signUp(e) {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid)
      AuthApi.register({
        ...formData,
        username: formData.firstName + " " + formData.lastName,
        confirmPassword: undefined,
      })
        .then((resp) => {
          setOpen(true);
          setType(
            "Account Create Succefully addmin should activate your account to log in "
          );
        })
        .catch((e) => {
          setOpen(true);
          setTimeout(() => setOpen(false), 2000);
          setType("error");
          setMessage(e.response.data.message);
        });
  }

  return {
    formData,
    handleInputChange,
    signUp,
    errors,
    open,
    setOpen,
    type,
    message,
  };
}
