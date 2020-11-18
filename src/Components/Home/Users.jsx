import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import User from "./User";

export default function Users({ userId, usersOnline, token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);
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
    fetch(`http://localhost:3001/users/?userId=${userId}`, {
      headers: {
        token: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setUsers(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, userId]);

  return (
    <aside id="wrapper-users">
      <h3>
        <div>
          All the kittens <br />
          <p>{usersOnline.length} online</p>
        </div>
        <span id="my-messages-users-list-chevron" onClick={handleUsers}>
          <FaChevronDown />
        </span>
      </h3>
      <ul id="my-messages-users-list">
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          users.map((elem) => (
            <User key={elem.id} user={elem} usersOnline={usersOnline}></User>
          ))
        )}
      </ul>
    </aside>
  );
}
