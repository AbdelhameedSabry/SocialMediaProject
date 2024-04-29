import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import useSignIn from "./useSignIn";
import CustomAlert from "../components/CustomAlert";

export default function SignIn() {
  const navigate = useNavigate();
  const {
    formData,
    handleInputChange,
    logIn,
    errors,
    open,
    setOpen,
    type,
    message,
  } = useSignIn();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#1e1e1e",
          p: 6,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Button onClick={() => navigate("/signIn")}>Sign in</Button>
        <Box
          component="form"
          onSubmit={(e) => logIn(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            helperText={errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Typography onClick={() => navigate("/signUp")} variant="body2">
                <Link variant="body2">Don't have an account? Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CustomAlert
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />
    </Container>
  );
}
