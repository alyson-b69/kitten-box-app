import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";

import "./assets/css/Reset.css";
import "./assets/css/Index.css";

import Sign from "./Components/Sign";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import MyMessagesPerso from "./Components/MyMessages/MyMessagesPerso";
import MyAccount from "./Components/MyAccount/MyAccount";
import UserView from "./Components/UserView/UserView";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [logged, setLogged] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const SocketIOServer = "http://localhost:3001";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("id"));
    setUserName(localStorage.getItem("name"));
    setLogged(localStorage.getItem("isLogged"));
  }, []);

  useEffect(() => {
    if (userId) {
      const socket = socketIOClient(SocketIOServer);
      socket.emit("user", { userId, userName });

      socket.on("log", (data) => {
        setMessages((msgs) => [...msgs, data]);
      });

      socket.on("message", (message) => {
        setMessages((msgs) => [...msgs, message]);
      });

      socket.on("info", (data) => {
        if (data.type === "users-list") {
          let onlineId = data.content.map((item) => item.id);
          setUsersOnline(onlineId);
        }
      });

      setSocket(socket);
    }
  }, [logged]);

  const $ = (selector) => {
    return document.querySelector(selector);
  };

  let overlayMenu = $("div.nav-mobile-overlay#overlay-menu");
  let nav = $("header nav");

  const handleOverlay = () => {
    overlayMenu.classList.remove("show");
    nav.classList.remove("open");
  };

  return (
    <div className="App">
      <div
        className="nav-mobile-overlay"
        id="overlay-menu"
        onClick={handleOverlay}
      ></div>
      <Router>
        <div>
          <Header
            userName={userName}
            setToken={setToken}
            setLogged={setLogged}
            logged={logged}
          />
          <main>
            <Switch>
              <Route exact path="/">
                {logged ? (
                  <Home
                    userId={userId}
                    token={token}
                    usersOnline={usersOnline}
                    setMessages={setMessages}
                    messages={messages}
                    userName={userName}
                    socket={socket}
                  />
                ) : (
                  <Sign
                    setLogged={setLogged}
                    setToken={setToken}
                    setUserId={setUserId}
                    setUserName={setUserName}
                  />
                )}
              </Route>

              <Route path="/my-messages">
                <MyMessagesPerso
                  userId={userId}
                  token={token}
                  socket={socket}
                  usersOnline={usersOnline}
                />
              </Route>
              <Route path="/users/:id">
                <UserView userId={userId} token={token} socket={socket} />
              </Route>
              <Route path="/my-account">
                <MyAccount
                  userId={userId}
                  token={token}
                  setUserName={setUserName}
                />
              </Route>
            </Switch>
          </main>
          <div className="nav-mobile-overlay" id="overlay-menu"></div>
          <div className="nav-mobile-overlay" id="overlay-filters"></div>
        </div>
      </Router>
    </div>
  );
}

export default App;
