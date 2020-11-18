import React, { useState } from "react";
import TabsLinks from "./Sign/TabsLinks";
import TabSignIn from "./Sign/TabSignIn";
import TabSignUp from "./Sign/TabSignUp";
import "../assets/css/Sign.css";

export default function Sign({ setToken, setUserId, setUserName, setLogged }) {
  const [activeTab, setActiveTab] = useState("sign-in");
  const [successMessage, setSuccessMessage] = useState(null);

  function displaySignIn(message = null) {
    if (message) {
      setSuccessMessage(message);
    }
    setActiveTab("sign-in");
  }
  function displaySignUp() {
    setActiveTab("sign-up");
  }

  return (
    <main id="sign-container">
      <div id="sign">
        <TabsLinks
          displaySignIn={displaySignIn}
          displaySignUp={displaySignUp}
          activeTab={activeTab}
        />
        <TabSignIn
          successMessage={successMessage}
          activeTab={activeTab}
          setToken={setToken}
          setUserId={setUserId}
          setUserName={setUserName}
          setLogged={setLogged}
        />
        <TabSignUp displaySignIn={displaySignIn} activeTab={activeTab} />
      </div>
    </main>
  );
}
