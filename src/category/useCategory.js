import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryApi from "./CategoryApi";
import useFormValidation from "../hooks/useFormValidation";

export default function useCategory() {
  const { formData, errors, handleInputChange, validateForm, resetFormData } =
    useFormValidation(
      {
        name: "",
        section: "",
      },
      ["name", "section"]
    );

  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  useEffect(() => {
    if (id) {
      CategoryApi.GetCategoryById(id)
        .then((d) => {
          const category = d.data.data[0];
          resetFormData({ name: category.name, section: category.section });
        })
        .catch((e) => {
          setType("error");
          setMessage(e.response.data.message);
          setOpen(true);
          setTimeout(() => setOpen(false), 2000);
        });
    }
  }, []);

  function onSave(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid)
      CategoryApi.CreateOrEditCategory({
        ...formData,
        id,
        section: formData.section.id,
      })
        .then(() => {
          setOpen(true);
          setType("success");
          setMessage("Category saved Succefully");
          setTimeout(() => setOpen(false), 2000);
          navigate("/admin/manageCategories");
        })
        .catch((e) => {
          setOpen(true);
          setType("error");
          setMessage(e.response.data.message);
          setTimeout(() => setOpen(false), 2000);
        });
  }

  function onCancel() {
    navigate("/admin/manageCategories");
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
