import React from "react";

import Messages from "./Messages";
import Users from "./Users";

const Home = ({
  userId,
  token,
  usersOnline,
  setMessages,
  messages,
  userName,
  socket,
  pushMessage,
}) => {
  return (
    <div className="chat">
      <Users userId={userId} token={token} usersOnline={usersOnline} />
      <Messages
        userId={userId}
        setMessages={setMessages}
        messages={messages}
        userName={userName}
        socket={socket}
        pushMessage={pushMessage}
      />
    </div>
  );
};

export default Home;
