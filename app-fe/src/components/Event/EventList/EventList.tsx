import axios from "axios";
import { useEffect, useState } from "react";
import getToken from "../../../data/getToken";
import EventView from "../EventView/EventView";
import { Buffer } from "buffer";
import "./EventList.css";
import EventDialog from "../EventDialog/EventDialog";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [inactive, setInactive] = useState(false);
  const token = getToken();

  useEffect(() => {
    loadEvents();
  }, [inactive]);

  const refreshData = () => {
    loadEvents();
  };

  const loadEvents = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/climbing-events/${inactive}`,
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          console.log("Events: ", res.data);
          setEvents(res.data);
          // console.log(climbed);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onActiveChange = (value: boolean) => {
    setInactive(value);
  };

  return (
    <div className="EventContainer">
      <div className="SubContainer">
        <h2>Events</h2>
        <EventView
          events={events}
          token={token}
          onActiveChange={onActiveChange}
        />
        <EventDialog refresh={refreshData} />
      </div>
    </div>
  );
};

export default EventList;
