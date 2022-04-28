import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getToken from "../../data/getToken";
import RouteTable from "../Route/RouteTable/RouteTable";
import { Buffer } from "buffer";

const OtherProfile = () => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [routes, setRoutes] = useState([]);

  let { userId } = useParams();
  const navigate = useNavigate();

  const token = getToken();

  useEffect(() => {
    if (token.username === userId) {
      navigate("/");
      return;
    }
    loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/user/${userId}`, {
          withCredentials: false,
          headers: { Authorization: "Basic " + base64data },
        })
        .then((res) => {
          console.log("DATA: ", res.data);
          const user = res.data;
          setName(user.fullName);
          setInfo(user.info ? user.info : "");
          setRoutes(user.routes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="ProfileContainer">
      <div className="SubContainer">
        <h2 style={{ marginTop: "15px" }}>{name}</h2>
        <h4 style={{ margin: "0px" }}>About me:</h4>
        <p>{info}</p>
        <h4>Routes climbed</h4>
        <RouteTable routes={routes} />
      </div>
    </div>
  );
};

export default OtherProfile;
