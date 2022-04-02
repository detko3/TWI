import axios from "axios";
import { useEffect, useState } from "react";
import getToken from "../../../data/getToken";
import AreaTable from "../AreaTable/AreaTable";
import "./AreaList.css";
import { Buffer } from "buffer";

const AreaList = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = () => {
    const token = getToken();
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get("http://localhost:8080/climbing-areas", {
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
      </div>
    </div>
  );
};

export default AreaList;
