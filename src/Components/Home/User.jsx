import React from "react";
import { useHistory } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";

export default function User({ user, usersOnline }) {
  let history = useHistory();
  const viewUser = () => {
    history.push(`/users/${user.id}`);
  };

  return (
    <li>
      <button onClick={viewUser}>
        🐱 {user.name}
        <span
          className={usersOnline.includes(user.id) ? "isOnline" : "isOffline"}
        >
          <BsFillCircleFill />
        </span>
      </button>
    </li>
  );
}
