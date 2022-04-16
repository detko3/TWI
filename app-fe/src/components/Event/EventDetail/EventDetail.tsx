import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import "./EventDetail.css";

const EventDetail = () => {
  let { id } = useParams();
  const [event, setEvent] = useState(null);
  const token = getToken();

  useEffect(() => {
    loadEvent();
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

  return (
    <div className="EventContainer">
      <div className="SubContainer">
        <div className="EventHeader"></div>
        <div className="EventBody">
          <div className="EventBodyLeft"></div>
          <div className="EventBodyRight"></div>
        </div>
        <p>Event {id}</p>
      </div>
    </div>
  );
};

export default EventDetail;
