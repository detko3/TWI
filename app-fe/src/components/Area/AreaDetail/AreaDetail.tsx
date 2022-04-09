import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import "./AreaDetail.css";
import RouteTable from "../../Route/RouteTable/RouteTable";
import RouteDialog from "../../Route/RouteDialog/RouteDialog";

const AreaDetail = () => {
  let { id } = useParams();

  const [area, setArea]: any = useState(null);
  const token = getToken();

  useEffect(() => {
    loadArea();
  }, []);

  const refreshData = () => {
    loadArea();
  };

  const loadArea = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/climbing-areas/climbing-area/${id}`,
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          // console.log("DATA: ", res.data);
          setArea(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="AreaContainer">
      <div className="SubContainer">
        <h4>Climbing Area</h4>
        {area && (
          <>
            <h2>{area.name}</h2>
            <h4>Latitude: {area.latitude}</h4>
            <h4>Longitude: {area.longitude}</h4>
          </>
        )}
        <h3>Routes:</h3>
        <RouteTable routes={area ? area.routes : []} />
        {token.role === "admin" && (
          <RouteDialog refresh={refreshData} areaId={Number(id)} />
        )}
      </div>
    </div>
  );
};

export default AreaDetail;
