import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import useUser from "./useUser";
import UploadImage from "../components/UploadImage";
import CustomAlert from "../components/CustomAlert";

export default function EditUserPage() {
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
  } = useUser();

  const handleImage = (val) => {
    handleInputChange("image", val);
  };

  return (
    <Fragment>
      <Typography variant="h4">Add User</Typography>
      <Grid container>
        <Grid item xs={12} mt={2}>
          <TextField
            id="firstName"
            label="First name"
            variant="filled"
            value={formData.firstName}
            required
            fullWidth
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            id="lastName"
            label="Last name"
            variant="filled"
            value={formData.lastName}
            required
            fullWidth
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            type="email"
            value={formData.email}
            required
            fullWidth
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            id="password"
            label="Password"
            variant="filled"
            type="password"
            value={formData.password}
            required
            fullWidth
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="filled"
            type="confirmPassword"
            value={formData.confirmPassword}
            required
            fullWidth
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            error={errors.confirmPassword}
            helperText={errors.confirmPassword}
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
