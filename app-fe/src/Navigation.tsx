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
import AreaDetail from "./components/Area/AreaDetail/AreaDetail";
import AreaList from "./components/Area/AreaList/AreaList";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import RouteDetail from "./components/Route/RouteDetail/RouteDetail";
import Signin from "./components/Signin/Signin";

const Navigation = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="areas"
            element={
              <RequireAuth>
                <AreaList />
              </RequireAuth>
            }
          />
          <Route
            path="areas/area/:id"
            element={
              <RequireAuth>
                <AreaDetail />
              </RequireAuth>
            }
          />
          <Route
            path="route/:id"
            element={
              <RequireAuth>
                <RouteDetail />
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
          <Route
            path="login"
            element={
              <RequireNoAuth>
                <Login />
              </RequireNoAuth>
            }
          />

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
        {authed && (
          <>
            <ul>
              <li>
                <Link to="/">Profile</Link>
              </li>
              <li>
                <Link to="/areas">Areas</Link>
              </li>
            </ul>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
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
    <Navigate to="/" replace />
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
