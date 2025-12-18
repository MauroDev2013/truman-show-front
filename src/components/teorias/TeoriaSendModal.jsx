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

    alert("📩 História enviada para avaliação!");
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Enviar nova história</h2>

        <form onSubmit={handleSendTeoria}>
          <input name="title" placeholder="Título" required />
          <textarea
            name="story"
            placeholder="Conte a história..."
            rows="5"
            required
          />
          <input name="city" placeholder="Cidade" />
          <input name="state" placeholder="Estado / Região" />
          <input name="country" placeholder="País" />

          <p className="modal-warning">
            📩 A história será avaliada antes de aparecer no mapa.
          </p>

          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeoriaSendModal;
