function TeoriaSendModal({ open, onClose }) {
  if (!open) return null;

  async function handleSendTeoria(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const API_URL = import.meta.env.VITE_API_URL;

    await fetch(`${API_URL}/teorias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.get("title"),
        story: data.get("story"),
        city: data.get("city"),
        state: data.get("state"),
        country: data.get("country"),
      }),
    });

    alert("📩 Story submitted for review!");
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Send new story</h2>

        <form onSubmit={handleSendTeoria}>
          <input name="title" placeholder="Title" required />
          <textarea
            name="story"
            placeholder="Tell your story..."
            rows="5"
            required
          />
          <input name="city" placeholder="City" />
          <input name="state" placeholder="State / Region" />
          <input name="country" placeholder="Country" />

          <p className="modal-warning">
            📩 The story will be evaluated before appearing on the map.
          </p>

          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeoriaSendModal;
