import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./AreaTable.css";
import { useNavigate } from "react-router-dom";

const AreaTable = ({ areas }: any) => {
  const [first, setFirst] = useState(0);
  const navigate = useNavigate();

  const onSelect = (data: any) => {
    navigate(`/areas/area/${data.id}`);
  };

  return (
    <div>
      <div className="TableContainer">
        <DataTable
          value={areas}
          paginator
          rows={10}
          first={first}
          selectionMode="single"
          onRowSelect={(e) => onSelect(e.data)}
          onPage={(e) => setFirst(e.first)}
        >
          <Column field="name" header="Name"></Column>
          <Column field="latitude" header="Latitude"></Column>
          <Column field="longitude" header="Longitude"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default AreaTable;
