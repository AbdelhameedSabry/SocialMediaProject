import { useCallback, useEffect, useState } from "react";
import CustomDataGridApi from "../Api/CustomDataGridApi";

export default function useCustomDataGrid(url) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const GetRows = useCallback(() => {
    CustomDataGridApi.GetRows(url)
      .then((resp) => setRows(resp.data.data))
      .catch((e) => {
        setType("error");
        setMessage(e.response.data.message);
        setOpen(true);
        setTimeout(() => setOpen(false), 2000);
      });
  }, [url]);

  useEffect(() => {
    GetRows();
  }, [GetRows]);

  function deleteRow(deleteUrl, id) {
    CustomDataGridApi.Delete(deleteUrl, id)
      .then((resp) => {
        GetRows();
        setType("success");
        setMessage("Row deleted Succefully.");
      })
      .catch((e) => {
        setType("error");
        setMessage(e.response.data.message);
      })
      .finally(() => {
        setOpen(true);
        setTimeout(() => setOpen(false), 2000);
      });
  }

  function enable(enableUrl, id) {
    CustomDataGridApi.Enable(enableUrl, id)
      .then((resp) => {
        GetRows();
        setType("success");
        setMessage("Action done.");
      })
      .catch((e) => {
        setType("error");
        setMessage(e.response.data.message);
      })
      .finally(() => {
        setOpen(true);
        setTimeout(() => setOpen(false), 2000);
      });
  }

  return { rows, setRows, open, setOpen, message, type, deleteRow, enable };
}
