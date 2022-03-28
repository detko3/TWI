import { useState } from "react";
import "./App.css";
import Navigation from "./Navigation";

import "primereact/resources/themes/bootstrap4-light-purple/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import Login from "./components/Login/Login";
import { AuthProvider } from "./auth/useAuth";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navigation></Navigation>
      </div>
    </AuthProvider>
  );
}

export default App;
