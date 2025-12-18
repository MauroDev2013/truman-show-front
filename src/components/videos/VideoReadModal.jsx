function VideoReadModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{video.title}</h2>

        <p className="news-meta">
          🎥 {video.channel} | 📅 {video.date}
        </p>

        <div className="video-flags">
          {video.flags.map((f) => (
            <span key={f} className="flag-badge">{f}</span>
          ))}
        </div>

        <p><strong>Relacionado a:</strong> {video.relatedTo.join(", ")}</p>
        <p><strong>Resumo:</strong><br />{video.resume}</p>
        <p><strong>Teoria:</strong><br />{video.theory}</p>

        <a href={video.link} target="_blank" rel="noreferrer">
          ▶️ Assistir vídeo
        </a>

        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default VideoReadModal;
