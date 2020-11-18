import React from "react";
const myFunctions = require("../../assets/utils/myFunctions");

export default function Message({ message, userId }) {
  let date = "";
  if (message.type === "message") {
    date = myFunctions.datify(message.created_at);
    return (
      <li className={parseInt(message.id) === parseInt(userId) ? "me" : ""}>
        <strong>😻 {message.name}</strong>
        <p>{message.message}</p>
        <span>🕗 {date}</span>
      </li>
    );
  }

  if (message.type === "login" || message.type === "logout") {
    return (
      <li className="broadcast">
        👤
        <p>
          {message.userName}
          {message.content}
        </p>
      </li>
    );
  } else if (message.type === "message") {
    return (
      <li className={message.sender_id === parseInt(userId) ? "me" : ""}>
        <strong>&#128571 ${message.name}</strong>
        <p>{message.message}</p>
        <span>🕗 {date}</span>
      </li>
    );
  } else {
    return <li className="nomessage">No message</li>;
  }
}
