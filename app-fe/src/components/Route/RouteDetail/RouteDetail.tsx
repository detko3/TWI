import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import "./RouteDetail.css";
import UsersTable from "../../User/UsersTable/UsersTable";
import { Button } from "primereact/button";

const RouteDetail = () => {
  let { id } = useParams();
  const [route, setRoute]: any = useState(null);
  const [climbers, setClimbers] = useState([]);
  const [climbed, setClimbed] = useState(false);

  const token = getToken();

  useEffect(() => {
    loadRoute();
    loadClimbers();
  }, []);

  useEffect(() => {
    loadClimbers();
  }, [climbed]);

  const loadRoute = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/climbing-routes/climbing-route/${id}`,
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
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
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/climbing-routes/climbing-route/${id}/users`,
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          console.log("Climbers: ", res.data);
          setClimbers(res.data ? res.data : []);

          const tmp = res.data
            ? res.data.filter((item: any) => item.username === token.username)
            : [];

          setClimbed(tmp.length > 0);
          // console.log(climbed);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClimbed = () => {
    if (climbed) {
      uncheckRoute();
    } else {
      checkRoute();
    }
  };

  const checkRoute = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/users/user/route/${id}`,
          {},
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          if (res.data === "Added") {
            setClimbed(true);
          } else {
            console.log("Error occured");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const uncheckRoute = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/users/user/route/${id}`, {
          withCredentials: false,
          headers: { Authorization: "Basic " + base64data },
        })
        .then((res) => {
          if (res.data === "Deleted") {
            setClimbed(false);
          } else {
            console.log("Error occured");
          }
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
            <div className="NameContainer">
              <h2>{route.name}</h2>
              <Button
                className={climbed ? "p-button-warning" : "p-button-success"}
                label={climbed ? "uncheck" : "check"}
                onClick={onClimbed}
                style={{ height: "35px" }}
              ></Button>
            </div>
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
