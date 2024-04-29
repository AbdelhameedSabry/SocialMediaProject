import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import useCustomDataGrid from "../hooks/useCustomDataGrid";
import CustomAlert from "./CustomAlert";
import BlockIcon from "@mui/icons-material/Block";

export default function CustomDataGrid({
  url,
  deleteUrl,
  columns,
  onEdit,
  showEnable,
  enableUrl,
}) {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { rows, setRows, open, setOpen, message, type, deleteRow, enable } =
    useCustomDataGrid(url);

  const cols = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      hide: false,
      getActions: ({ id }) => {
        const actions = [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => onEdit(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteRow(deleteUrl, id)}
            color="inherit"
          />,
        ];

        if (showEnable) {
          actions.push(
            <GridActionsCellItem
              icon={<BlockIcon />}
              label="Enable"
              onClick={() => enable(enableUrl, id)}
              color="inherit"
            />
          );
        }

        return actions;
      },
    },
  ];

  return (
    <React.Fragment>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={cols}
          editMode="row"
          rowModesModel={rowModesModel}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
      {
        <CustomAlert
          open={open}
          setOpen={setOpen}
          message={message}
          type={type}
        />
      }
    </React.Fragment>
  );
}
