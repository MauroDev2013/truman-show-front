function VideoReadModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{video.title}</h2>

        <p className="news-meta">
          🎥 {video.channel || "Unknown"} | 📅 {video.date}
        </p>

        {/* PLAYER */}
        {video.videoUrl ? (
          <div className="video-wrapper">
            <iframe
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p>⚠️ Video unavailable</p>
        )}

        <div className="video-flags">
          {video.flags.map((f) => (
            <span key={f} className="flag-badge">{f}</span>
          ))}
        </div>

        <p><strong>Summary:</strong><br />{video.resume}</p>

        <button onClick={onClose} className="button-read">
          Fechar
        </button>
      </div>
    </div>
  );
}

export default VideoReadModal;
