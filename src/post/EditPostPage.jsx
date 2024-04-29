import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import AutocompleteComponent from "../components/AutocompleteComponent ";
import usePost from "./usePost";
import CustomAlert from "../components/CustomAlert";
import UploadImage from "../components/UploadImage";

export default function EditPostPage(isUser, onAdd) {
  const {
    formData,
    handleInputChange,
    errors,
    onSave,
    onCancel,
    open,
    setOpen,
    type,
    message,
  } = usePost(isUser, onAdd);

  const handleSection = (val) => {
    handleInputChange("section", val);
  };

  const handleCategory = (val) => {
    handleInputChange("category", val);
  };

  const handleImage = (val) => {
    handleInputChange("image", val);
  };

  return (
    <Fragment>
      <Typography variant="h4">Add Post</Typography>
      <Grid container>
        <Grid item xs={12} mt={2}>
          <TextField
            id="title"
            label="Title"
            variant="filled"
            value={formData.title}
            required
            fullWidth
            onChange={(e) => handleInputChange("title", e.target.value)}
            error={errors.title}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            id="body"
            label="Body"
            variant="filled"
            value={formData.body}
            required
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            onChange={(e) => handleInputChange("body", e.target.value)}
            error={errors.body}
            helperText={errors.body}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <AutocompleteComponent
            label={"Section"}
            url={"sections/"}
            value={formData.section}
            required
            onChange={handleSection}
            error={errors.section}
            helperText={errors.section}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <AutocompleteComponent
            label={"Category"}
            url={`categories/?section=${formData.section.id}`}
            value={formData.category}
            required
            onChange={handleCategory}
            error={errors.category}
            helperText={errors.category}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <UploadImage image={formData.image} setImage={handleImage} />
        </Grid>
      </Grid>
      <Stack justifyContent={"flex-end"} flexDirection={"row"} gap={2} mt={3}>
        <Button
          variant="contained"
          sx={{ color: "#fff", backgroundColor: "#f90069" }}
          onClick={(e) => onSave(e)}
        >
          update
        </Button>
        <Button
          variant="contained"
          sx={{ color: "#fff", backgroundColor: "#323232" }}
          onClick={() => onCancel()}
        >
          cancel
        </Button>
      </Stack>
      <CustomAlert
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />
    </Fragment>
  );
}
