import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken =
      tokenString === null || tokenString === undefined
        ? null
        : JSON.parse(tokenString);
    // console.log("HERE@", userToken);
    return userToken;
  };

  const [token, setToken] = useState(getToken);

  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    sessionStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    removeToken: removeToken,
    token,
  };
};

export default useToken;
