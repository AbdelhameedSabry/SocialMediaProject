import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "./UserApi";
import useFormValidation from "../hooks/useFormValidation";

export default function useMyAccount() {
  const userId = localStorage.getItem("userId");

  const { formData, errors, handleInputChange, validateForm, resetFormData } =
    useFormValidation(
      {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
      },
      ["firstName", "lastName", "email", "password", "confirmPassword"]
    );

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      UserApi.GetUserById(userId)
        .then((d) => {
          const user = d.data.data[0];
          resetFormData({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            bio: user.bio,
            role: user.role,
            isActive: user.isActive,
          });
        })
        .catch((e) => {
          setType("error");
          setMessage(e.response.data.message);
          setOpen(true);
          setTimeout(() => setOpen(false), 2000);
        });
    }
  }, [userId]);

  function onSave(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid)
      UserApi.CreateOrEditUser(formData)
        .then(() => {
          setType("success");
          setMessage("User saved Succefully");
        })
        .catch((e) => {
          setType("error");
          setMessage(e.response.data.message);
        })
        .finally(() => {
          setOpen(true);
          setTimeout(() => setOpen(false), 2000);
        });
  }

  function onCancel() {
    navigate("/admin/manageUsers");
  }

  return {
    formData,
    handleInputChange,
    errors,
    onSave,
    onCancel,
    open,
    setOpen,
    type,
    message,
  };
}
