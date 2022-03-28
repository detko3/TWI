import React, { createContext, useContext, useState } from "react";
import useToken from "./useToken";

interface AuthContextType {
  authed: boolean;
  login: (token: any) => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = createContext<AuthContextType>(null!);

const useAuth = () => {
  const { token, setToken, removeToken } = useToken();
  console.log("useAUTH:", token);
  const [authed, setAuthed] = useState(token === null ? false : true);
  // console.log("AM I HERE");

  return {
    authed,
    login(token: any) {
      // console.log("TOKEN:", token);
      return new Promise<void>((res) => {
        setAuthed(true);
        setToken(token);
        res();
      });
    },
    logout() {
      return new Promise<void>((res) => {
        setAuthed(false);
        res();
        removeToken();
      });
    },
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // console.log("Provider");
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const AuthConsumer = () => {
  // console.log("AuthConsumer");
  return useContext(authContext);
};

export default AuthConsumer;
