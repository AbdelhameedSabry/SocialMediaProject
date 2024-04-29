import styled from "@emotion/styled";
import { Pets } from "@mui/icons-material";
import {
  AppBar,
  Button,
  InputBase,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useUser } from "../context/UserContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "20px",
  width: "40%",
  color: "#000",
  fontSize: "20px",
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const registerButtons = (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Stack>
        <Button onClick={() => navigate("/signUp")} sx={{ color: "inherit" }}>
          Sign up
        </Button>
      </Stack>

      <Button
        sx={{
          color: "#000",
          background: "#fff",
          borderRadius: "20px",
          px: 1.5,
        }}
        onClick={() => navigate("/signIn")}
      >
        Sign in
      </Button>
    </Stack>
  );

  const searchFiled = (
    <Search onChange={(e) => localStorage.setItem("search", e.target.value)}>
      <Stack direction={"row"} p={0.3}>
        <SearchOutlinedIcon
          sx={{ rotate: "90deg" }}
          style={{ fontSize: "30px" }}
        />
        <InputBase
          placeholder="Search Recotell..."
          sx={{ width: "100%", color: "#000" }}
        />
      </Stack>
    </Search>
  );

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h5"
          sx={{ display: { xs: "none", sm: "block" }, fontWeight: "900" }}
        >
          Logo
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        {user?.role !== "1" && searchFiled}
        {user?.token ? <UserAvatar /> : registerButtons}
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
