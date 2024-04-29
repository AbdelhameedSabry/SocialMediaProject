import { useState } from "react";
import Home from "../home/Home";
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ProfilePage() {
  const [value, setValue] = useState(0);
  const image = localStorage.getItem("image");
  const userName = localStorage.getItem("userName");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Stack direction={"row"} spacing={2}>
            {image !== "null" ? (
              <CardMedia
                component="img"
                src={image}
                alt=""
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            ) : (
              <AccountCircleIcon style={{ fontSize: "100px" }} />
            )}
            <Stack justifyContent={"center"}>
              <Typography gutterBottom variant="h5" component="div">
                {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        sx={{ width: "100%" }}
      >
        <Tab label="Posts" sx={{ flex: 1 }} />
        <Tab label="Saved" sx={{ flex: 1 }} />
      </Tabs>
      <Home profileValue={value} />
    </Stack>
  );
}
