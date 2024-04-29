import { useNavigate } from "react-router-dom";
import CustomDataGrid from "../components/CustomDataGrid";
import { Fragment } from "react";
import { Typography } from "@mui/material";

export default function CategoriesPage() {
  const columns = [{ field: "name", headerName: "Name", flex: 1 }];
  const navigate = useNavigate();

  const OnEdit = (id) => {
    navigate(`/admin/editCategory/${id}`);
  };

  return (
    <Fragment>
      <Typography variant="h4" mb={2}>
        Manage Posts
      </Typography>

      <CustomDataGrid
        columns={columns}
        url={"categories/"}
        deleteUrl={"categories/delete"}
        onEdit={OnEdit}
      />
    </Fragment>
  );
}
