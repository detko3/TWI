import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./Login.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";

// interface LoginProps {
//   setToken: () => void;
// }

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { state }: any = useLocation();

  const onSubmitClick = () => {
    const token = { username: username, password: password };
    login(token).then(() => {
      navigate(state?.path || "/dashboard");
    });
  };

  return (
    <div className="LoginContainer">
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
