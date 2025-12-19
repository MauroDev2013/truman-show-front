import ReturnIcon from "../assets/icons/ReturnIcon";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DebatePage.css";

function DebatePage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "Você",
      content: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setText("");
  }

  return (
    <main className="zunzuns-container">
      <header className="zunzuns-header">
        <Link to="/" className="zunzuns-back">
          <ReturnIcon className="btn-icon" /> 
        </Link>

        <h1 className="title-page" >💬 Discussion</h1>

        <p className="zunzuns-warning">
          ⚠️ This chat is deleted every day at midnight.<br />
          🤝 Respect is essential for maintaining a healthy space.
        </p>
      </header>

      <section className="zunzuns-chat">
        {messages.length === 0 ? (
          <div className="zunzuns-empty">
            <p>👀 None yet.</p>
            <p>Start a debate.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="zunzuns-message">
              <div className="zunzuns-meta">
                <span className="zunzuns-user">{msg.user}</span>
                <span className="zunzuns-time">{msg.time}</span>
              </div>
              <p className="zunzuns-text">{msg.content}</p>
            </div>
          ))
        )}
      </section>

      <form className="zunzuns-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="tap your menssage..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export default DebatePage;
