import React, { useState } from "react";
import { Link } from "react-router-dom";
import { videosData } from "../data/videosData";
import VideoReadModal from "../components/videos/VideoReadModal";
import VideoSendModal from "../components/videos/VideoSendModal";
import ReturnIcon from "../assets/icons/ReturnIcon";
import "./VideosPage.css";

const THEMES = ["All", "Aliens", "Elite", "Manipulation"];

function VideoPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("All");
  const [flagSearch, setFlagSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const filteredVideos = videosData
    .filter((v) => filter === "All" || v.theme === filter)
    .filter((v) =>
      flagSearch
        ? v.flags.some((f) =>
            f.toLowerCase().includes(flagSearch.toLowerCase())
          )
        : true
    );

  const paginatedVideos = filteredVideos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="videos-container">
      <header className="videos-header">
        <Link to="/" className="zunzuns-back">
          <ReturnIcon className="btn-icon" /> 
        </Link>
        <h1>🎬 Files & Videos</h1>
        <p>Videos connected to theories</p>
        <button onClick={() => setShowForm(true)}>➕ Send video</button>
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
          placeholder="Search by flag (ET, Ghosts , Elite...)"
          value={flagSearch}
          onChange={(e) => {
            setFlagSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* GRID */}
      <section className="videos-grid">
        {paginatedVideos.map((video) => (
          <div
            key={video.id}
            className="videos-card"
            onClick={() => setSelectedVideo(video)}
          >
            <img src={video.thumbnail} alt={video.title} />
            <div className="videos-info">
              <h3>{video.title}</h3>

              <div className="videos-flags">
                {video.flags.map((f) => (
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

      {/* MODAIS */}
      <VideoReadModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <VideoSendModal
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}

export default VideoPage;
