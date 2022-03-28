import * as React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import useAuth from "./auth/useAuth";
import useToken from "./auth/useToken";
import Login from "./components/Login/Login";
import Signin from "./components/Signin/Signin";

const Navigation = () => {
  // const { token, setToken } = useToken();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path="signin"
            element={
              <RequireNoAuth>
                <Signin />
              </RequireNoAuth>
            }
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Navigation;

function Layout() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="Container">
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>

          <li>
            <Link to="/login">Login page</Link>
          </li>
        </ul>
        {authed && <button onClick={handleLogout}>Logout</button>}
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

function RequireNoAuth({ children }: { children: React.ReactNode }) {
  //session storage and redirect
  const userToken = sessionStorage.getItem("token");

  return userToken === null || userToken === undefined ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
