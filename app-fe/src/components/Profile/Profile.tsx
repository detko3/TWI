import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { Buffer } from "buffer";
import { Toast } from "primereact/toast";
import RouteTable from "../Route/RouteTable/RouteTable";

const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const userToken =
    tokenString === null || tokenString === undefined
      ? null
      : JSON.parse(tokenString);
  // console.log("HERE@", userToken);
  return userToken;
};

const Profile = () => {
  const [modify, setModify] = useState(false);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [routes, setRoutes] = useState([]);
  const [modifyName, setModifyName] = useState("");
  const [modifyInfo, setModifyInfo] = useState("");

  const toast = useRef(null);

  const showError = (message: string) => {
    // @ts-ignore: Object is possibly 'null'.
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: message,
      life: 3000,
    });
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    const token = getToken();
    // const tokenString = sessionStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/user/user-info`, {
          withCredentials: false,
          headers: { Authorization: "Basic " + base64data },
        })
        .then((res) => {
          console.log("DATA: ", res.data);
          const person = res.data;
          setName(person.fullName);
          setInfo(person.info ? person.info : "");
          setRoutes(person.routes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onModify = () => {
    setModify(!modify);
    setModifyName(name);
    setModifyInfo(info);
  };

  const postData = () => {
    const token = getToken();
    // const tokenString = sessionStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/users/user/user-info`,
          {
            fullName: modifyName,
            info: modifyInfo,
          },
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          if (res.data === "Updated") {
            setName(modifyName);
            setInfo(modifyInfo);
            setModify(false);
          } else {
            showError("Error occured");
          }
        })
        .catch((error) => {
          showError("Error occured");
        });
    }
  };

  const onSave = () => {
    if (modifyName.length === 0) {
      showError("Name is empty");
    } else {
      postData();
    }
  };

  return (
    <div className="ProfileContainer">
      <Toast ref={toast} />
      <div className="SubContainer">
        <div className="NameContainer">
          {modify ? (
            <span
              className="p-float-label"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <InputText
                id="in"
                value={modifyName}
                onChange={(e) => setModifyName(e.target.value)}
              />
              <label htmlFor="in">Name</label>
            </span>
          ) : (
            <h2>{name}</h2>
          )}

          {!modify && (
            <Button
              label="Modify"
              onClick={onModify}
              style={{ height: "35px" }}
            ></Button>
          )}
        </div>
        <h4 style={{ margin: "0px" }}>About me:</h4>
        {modify ? (
          <InputTextarea
            value={modifyInfo}
            onChange={(e) => setModifyInfo(e.target.value)}
            rows={5}
            style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
          />
        ) : (
          <p>{info}</p>
        )}

        {modify && (
          <div>
            <Button
              label="Save"
              onClick={onSave}
              style={{ height: "35px", marginRight: "15px" }}
            ></Button>
            <Button label="Cancel" onClick={() => setModify(false)}></Button>
          </div>
        )}
        <h4>Routes climbed</h4>
        <RouteTable routes={routes} />
      </div>
    </div>
  );
};

export default Profile;
