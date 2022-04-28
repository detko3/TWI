import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import "./EventDetail.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CommentsContainer from "../../Comment/CommentsContainer/CommentsContainer";

const EventDetail = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>(null);
  const token = getToken();

  useEffect(() => {
    loadEvent();
    // console.log("Event!!!: ", event);
  }, []);

  const loadEvent = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/climbing-events/climbing-event/${id}`,
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          console.log("Event: ", res.data);
          setEvent(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onSelect = (data: any) => {
    //navigate to user profile not yet implemented
    navigate(`/user/${data.username}`);
  };

  return (
    <div className="EventContainer">
      <div className="EventSubContainer">
        <div className="EventHeader">
          <div className="EventHeaderLeft">
            {event && (
              <>
                <h2>{event.createdBy}</h2>
                <p>area: {event.area}</p>
                <p>
                  grade:{" "}
                  {event.minGrade === null || event.minGrade === 0
                    ? 1
                    : event.minGrade}
                  -
                  {event.maxGrade === null || event.maxGrade === 0
                    ? 27
                    : event.maxGrade}
                </p>
                <p>
                  {event.date} {event.time}
                </p>
              </>
            )}
          </div>
          <div className="EventHeaderRight">
            <h2>Info:</h2>
            {event && (
              <p>
                {event.description === null
                  ? "No description provided"
                  : event.description}
              </p>
            )}
          </div>
        </div>
        <div className="EventBody">
          <div className="EventBodyLeft">
            <h2 style={{ marginTop: "10px", textAlign: "center" }}>
              Users:{" "}
              {event
                ? `${event.myGroupUsers.length}/${event.maxParticipants}`
                : ""}{" "}
            </h2>
            {event && (
              <DataTable
                value={event.myGroupUsers}
                selectionMode="single"
                onRowSelect={(e) => onSelect(e.data)}
              >
                <Column field="fullName"></Column>
              </DataTable>
            )}
          </div>
          <div className="EventBodyRight">
            <CommentsContainer id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
