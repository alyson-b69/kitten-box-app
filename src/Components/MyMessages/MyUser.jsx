import React from "react";
import { BsFillCircleFill } from "react-icons/bs";

export default function MyUser({ user, setUserId2, usersOnline }) {
  const showMessages = () => {
    setUserId2(user.id);
  };

  return (
    <li>
      <button onClick={showMessages}>
        🐱 {user.name}{" "}
        <span
          className={usersOnline.includes(user.id) ? "isOnline" : "isOffline"}
        >
          <BsFillCircleFill />
        </span>
      </button>
    </li>
  );
}
