import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import AuthApi from "../Api/AuthApi";
import { useUser } from "../context/UserContext";

export default function useSignIn() {
  const { formData, errors, handleInputChange, validateForm } =
    useFormValidation(
      {
        email: "",
        password: "",
      },
      ["email", "password"]
    );
  const { saveUserData } = useUser();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  function logIn(e) {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid)
      AuthApi.logIn(formData)
        .then((resp) => {
          saveUserData(resp.data.data);
          navigate(resp.data.data.user.roleId === 1 ? "/admin" : "/");
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
    logIn,
    errors,
    open,
    setOpen,
    type,
    message,
  };
}
