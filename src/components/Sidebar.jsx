import {
  AccountBox,
  Home,
  Person,
  BookmarkBorderOutlined,
  ExpandLess,
  ExpandMore,
  WidgetsOutlined,
  ManageSearchOutlined,
  PersonAddOutlined,
  PeopleOutlined,
  NoteAltOutlined,
} from "@mui/icons-material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import SectionApi from "../Api/sectionApi";

const Sidebar = ({ mode, setMode }) => {
  const [open, setOpen] = useState(true);
  const { user } = useUser();
  const [sectionsList, setSectionsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    SectionApi.GetAll()
      .then((d) => {
        setSectionsList(d.data.data);
      })
      .catch((e) => {});
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const sections = (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <WidgetsOutlined />
        </ListItemIcon>
        <ListItemText primary="Sections" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sectionsList.map((section, index) => (
            <ListItemButton
              key={index}
              sx={{ pl: 10 }}
              onClick={() => navigate(`/home/${section.id}`)}
            >
              <ListItemText primary={section.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );

  const adminDrawerItem = (
    <Fragment>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/addPost">
          <ListItemIcon>
            <CreateOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Add post" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/managePosts">
          <ListItemIcon>
            <ManageSearchOutlined />
          </ListItemIcon>
          <ListItemText primary="Manage Posts" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/addUser">
          <ListItemIcon>
            <PersonAddOutlined />
          </ListItemIcon>
          <ListItemText primary="Add user" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/manageUsers">
          <ListItemIcon>
            <PeopleOutlined />
          </ListItemIcon>
          <ListItemText primary="Manage users" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/addCategory">
          <ListItemIcon>
            <NoteAltOutlined />
          </ListItemIcon>
          <ListItemText primary="Add Category" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin/manageCategories">
          <ListItemIcon>
            <WidgetsOutlined />
          </ListItemIcon>
          <ListItemText primary="Manage Categories" />
        </ListItemButton>
      </ListItem>
    </Fragment>
  );

  const userDrawerItems = (
    <Fragment>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="home">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>{sections}</ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="#simple-list">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/saved-posts/true">
          <ListItemIcon>
            <BookmarkBorderOutlined />
          </ListItemIcon>
          <ListItemText primary="Saved" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/profile">
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>
    </Fragment>
  );

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          {user?.role === "1" ? adminDrawerItem : userDrawerItems}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WbSunnyOutlinedIcon />
              </ListItemIcon>
              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
