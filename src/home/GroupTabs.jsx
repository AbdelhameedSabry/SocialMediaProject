import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import CategoryApi from "../category/CategoryApi";

export default function GroupTabs({ getAllPosts }) {
  const [value, setValue] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const { sectionId } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    CategoryApi.GetCategories(sectionId)
      .then((d) => {
        setCategories(d.data.data);
      })
      .catch((e) => {});
  }, [sectionId]);

  return categories.length > 0 ? (
    <Box sx={{ ml: 5 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {categories.map((category, index) => (
          <Tab
            label={category.name}
            onClick={() => getAllPosts(category.id)}
            sx={{ backgroundColor: "#1e1e1e", mr: 2, borderRadius: "30px" }}
          />
        ))}
      </Tabs>
    </Box>
  ) : (
    <></>
  );
}
