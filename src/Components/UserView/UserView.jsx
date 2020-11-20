import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import myFunctions from "../../assets/utils/myFunctions";
import API_URL from "../../assets/utils/config";

const UserView = ({ userId, token, socket }) => {
  const history = useHistory();
  const userId2 = window.location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(true);
  const [userProfil, setUserProfil] = useState("");
  const [writtenMessage, setWrittenMessage] = useState("");

  const submitMessage = async (e) => {
    e.preventDefault();
    e.persist();

    // let date = new Date();
    const newMessage = JSON.stringify({
      sender_id: parseInt(userId),
      receiver_id: parseInt(userId2),
      message: writtenMessage,
      // created_at: date,
    });

    return myFunctions.postMessage(newMessage, setWrittenMessage, token);
    // history.push("/my-messages");

    // socket.emit("message", newMessage);
  };

  const handleWrittenMessageChange = (e) => {
    e.preventDefault();
    setWrittenMessage(e.target.value);
  };

  useEffect(() => {
    fetch(`${API_URL}/users/${parseInt(userId2)}`, {
      headers: {
        token: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setUserProfil(result[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId2]);

  if (isLoading) {
    return <div className="chat">Loading</div>;
  } else if (userProfil) {
    return (
      <div className="chat">
        <aside id="wrapper-users-home">
          <h3>Welcome to {userProfil.name}'s profile </h3>
          <p>To start a conversation, you can write to him here :</p>
          <br />
          <form
            id="form-single-Message"
            onSubmit={(e) =>
              submitMessage(e).then(() => {
                history.push("/my-messages");
              })
            }
          >
            <textarea
              rows="6"
              name="message"
              id="message"
              value={writtenMessage}
              autoComplete="off"
              onChange={handleWrittenMessageChange}
              required
            />
            <input type="submit" value="Send a message" id="submit-message" />
          </form>
        </aside>
      </div>
    );
  } else {
    return <div>Problème</div>;
  }
};

export default UserView;
