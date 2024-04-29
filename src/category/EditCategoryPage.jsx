import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import AutocompleteComponent from "../components/AutocompleteComponent ";
import useCategory from "./useCategory";
import CustomAlert from "../components/CustomAlert";

export default function EditCategoryPage() {
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
  } = useCategory();

  const handleSection = (val) => {
    handleInputChange("section", val);
  };

  return (
    <Fragment>
      <Typography variant="h4">Add Category</Typography>
      <Grid container>
        <Grid item xs={12} mt={2}>
          <TextField
            id="name"
            label="Name"
            variant="filled"
            value={formData.name}
            required
            fullWidth
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={errors.name}
            helperText={errors.name}
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
