import { useCallback, useEffect, useState } from "react";
// import PostApi from "./PostApi";
import useFormValidation from "../hooks/useFormValidation";
import CommentApi from "../Api/CommentApi";

export default function useComments(postId) {
  const { formData, errors, handleInputChange, validateForm } =
    useFormValidation(
      {
        comment: "",
      },
      ["comment"]
    );

  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const getAllComments = useCallback(() => {
    if (postId) {
      CommentApi.GetComments(postId)
        .then((d) => {
          setComments(d.data.data);
        })
        .catch((e) => {
          setType("error");
          setMessage(e.response.data.message);
          setIsOpen(true);
        });
    }
  }, [postId]);

  useEffect(() => {
    getAllComments();
  }, [getAllComments]);

  function onSave(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid)
      CommentApi.CreateOrEditComment({ comment_text: formData.comment, postId })
        .then(() => {
          getAllComments();
          handleInputChange("comment", "");
          setType("success");
          setMessage("comment uploded");
        })
        .catch((e) => {
          setType("error");
          setMessage(e.response.data.message);
        })
        .finally(() => {
          setIsOpen(true);
          setTimeout(() => setIsOpen(false), 2000);
        });
  }

  return {
    formData,
    handleInputChange,
    errors,
    onSave,
    isOpen,
    setIsOpen,
    type,
    message,
    comments,
  };
}
