import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import notification from "./assets/notification.png";
function App() {
  const [name, setName] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("update", (data) => {
      setName(data?.name);
    });
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Pay Notifications</h1>
        <div className="notificationP">
          <span className="notifyNo"></span>
          <img src={notification} className="notifyImg" alt="bell icon" />
        </div>
      </header>
      <h1 style={{ textAlign: "center" }}>Hello {name}</h1>
    </div>
  );
}

export default App;
