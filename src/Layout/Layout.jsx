import { Box, Stack } from "@mui/material";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Add from "../components/Add";
import { useUser } from "../context/UserContext";

export default function Layout({ setMode, mode }) {
  const { user } = useUser();

  return (
    <Fragment>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ minHeight: "100vh" }}>
            <Outlet />
          </Box>
          {user?.role !== "1" && <Rightbar />}
        </Stack>
      </Box>
    </Fragment>
  );
}
