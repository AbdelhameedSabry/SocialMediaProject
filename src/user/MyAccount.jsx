import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Stack, Grid, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import UploadImage from "../components/UploadImage";
import CustomAlert from "../components/CustomAlert";
import useMyAccount from "./useMyAccount";

export default function MyAccount() {
  const {
    formData,
    handleInputChange,
    errors,
    onSave,
    open,
    setOpen,
    type,
    message,
  } = useMyAccount();

  const handleImage = (val) => {
    handleInputChange("image", val);
  };

  const profileDiv = (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Stack direction={"row"} spacing={2}>
          <UploadImage
            image={formData.image}
            setImage={handleImage}
            isPrpfile
          />

          <Stack justifyContent={"center"}>
            <Typography gutterBottom variant="h5" component="div">
              {formData.firstName + " " + formData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Fragment>
      <Grid container>
        {profileDiv}
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
      </Grid>
      <Stack justifyContent={"flex-end"} flexDirection={"row"} gap={2} mt={3}>
        <Button
          variant="contained"
          sx={{ color: "#fff", backgroundColor: "#f90069" }}
          onClick={(e) => onSave(e)}
        >
          update
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
