import React, { useEffect, useState } from "react";

import MyUsers from "./MyUsers";
import MyMessages from "./MyMessages";

const MyMessagesPerso = ({ userId, token, usersOnline }) => {
  const [userId2, setUserId2] = useState(null);

  return (
    <div className="chat">
      <MyUsers
        userId={userId}
        token={token}
        setUserId2={setUserId2}
        usersOnline={usersOnline}
      />
      <MyMessages userId={userId} userId2={userId2} token={token} />
    </div>
  );
};

export default MyMessagesPerso;
