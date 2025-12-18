import React, { useState } from "react";
import { Link } from "react-router-dom";
import { newsData } from "../data/newsData";
import NewsReadModal from "../components/news/NewsReadModal";
import NewsSendModal from "../components/news/NewsSendModal";
import "./NewsPage.css";

const THEMES = ["Todos", "ETs", "Elite", "Manipulação"];

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [flagSearch, setFlagSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const filteredNews = newsData
    .filter((n) => filter === "Todos" || n.theme === filter)
    .filter((n) =>
      flagSearch
        ? n.flags.some((f) =>
            f.toLowerCase().includes(flagSearch.toLowerCase())
          )
        : true
    );

  const paginatedNews = filteredNews.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="news-container">
      <header className="news-header">
        <Link to="/" className="zunzuns-back">← Voltar</Link>
        <h1>📰 Arquivos & Notícias</h1>
        <p>Fatos reais conectados a teorias</p>
        <button onClick={() => setShowForm(true)}>➕ Enviar notícia</button>
      </header>

      {/* FILTROS */}
      <div className="news-filters">
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
          onChange={(e) => {
            setFlagSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* GRID */}
      <section className="news-grid">
        {paginatedNews.map((news) => (
          <div
            key={news.id}
            className="news-card"
            onClick={() => setSelectedNews(news)}
          >
            <img src={news.thumbnail} alt={news.title} />
            <div className="news-info">
              <h3>{news.title}</h3>

              <div className="news-flags">
                {news.flags.map((f) => (
                  <span key={f} className="flag-badge">{f}</span>
                ))}
              </div>

              <p>{news.resume}</p>
            </div>
          </div>
        ))}
      </section>

      {/* PAGINAÇÃO */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredNews.length / ITEMS_PER_PAGE) },
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

      {/* MODAIS */}
      <NewsReadModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      <NewsSendModal
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}

export default NewsPage;
