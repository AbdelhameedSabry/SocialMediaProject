import { useNavigate } from "react-router-dom";
import CustomDataGrid from "../components/CustomDataGrid";
import { Fragment } from "react";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function UsersPage() {
  const columns = [
    { field: "firstName", headerName: "First name", flex: 1 },
    { field: "lastName", headerName: "Last name", flex: 1 },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      renderCell: (params) => {
        return params.value ? <CheckIcon /> : <CloseIcon />;
      },
    },
  ];
  const navigate = useNavigate();

  const OnEdit = (id) => {
    navigate(`/admin/editUser/${id}`);
  };

  return (
    <Fragment>
      <Typography variant="h4" mb={2}>
        Manage Users
      </Typography>

      <CustomDataGrid
        columns={columns}
        url={"users/"}
        deleteUrl={"users/delete"}
        enableUrl={"users/toggle-activation"}
        onEdit={OnEdit}
        showEnable
      />
    </Fragment>
  );
}
