import React, { useState, useEffect } from "react";
import API_URL from "../../assets/utils/config";

export default function MyAccount({ userId, token, setUserName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/users/${userId}`, {
        headers: {
          token: token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setName(result[0].name);
          setEmail(result[0].email);
          setPassword("");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId, token]);

  const handleNameChange = (e) => {
    e.preventDefault(e);
    setName(e.target.value.toString());
  };

  const handleEmailChange = (e) => {
    e.preventDefault(e);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault(e);
    setPassword(e.target.value);
  };

  const formAccountSubmit = (e) => {
    e.preventDefault();
    e.persist();
    fetch(`${API_URL}/subscribe/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.status === 202) {
          return res.json();
        } else {
          console.log(res);
          return res.json();
        }
      })
      .then((res) => {
        setPassword("");
        if (res.errors) {
          alert(res.errors[0].msg);
        } else {
          setUserName(name);
          alert("Your profil is updated !");
        }
      });
  };

  return (
    <aside id="wrapper-account">
      <h3>My Account</h3>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form id="form-account" onSubmit={formAccountSubmit} autoComplete="off">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Change profil</button>
        </form>
      )}
    </aside>
  );
}
