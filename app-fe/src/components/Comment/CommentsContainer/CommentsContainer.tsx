import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import getToken from "../../../data/getToken";
import { Buffer } from "buffer";
import "./CommentsContainer.css";
import Message from "../Message/Message";
// @ts-ignore
import SockJsClient from "react-stomp";
// @ts-ignore
import SockJS from "sockjs-client";
// @ts-ignore
import Stomp from "stompjs";

const SOCKET_URL = "http://localhost:8080/ws-message";

const CommentsContainer = ({ id }: any) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([]);
  const token = getToken();

  useEffect(() => {
    loadComments();
  }, []);

  const sendComment = () => {
    if (comment !== null && comment.trim() != "") {
      // console.log("COMMENT: ", id);
      postComment();
    }
  };

  const postComment = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/climbing-events/climbing-event/comment`,
          {
            eventId: id,
            comment: comment,
          },
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          if (res.data === "Created") {
            setComment("");
            // loadComments();
            stompClient.send("/app/sendMessage", {}, comment);
          } else {
            console.log("Error occured: ", res.data);
          }
        })
        .catch((error) => {
          console.log("Error occured: ", error);
        });
    }
  };

  const loadComments = () => {
    if (token !== null && token !== undefined) {
      const base64data = Buffer.from(
        token.username + ":" + token.password
      ).toString("base64");
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/climbing-events/climbing-event/${id}/comments`,
          {
            withCredentials: false,
            headers: { Authorization: "Basic " + base64data },
          }
        )
        .then((res) => {
          console.log("Comments: ", res.data);
          setComments(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const ws = new SockJS("http://localhost:8080/ws-message");
  let stompClient = Stomp.over(ws);

  useEffect(() => {
    ws.onopen = () => {
      console.log("open");
    };

    stompClient.connect({}, function (frame: any) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/public", function (greeting: any) {
        console.log(greeting);
        loadComments();
      });
    });

    ws.onclose = () => {
      console.log("close");
      stompClient.disconnect();
    };
    //you can execute any function here   });});
    //clean up function
    return () => ws.close();
  }, []);

  return (
    <div className="CommentContainer">
      <div className="CommentsArea">
        {comments.map((item: any) => {
          // console.log(item);
          return <Message key={item.id} message={item} user={token.username} />;
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="CommentInput">
        <InputText
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Button icon="pi pi-caret-right" onClick={sendComment} />
      </div>
    </div>
  );
};

export default CommentsContainer;
