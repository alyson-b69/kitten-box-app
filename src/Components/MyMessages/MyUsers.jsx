import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import User from "./MyUser";

export default function Users({ userId, setUserId2, token, usersOnline }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState(null);
  const [openUsers, setOpenUsers] = useState(false);

  const $ = (selector) => {
    return document.querySelector(selector);
  };

  let usersList = $("#my-messages-users-list");
  let chevron = $("#my-messages-users-list-chevron");

  const handleUsers = () => {
    if (openUsers === true) {
      usersList.classList.remove("show");
      chevron.classList.remove("open");
      setOpenUsers(false);
    } else {
      usersList.classList.add("show");
      chevron.classList.add("open");
      setOpenUsers(true);
    }
  };

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3001/users/messages?userId=${userId}`, {
        headers: {
          token: token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setUserList(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  return (
    <aside id="wrapper-users">
      <h3>
        My kittens{" "}
        <span id="my-messages-users-list-chevron" onClick={handleUsers}>
          <FaChevronDown />
        </span>
      </h3>
      <ul id="my-messages-users-list">
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          userList.map((elem) => (
            <User
              key={elem.id}
              user={elem}
              setUserId2={setUserId2}
              usersOnline={usersOnline}
            ></User>
          ))
        )}
      </ul>
    </aside>
  );
}
