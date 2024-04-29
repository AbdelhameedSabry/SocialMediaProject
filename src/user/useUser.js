import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserApi from "./UserApi";
import useFormValidation from "../hooks/useFormValidation";

export default function useUser() {
  const { id } = useParams();
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
    if (id) {
      UserApi.GetUserById(id)
        .then((d) => {
          const user = d.data.data[0];
          resetFormData({ ...user, image: user.profilePicture });
        })
        .catch((e) => {
          setType("error");
          setMessage(e.response.data.message);
          setOpen(true);
          setTimeout(() => setOpen(false), 2000);
        });
    }
  }, [id]);

  function onSave(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid)
      UserApi.CreateOrEditUser(formData)
        .then(() => {
          setType("success");
          setMessage("User saved Succefully");
          navigate("/admin/manageUsers");
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
