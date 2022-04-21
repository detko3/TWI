import moment from "moment";
import { useState } from "react";
import "./Message.css";

const Message = ({ message, user }: any) => {
  return (
    <div className="MessagesContainer">
      <div
        className="MessageContainer"
        style={
          user === message.createdBy
            ? { marginLeft: "auto", backgroundColor: "#ecc6ec" }
            : {}
        }
      >
        <div className="MessageHeader">
          <p>{message.createdBy}</p>{" "}
          <p style={{ marginLeft: "10px" }}>
            {moment(message.createdDate).format("YYYY/MM/D,  hh:mm:ss")}
          </p>
        </div>
        <div className="MessageText">
          <p>{message.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
