import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./SearchUserItem.css";

const SearchUserItem = ({ user }: any) => {
  const navigate = useNavigate();

  const navigateUser = () => {
    navigate(`/user/${user.username}`);
  };
  return (
    <div className="UserItem">
      <h2>{user.fullName}</h2>
      <p className="SearchUserItemInfo">
        {user.info === "" || user.info === null
          ? "No info provided"
          : user.info}
      </p>
      <Button
        icon="pi pi-caret-right"
        onClick={navigateUser}
        style={{ marginLeft: "auto" }}
      />
    </div>
  );
};

export default SearchUserItem;
