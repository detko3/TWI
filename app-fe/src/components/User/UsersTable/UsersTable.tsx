import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsersTable.css";

const UsersTable = ({ users }: any) => {
  const [first, setFirst] = useState(0);
  const navigate = useNavigate();

  const onSelect = (data: any) => {
    //navigate to user Profile
    navigate(`/user/${data.username}`);
  };
  return (
    <div className="TableContainer">
      <DataTable
        value={users}
        paginator
        rows={10}
        selectionMode="single"
        onRowSelect={(e) => onSelect(e.data)}
        first={first}
        onPage={(e) => setFirst(e.first)}
      >
        <Column field="fullName" header="Name"></Column>
      </DataTable>
    </div>
  );
};

export default UsersTable;
