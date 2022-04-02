const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const userToken =
    tokenString === null || tokenString === undefined
      ? null
      : JSON.parse(tokenString);
  return userToken;
};

export default getToken;
