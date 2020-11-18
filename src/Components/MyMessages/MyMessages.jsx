import React, { useState, useEffect } from "react";
import MyMessage from "./MyMessage";
import API_URL from "../../assets/utils/config";

export default function Messages({ userId, userId2, token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState(null);
  const [writtenMessage, setWrittenMessage] = useState("");

  const handleWritterMessageChange = (e) => {
    e.preventDefault();
    setWrittenMessage(e.target.value);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    // e.persist();
    fetch(`${API_URL}/messages`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        sender_id: parseInt(userId),
        receiver_id: parseInt(userId2),
        message: writtenMessage,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    setWrittenMessage("");
  };

  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/messages/?userId=${userId}&userId2=${userId2}`, {
        headers: {
          token: token,
        },
      })
        .then((response) => {
          setIsLoading(false);
          return response.json();
        })
        .then((result) => {
          setMessages(result);
          const element = document.getElementById("messages");
          element.scrollTop = element.scrollHeight;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId, userId2]);

  return (
    <section id="messages-list">
      {isLoading ? (
        <ul className="messages" id="messages">
          <li>Loading ...</li>
        </ul>
      ) : userId2 ? (
        <>
          <ul className="messages" id="messages">
            {messages.length ? (
              messages.map((elem) => (
                <MyMessage
                  key={elem.id}
                  message={elem}
                  userId={userId}
                  userId2={userId2}
                />
              ))
            ) : (
              <li className="nomessage">Not yet messages</li>
            )}
          </ul>
          <form id="form" onSubmit={submitMessage}>
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
        </>
      ) : (
        <ul className="messages" id="messages">
          <li className="nomessage">
            Click on one kitten to open a conversation
          </li>
        </ul>
      )}
    </section>
  );
}
