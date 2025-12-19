function NewsReadModal({ news, onClose }) {
  if (!news) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{news.title}</h2>

        <p className="news-meta">
          🗞 {news.source} | 📅 {news.date}
        </p>

        <div className="news-flags">
          {news.flags.map((f) => (
            <span key={f} className="flag-badge">{f}</span>
          ))}
        </div>

        <p><strong>Related to:</strong> {news.relatedTo.join(", ")}</p>
        <p><strong>Summary:</strong><br />{news.resume}</p>
        <p><strong>Theory:</strong><br />{news.theory}</p>

        <a href={news.link} target="_blank" rel="noreferrer">
          🔗 See original news article 
        </a>

        <button onClick={onClose} className="button-read">Close</button>
      </div>
    </div>
  );
}

export default NewsReadModal;
