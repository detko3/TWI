import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import "./RouteDetail.css";
import UsersTable from "../../User/UsersTable/UsersTable";

const RouteDetail = () => {
  let { id } = useParams();
  const [route, setRoute]: any = useState(null);
  const [climbers, setClimbers] = useState([]);

  useEffect(() => {
    loadRoute();
    loadClimbers();
  }, []);

  const loadRoute = () => {
    const token = getToken();
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(`http://localhost:8080/climbing-routes/climbing-route/${id}`, {
          withCredentials: false,
          headers: { Authorization: "Basic " + base64data },
        })
        .then((res) => {
          console.log("DATA: ", res.data);
          setRoute(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const loadClimbers = () => {
    const token = getToken();
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(
          `http://localhost:8080/climbing-routes/climbing-route/${id}/users`,
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          console.log("Climbers: ", res.data);
          setClimbers(res.data ? res.data : []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="RouteContainer">
      <div className="SubContainer">
        <h4>Climbing Route</h4>
        {route && (
          <>
            <h2>{route.name}</h2>
            <h4>grade: {route.grade}</h4>
            <h4>area: {route.areaId}</h4>
            <h4>created by: {route.createdBy}</h4>
            <h3>Climbed By: </h3>
            <UsersTable users={climbers}></UsersTable>
          </>
        )}
      </div>
    </div>
  );
};

export default RouteDetail;
