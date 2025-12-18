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
          ← Voltar
        </Link>

        <h1>💬 Debate</h1>

        <p className="zunzuns-warning">
          ⚠️ Este chat é apagado todos os dias à meia-noite.<br />
          🤝 Respeito é essencial para manter o espaço saudável.
        </p>
      </header>

      <section className="zunzuns-chat">
        {messages.length === 0 ? (
          <div className="zunzuns-empty">
            <p>👀 Nenhuma mensagem ainda.</p>
            <p>Seja o primeiro a iniciar o debate.</p>
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
          placeholder="Digite sua mensagem..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

export default DebatePage;
