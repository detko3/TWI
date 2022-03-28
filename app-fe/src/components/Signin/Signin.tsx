import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";

import "./Signin.css";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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

  const onSubmitClick = () => {
    if (username.length === 0) showError("username is empty");
    else if (false) showError("username already exists");
    else if (password1.length < 8)
      showError("password must be at least 8 char long");
    else if (password1 !== password2) showError("passwords don't match");
    else {
      //TODO login and redirect
    }
  };

  return (
    <div className="SigninContainer">
      <Toast ref={toast} />
      <Card title="Create Account" className="cardContainer">
        <div className="cardInput" style={{ marginTop: "2em" }}>
          <span className="p-float-label">
            <InputText
              id="in"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="in">Username</label>
          </span>
        </div>

        <div className="cardInput">
          <span className="p-float-label">
            <Password
              inputId="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              feedback={false}
            />
            <label htmlFor="password1">Password</label>
          </span>
        </div>
        <div className="cardInput">
          <span className="p-float-label">
            <Password
              inputId="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              feedback={false}
            />
            <label htmlFor="password2">Repeat Password</label>
          </span>
        </div>
        <div>
          <Button label="create account" onClick={onSubmitClick} />
        </div>
        <div style={{ marginTop: "1em" }}>
          <Link to="/login">Log In</Link>
        </div>
      </Card>
    </div>
  );
};

export default Signin;
