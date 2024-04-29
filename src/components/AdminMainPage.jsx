import { Card, CardContent, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AdminMainPage() {
  return (
    <Card>
      <CardContent>
        <Stack px={3} py={1}>
          <Outlet />
        </Stack>
      </CardContent>
    </Card>
  );
}
