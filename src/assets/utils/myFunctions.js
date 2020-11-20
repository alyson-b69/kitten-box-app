class myFunctions {
  static datify(date) {
    const day = date.split("-")[2].split("T")[0];
    const month = date.split("-")[1];
    const year = date.split("-")[0];
    const hours = parseInt(date.split("T")[1].split(":")[0]) + 1;
    const minutes = date.split("T")[1].split(":")[1];
    return day + "/" + month + "/" + year + " - " + hours + "h" + minutes;
  }

  static logout({ setToken }) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    setToken(null);
  }

  static postMessage(message, setWrittenMessage, token) {
    fetch("https://kitten-box-api.wild-dev.com/messages", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
      body: message,
    })
      .then((res) => {
        return res.status;
      })
      .then(() => {
        setWrittenMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = myFunctions;
