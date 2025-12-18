function NewsSendModal({ open, onClose }) {
  if (!open) return null;

  async function handleSendNews(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const API_URL = import.meta.env.VITE_API_URL

    await fetch(`${API_URL}/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theory: data.get("theory"),
        mainFlag: data.get("mainFlag"),
        secondaryFlags: data
          .get("secondaryFlags")
          ?.split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      }),
    });

    alert("📩 Notícia enviada com sucesso!");
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Enviar teoria</h2>

        <form onSubmit={handleSendNews}>
          {/* FLAG PRINCIPAL */}
          <select name="mainFlag" required>
            <option value="">Flag principal</option>
            <option value="ET">ET</option>
            <option value="Elite">Elite</option>
            <option value="Fantasma">Fantasma</option>
            <option value="Encobrimento">Encobrimento</option>
          </select>

          {/* FLAGS SECUNDÁRIAS */}
          <input
            name="secondaryFlags"
            placeholder="Flags secundárias (opcional, separadas por vírgula)"
          />

          {/* TEORIA */}
          <textarea
            name="theory"
            placeholder="Explique a teoria da notícia e deixe o link da notícia"
            rows="5"
            required
          />

          {/* AÇÕES */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn-submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsSendModal;
