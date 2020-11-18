import React, { useState, useEffect } from "react";
import Message from "./Message";

export default function Messages({
  userId,
  userName,
  userId2,
  setMessages,
  messages,
  socket,
}) {
  const [writtenMessage, setWrittenMessage] = useState("");

  useEffect(() => {
    const element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
  }, [messages]);

  const handleWritterMessageChange = (e) => {
    e.preventDefault();
    setWrittenMessage(e.target.value);
  };

  const submitMessage = async (e) => {
    let date = new Date().toISOString();
    e.preventDefault();

    let newMessage = {
      type: "message",
      id: userId,
      name: userName,
      message: writtenMessage,
      created_at: date,
    };

    setMessages((msgs) => [...msgs, newMessage]);
    setWrittenMessage("");
    return socket.emit("message", newMessage);
  };

  return (
    <section id="messages-list">
      <ul className="messages" id="messages">
        {messages.length
          ? messages.map((elem) => (
              <Message
                key={elem.created_at + elem.message + elem.content + Date()}
                message={elem}
                userId={userId}
                userId2={userId2}
              />
            ))
          : ""}
      </ul>
      <form
        id="form"
        onSubmit={(e) =>
          submitMessage(e).then(() => {
            const element = document.getElementById("messages");
            element.scrollTop = element.scrollHeight;
          })
        }
      >
        <input
          type="text"
          name="message"
          id="message"
          autoComplete="off"
          onChange={handleWritterMessageChange}
          value={writtenMessage}
        />
        <button type="sumbit" id="submit-message">
          <p>➜</p>
        </button>
      </form>
    </section>
  );
}
