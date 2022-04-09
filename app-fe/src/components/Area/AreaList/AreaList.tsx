import axios from "axios";
import { useEffect, useState } from "react";
import getToken from "../../../data/getToken";
import AreaTable from "../AreaTable/AreaTable";
import "./AreaList.css";
import { Buffer } from "buffer";
import AreaDialog from "../AreaDialog/AreaDialog";

const AreaList = () => {
  const [areas, setAreas] = useState([]);
  const token = getToken();

  useEffect(() => {
    loadAreas();
  }, []);

  const refreshData = () => {
    loadAreas();
  };

  const loadAreas = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/climbing-areas`, {
          withCredentials: false,
          headers: { Authorization: "Basic " + base64data },
        })
        .then((res) => {
          console.log("DATA: ", res.data);
          setAreas(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="AreaContainer">
      <div className="SubContainer">
        <h2>Areas</h2>
        <AreaTable areas={areas} />
        {token.role === "admin" && <AreaDialog refresh={refreshData} />}
      </div>
    </div>
  );
};

export default AreaList;
