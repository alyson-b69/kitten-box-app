import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import logo from "../assets/images/kitten-box-logo.png";

export default function Header({ userName, logged, setLogged }) {
  let history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);

  const $ = (selector) => {
    return document.querySelector(selector);
  };

  let overlayMenu = $("div.nav-mobile-overlay#overlay-menu");
  let nav = $("header nav");

  const handleHamburger = () => {
    overlayMenu.classList.add("show");
    nav.classList.add("open");
    setOpenMenu(true);
  };

  const handleMenu = () => {
    if (openMenu === true) {
      overlayMenu.classList.remove("show");
      nav.classList.remove("open");
      setOpenMenu(false);
    }
  };

  let resetLocalStorage = async function () {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("isLogged");
    setLogged(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const logout = (history) => {
    resetLocalStorage().then(() => {
      history.push("/");
      refreshPage();
    });
  };

  return (
    <header>
      <div className="wrapper">
        <h1>
          <Link to="/" title="KITTEN BOX">
            <img src={logo} alt="logo kittenbox" width="50" height="50" />
            <span>KITTEN BOX</span>
          </Link>
        </h1>
        {logged ? (
          <>
            <nav onClick={handleMenu}>
              <ul>
                <li>
                  <strong>Menu</strong>
                </li>
                <li>
                  <Link to="/" title="Home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/my-messages" title="My messages">
                    My messages
                  </Link>
                </li>
                <li>
                  <Link to="/my-account" title="Account">
                    🐱 {userName}
                  </Link>
                </li>
                <button onClick={() => logout(history)}>Sign out</button>
              </ul>
            </nav>
            <div id="hamburger" onClick={handleHamburger}>
              <span></span> <span></span> <span></span>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
