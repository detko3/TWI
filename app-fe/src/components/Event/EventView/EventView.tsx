import { Button } from "primereact/button";
import "./EventView.css";
import { DataView } from "primereact/dataview";
import EventUsersDialog from "../EventUsersDialog/EventUsersDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

const EventView = ({ events, token }: any) => {
  const navigate = useNavigate();

  const onJoin = (id: number) => {
    joinEvent(id);
  };

  const onDisplay = (id: number) => {
    navigate(`/event/${id}`);
  };

  const onRequest = () => {};

  const joinEvent = (id: number) => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/climbing-events/climbing-event/${id}/user`,
          {},
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          if (res.data === "Added") {
            navigate(`/event/${id}`);
          } else {
            console.log("Error occured");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderHeader = () => {
    return (
      <div>
        <p>Header</p>
      </div>
    );
  };

  const header = renderHeader();

  const RenderButton = ({ users, isPrivate, id, maxParticipants }: any) => {
    // console.log("USERS:", users);
    const isPartOfEvent = users.some(
      (user: any) => user.username === token.username
    );

    if (isPartOfEvent) {
      return (
        <Button
          label="Display"
          onClick={() => onDisplay(id)}
          style={{ marginTop: "10px" }}
          className="p-button-success"
        ></Button>
      );
    } else {
      if (isPrivate) {
        return (
          <Button
            label="Request"
            disabled={maxParticipants === users.length}
            onClick={onRequest}
            style={{ marginTop: "10px" }}
            className="p-button-warning"
          ></Button>
        );
      }

      return (
        <Button
          label="Join"
          disabled={maxParticipants === users.length}
          onClick={() => onJoin(id)}
          style={{ marginTop: "10px" }}
        ></Button>
      );
    }
  };

  const renderItem = (data: any) => {
    return (
      <div className="ItemContainer">
        <div className="left">
          <h2>{data.createdBy}</h2>
          <p>area: {data.area}</p>
          <p>
            grade:{" "}
            {data.minGrade === null || data.minGrade === 0 ? 1 : data.minGrade}-
            {data.maxGrade === null || data.maxGrade === 0 ? 27 : data.maxGrade}
          </p>
          <p>
            {data.date} {data.time}
          </p>
        </div>
        <div className="middle">
          <p className="middleText">
            {data.description === null || data.description === ""
              ? "No info provided"
              : data.description}
          </p>
        </div>
        <div className="right">
          <EventUsersDialog
            users={data.myGroupUsers}
            isPrivate={data.private}
          />
          <p>
            {data.myGroupUsers.length}/{data.maxParticipants}
          </p>
          {/* <Button
            label="Join"
            onClick={onJoin}
            style={{ marginTop: "10px" }}
          ></Button> */}
          <RenderButton
            maxParticipants={data.maxParticipants}
            users={data.myGroupUsers}
            isPrivate={data.private}
            id={data.id}
          />
        </div>
      </div>
    );
  };

  const itemTemplate = (item: any, layout: any) => {
    return renderItem(item);
  };

  return (
    <div>
      <DataView
        layout={"list"}
        value={events}
        header={header}
        itemTemplate={itemTemplate}
        paginator
        rows={10}
      />
    </div>
  );
};

export default EventView;
