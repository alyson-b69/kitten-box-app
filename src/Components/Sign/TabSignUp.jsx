import React, { useState } from "react";
import API_URL from "../../assets/utils/config";

export default function TabSignUp({ activeTab, displaySignIn }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [formError, setFormError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    e.persist();
    if (password === password2) {
      fetch(`${API_URL}/subscribe`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => {
          setFormError("");
          setEmail("");
          setName("");
          setPassword("");
          setPassword2("");
          return res.json();
        })
        .then((res) => {
          if (res === "User added") {
            displaySignIn("Account created, please Sign-In");
          } else {
            if (res.errors) {
              return setFormError(res.errors.errors[0].msg);
            } else if (res.err) {
              return setFormError(res.err.sqlMessage);
            } else if (res.duplicate) {
              return setFormError(res.duplicate);
            } else {
              return setFormError(res.statusText);
            }
          }
        });
    } else {
      setPassword("");
      setPassword2("");
      setFormError("Passwords are not the same");
    }
  };

  function handleEmailChange(e) {
    e.persist();
    setEmail(e.target.value);
  }

  function handleNameChange(e) {
    e.persist();
    setName(e.target.value);
  }

  function handlePasswordChange(e) {
    e.persist();
    setPassword(e.target.value);
  }

  function handlePassword2Change(e) {
    e.persist();
    setFormError("");
    setPassword2(e.target.value);
  }

  return (
    <div
      className={"tab " + (activeTab === "sign-up" ? "active" : "")}
      id="tab-sign-up"
    >
      <form id="form-sign-up" onSubmit={handleSignUp} autoComplete="off">
        <p>
          <input
            type="text"
            name="name"
            id="up_name"
            autoComplete="off"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter you username"
            required
          />
        </p>
        <p>
          <input
            type="text"
            name="email"
            id="up_email"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter you email"
            required
          />
        </p>

        <p>
          <input
            type="password"
            name="password"
            id="up_password"
            autoComplete="off"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            minLength="8"
            maxLength="12"
            required
          />
        </p>
        <p>
          <input
            type="password"
            name="password2"
            id="up_password2"
            autoComplete="off"
            value={password2}
            placeholder="Repeat your password"
            onChange={handlePassword2Change}
            minLength="8"
            maxLength="12"
            required
          />
        </p>
        <p>
          <input type="submit" value="Sign up" />
        </p>
        <p className="error">{formError ?? ""}</p>
      </form>
    </div>
  );
}
