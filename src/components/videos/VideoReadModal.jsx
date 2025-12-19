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

        <p><strong>Related to:</strong> {video.relatedTo.join(", ")}</p>
        <p><strong>Summary:</strong><br />{video.resume}</p>
        <p><strong>Theory:</strong><br />{video.theory}</p>

        <a href={video.link} target="_blank" rel="noreferrer">
          ▶️ Watch video
        </a>

        <button onClick={onClose} className="button-read">Fechar</button>
      </div>
    </div>
  );
}

export default VideoReadModal;
