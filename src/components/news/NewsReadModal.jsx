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

        <p><strong>Relacionado a:</strong> {news.relatedTo.join(", ")}</p>
        <p><strong>Resumo:</strong><br />{news.resume}</p>
        <p><strong>Teoria:</strong><br />{news.theory}</p>

        <a href={news.link} target="_blank" rel="noreferrer">
          🔗 Ver notícia original
        </a>

        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default NewsReadModal;
