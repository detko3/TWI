import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventUsersDialog.css";

const EventUsersDialog = ({ users, isPrivate }: any) => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const onDisplay = () => {
    if (!isPrivate) setDisplay(true);
  };

  const onHide = () => {
    setDisplay(false);
  };

  const onSelect = (item: any) => {
    //navigate to user profile note yet implemented
    navigate(`/user/${item.username}`);
  };

  return (
    <>
      <i
        className="pi pi-user UserIcon"
        style={{ fontSize: "20px" }}
        onClick={onDisplay}
      ></i>

      <Dialog
        header="Event users"
        visible={display}
        style={{ width: "700px" }}
        onHide={() => onHide()}
      >
        <DataTable
          value={users}
          selectionMode="single"
          onRowSelect={(e) => onSelect(e.data)}
          style={{ marginBottom: "20px" }}
        >
          <Column field="fullName"></Column>
        </DataTable>
      </Dialog>
    </>
  );
};

export default EventUsersDialog;
