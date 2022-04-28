import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import getToken from "../../../data/getToken";
import SearchUserItem from "../SearchUserItem/SearchUserItem";
import { Buffer } from "buffer";
import "./UserSearch.css";

const UserSearch = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const token = getToken();

  const getUsers = () => {
    if (search.length > 0) {
      if (token !== null && token !== undefined) {
        const base64data = Buffer.from(
          token.username + ":" + token.password
        ).toString("base64");
        axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/users/search?filter=${search}`,
            {
              withCredentials: false,
              headers: { Authorization: "Basic " + base64data },
            }
          )
          .then((res) => {
            console.log("SEARCH: ", res.data);
            const users = res.data;
            setUsers(users);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <div className="UserSearchContainer">
      <div className="SubContainer">
        <h1 style={{ textAlign: "center" }}>Search users</h1>
        <div className="SearchHeader">
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "10px", width: "400px" }}
          />
          <Button icon="pi pi-search" onClick={getUsers} />
        </div>
        {users.map((item: any) => {
          return <SearchUserItem key={item.username} user={item} />;
        })}
      </div>
    </div>
  );
};

export default UserSearch;
