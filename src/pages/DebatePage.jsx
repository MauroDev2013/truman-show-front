import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import ReturnIcon from "../assets/icons/ReturnIcon";
import "./DebatePage.css";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL, {
  transports: ["websocket"],
});

function DebatePage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    socket.on("chat:init", setMessages);

    socket.on("chat:new", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chat:cleared", () => setMessages([]));

    socket.on("auth:success", () => setIsAdmin(true));

    socket.on("chat:banned", () => {
      alert("⛔ You were banned");
    });

    return () => {
      socket.off("chat:init");
      socket.off("chat:new");
      socket.off("chat:cleared");
      socket.off("auth:success");
      socket.off("chat:banned");
    };
  }, []);

  function send(e) {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit("chat:send", text);
    setText("");
  }

  function adminLogin() {
    const key = prompt("Admin key:");
    if (key) socket.emit("auth", key);
  }

  return (
    <main className="zunzuns-container">
      <header className="zunzuns-header">
        <Link to="/" className="zunzuns-back">
          <ReturnIcon className="btn-icon" />
        </Link>

        <h1 className="title-page">💬 Discussion</h1>

        <p className="zunzuns-warning">
          Chat resets at midnight · No media allowed
        </p>

        {!isAdmin && (
          <button onClick={adminLogin}>🔑</button>
        )}
      </header>

      <section className="zunzuns-chat">
        {messages.map((msg) => (
          <div key={msg.id} className="zunzuns-message">
            <div className="zunzuns-meta">
              <span
                className={
                  msg.role === "owner"
                    ? "zunzuns-user owner"
                    : "zunzuns-user"
                }
              >
                {msg.user}
              </span>
              <span>{msg.time}</span>
            </div>

            <p>{msg.content}</p>

            {isAdmin && msg.role !== "owner" && (
              <div className="admin-actions">
                <button
                  onClick={() =>
                    socket.emit("chat:mute", msg.socketId)
                  }
                >
                  🔇
                </button>
                <button
                  onClick={() =>
                    socket.emit("chat:ban", msg.socketId)
                  }
                >
                  ⛔
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      <form className="zunzuns-form" onSubmit={send}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export default DebatePage;
