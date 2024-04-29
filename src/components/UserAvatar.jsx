import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logOut, user } = useUser();
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }} src="">
              M
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user?.role !== "1" && (
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        )}
        <MenuItem onClick={() => navigate("/my-account")}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}
