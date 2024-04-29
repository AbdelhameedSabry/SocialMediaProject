import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostApi from "./PostApi";
import useFormValidation from "../hooks/useFormValidation";

export default function usePost(props) {
  const { formData, errors, handleInputChange, validateForm, resetFormData } =
    useFormValidation(
      {
        title: "",
        body: "",
        section: "",
        category: "",
        image: "",
      },
      ["title", "body", "section", "category"]
    );

  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  useEffect(() => {
    if (id) {
      PostApi.GetPostById(id)
        .then((d) => {
          const post = d.data.data[0];

          resetFormData({
            ...post,
            body: post.description,
            section: post.category.section,
          });
        })
        .catch((e) => {
          setType("error");
          setMessage(e.response.data.message);
          setOpen(true);
        });
    }
  }, [id]);

  function onSave(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid)
      PostApi.CreateOrEditPost(formData)
        .then(() => {
          setType("success");
          setMessage("Post saved Succefully");
          props.isUser ? props.onAdd() : navigate("/admin/managePosts");
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
    props.isUser ? props.onAdd() : navigate("/admin/managePosts");
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
