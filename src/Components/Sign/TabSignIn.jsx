import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../../assets/utils/config";

export default function TabSignIn({
  activeTab,
  setToken,
  successMessage,
  setUserId,
  setUserName,
  setLogged,
}) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessageRender, setSuccessMesssageRender] = useState(null);

  useEffect(() => {
    if (typeof successMessage !== "object") {
      setSuccessMesssageRender(successMessage);
    }
  }, [successMessage]);

  const handleSignIn = (e) => {
    e.preventDefault();
    e.persist();
    fetch(`${API_URL}/login`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setToken(res.token);
        setUserId(res.id);
        setUserName(res.name);
        setLogged(true);
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id);
        localStorage.setItem("name", res.name);
        localStorage.setItem("isLogged", true);
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleEmailChange(e) {
    e.persist();
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    e.persist();
    setPassword(e.target.value);
  }

  return (
    <div
      className={"tab " + (activeTab === "sign-in" ? "active" : "")}
      id="tab-sign-in"
    >
      <form id="form-sign-in" onSubmit={handleSignIn}>
        <p>
          <input
            type="email"
            name="email"
            id="in_email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
            required
          />
        </p>
        <p>
          <input
            type="password"
            name="password"
            id="in_password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            minLength="8"
            maxLength="24"
            required
          />
        </p>
        <p>
          <input type="submit" value="Sign in" />
        </p>
        <p className="error">
          {successMessageRender ? successMessageRender : ""}
        </p>
      </form>
    </div>
  );
}
