import React, { useState } from "react";
import { Link } from "react-router-dom";
import { videosData } from "../data/videosData";
import "./VideosPage.css";

/* MOCK DE VIDEOS APROVADOS */

const THEMES = ["Todos", "ETs", "Fantasmas", "Elite"];

function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [flagSearch, setFlagSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const filteredVideos = videosData
    .filter((v) => filter === "Todos" || v.theme === filter)
    .filter((v) =>
      flagSearch
        ? v.flags?.some((f) =>
            f.toLowerCase().includes(flagSearch.toLowerCase())
          )
        : true
    );

  const paginatedVideos = filteredVideos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function handleSendVideo(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    const body = `
Novo vídeo enviado para análise:

Título: ${data.get("title")}
Tema: ${data.get("theme")}
Data: ${data.get("date")}
Local: ${data.get("location")}

Resumo:
${data.get("resume")}

Link:
${data.get("link")}
    `;

    window.location.href = `mailto:gabiofarias@outlook.com?subject=Envio de Vídeo para Análise&body=${encodeURIComponent(
      body
    )}`;
  }

  return (
    <div className="videos-container">
      <header className="videos-header">
        <Link to="/" className="zunzuns-back">← Voltar</Link>
        <h1>🎬 Arquivos Visuais</h1>
        <p>Vídeos documentados sobre fenômenos e teorias</p>

        <button onClick={() => setShowForm(true)}>➕ Enviar vídeo</button>
      </header>

      {/* FILTROS */}
      <div className="videos-filters">
        {THEMES.map((t) => (
          <span
            key={t}
            className={`filter-badge ${filter === t ? "active" : ""}`}
            onClick={() => {
              setFilter(t);
              setPage(1);
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* BUSCA POR FLAG */}
      <div className="flag-search">
        <input
          placeholder="Buscar por flag (ET, Fantasma, Elite...)"
          value={flagSearch}
          onChange={(e) => setFlagSearch(e.target.value)}
        />
        <button onClick={() => setPage(1)}>OK</button>
      </div>

      {/* GRID */}
      <section className="videos-grid">
        {paginatedVideos.map((video) => (
          <div
            key={video.id}
            className="video-card"
            onClick={() => setSelectedVideo(video)}
          >
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-info">
              <h3>{video.title}</h3>

              <div className="video-flags">
                {video.flags?.map((f) => (
                  <span key={f} className="flag-badge">{f}</span>
                ))}
              </div>

              <p>{video.resume}</p>
            </div>
          </div>
        ))}
      </section>

      {/* PAGINAÇÃO */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredVideos.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {/* MODAL VIDEO */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal video-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedVideo.title}</h2>
            <p>
              📍 {selectedVideo.location} | 📅 {selectedVideo.date}
            </p>

            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              allowFullScreen
            />

            <div className="video-flags">
              {selectedVideo.flags?.map((f) => (
                <span key={f} className="flag-badge">{f}</span>
              ))}
            </div>

            <p>{selectedVideo.resume}</p>

            <button onClick={() => setSelectedVideo(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* MODAL ENVIO */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Enviar vídeo</h2>

            <form onSubmit={handleSendVideo}>
              <input name="title" placeholder="Título do vídeo" required />
              <input name="link" placeholder="Link do vídeo" required />
              <input name="location" placeholder="Local do acontecimento" />
              <input type="date" name="date" />

              <select name="theme">
                <option>ETs</option>
                <option>Fantasmas</option>
                <option>Elite</option>
              </select>

              <textarea
                name="resume"
                placeholder="Resumo do vídeo"
                rows="4"
              />

              <p className="form-note">
                📩 Envio via email: michaeljackson2009@gmail.com
                <br />
                O vídeo será analisado antes de ser publicado.
              </p>

              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideosPage;
