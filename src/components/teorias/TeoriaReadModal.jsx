function TeoriaReadModal({ story, onClose }) {
  if (!story) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{story.title}</h2>
        <p>{story.content}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TeoriaReadModal;
