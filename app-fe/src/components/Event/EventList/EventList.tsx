import { useState } from "react";
import "./EventList.css";

const EventList = () => {
  const [events, setEvents] = useState(null);

  return (
    <div className="EventContainer">
      <div className="SubContainer">
        <h2>Events</h2>
      </div>
    </div>
  );
};

export default EventList;
