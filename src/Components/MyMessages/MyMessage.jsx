import React from "react";
const myFunctions = require("../../assets/utils/myFunctions");

export default function MyMessage({ message, userId, userId2 }) {
  const date = myFunctions.datify(message.created_at);

  return (
    <li className={message.sender_id === parseInt(userId) ? "me" : ""}>
      <p>{message.message}</p>
      <span>🕗 {date}</span>
    </li>
  );
}
