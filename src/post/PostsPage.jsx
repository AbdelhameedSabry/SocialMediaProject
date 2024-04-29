import { useNavigate } from "react-router-dom";
import CustomDataGrid from "../components/CustomDataGrid";
import { Fragment } from "react";
import { Typography } from "@mui/material";

export default function PostsPage() {
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Body", flex: 1 },
  ];
  const navigate = useNavigate();

  const OnEdit = (id) => {
    navigate(`/admin/editPost/${id}`);
  };

  return (
    <Fragment>
      <Typography variant="h4" mb={2}>
        Manage Posts
      </Typography>

      <CustomDataGrid
        columns={columns}
        url={"posts/"}
        deleteUrl={"posts/delete"}
        onEdit={OnEdit}
      />
    </Fragment>
  );
}
