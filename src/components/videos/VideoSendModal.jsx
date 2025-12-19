function VideoSendModal({ open, onClose }) {
  if (!open) return null;

  async function handleSendVideo(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const API_URL = import.meta.env.VITE_API_URL;

    await fetch(`${API_URL}/videos`, {
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
        videoUrl: data.get("videoUrl"), 
      }),
    });

    alert("🎬 Video sent successfully!");
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Send video</h2>

        <form onSubmit={handleSendVideo}>
          <select name="mainFlag" required>
            <option value="">Main flag</option>
            <option value="ET">Alien</option>
            <option value="Elite">Elite</option>
            <option value="Fantasma">Ghost</option>
            <option value="Encobrimento">conspiracy</option>
          </select>

          <input
            name="secondaryFlags"
            placeholder="Secondary flags (optional, separated by commas), FJF, area 51, Elvis"
          />

          <input
            name="videoUrl"
            placeholder="Link to the video (YouTube, etc.)"
            required
          />

          <textarea
            name="theory"
            placeholder="Explain the theory behind the video."
            rows="5"
            required
          />

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn-submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoSendModal;
