import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./RouteTable.css";
import { useNavigate } from "react-router-dom";

const RouteTable = ({ routes }: any) => {
  const [first, setFirst] = useState(0);
  const navigate = useNavigate();

  const onSelect = (data: any) => {
    navigate(`/route/${data.id}`);
  };

  return (
    <div>
      <div className="TableContainer">
        <DataTable
          value={routes}
          paginator
          rows={10}
          selectionMode="single"
          onRowSelect={(e) => onSelect(e.data)}
          first={first}
          onPage={(e) => setFirst(e.first)}
        >
          <Column field="name" header="Name"></Column>
          <Column field="grade" header="Grade"></Column>
          <Column field="areaId" header="Area"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default RouteTable;
