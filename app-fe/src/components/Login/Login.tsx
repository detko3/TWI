import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./Login.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { Buffer } from "buffer";
import useUser from "../../data/useUser";
import axios from "axios";
import { Toast } from "primereact/toast";

// interface LoginProps {
//   setToken: () => void;
// }

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { state }: any = useLocation();

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

  // const { user, mutate, loggedOut } = useUser(base64data);

  // useEffect(() => {
  //   console.log("here?");
  //   if (user && !loggedOut) {
  //     const token = { username: username, password: password };
  //     login(token).then(() => {
  //       navigate(state?.path || "/dashboard");
  //     });
  //   }
  // }, [user, loggedOut]);

  const onSubmitClick = () => {
    if (username.length === 0) showError("username is empty");
    else if (password.length === 0) showError("password is empty");
    else {
      // mutate();
      const base64data = Buffer.from(username + ":" + password).toString(
        "base64"
      );
      axios
        .get("http://localhost:8080/users/user/user-info", {
          withCredentials: false,
          headers: { Authorization: "Basic " + base64data },
        })
        .then((res) => {
          const person = res.data;
          const token = {
            username: username,
            password: password,
            role: person.role,
          };
          login(token).then(() => {
            navigate(state?.path || "/");
          });
        })
        .catch(() => {
          showError("wrong credentials");
          setPassword("");
        });
    }
  };

  return (
    <div className="LoginContainer">
      <Toast ref={toast} />
      <Card title="Log In" className="cardContainer">
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
              inputId="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>
        <div>
          <Button label="submit" onClick={onSubmitClick} />
        </div>
        <div style={{ marginTop: "1em" }}>
          <Link to="/signin">Create Account</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
