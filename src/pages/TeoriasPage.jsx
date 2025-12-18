import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TeoriasPage.css";
import { renderToStaticMarkup } from "react-dom/server";
import GhostIcon from "../assets/icons/GhostIcon";
import UfoIcon from "../assets/icons/UfoIcon";
import BloodIcon from "../assets/icons/BloodIcon";

import { teoriasStories } from "../data/teoriasStories";

/* ICONES DO MAPA (MENORES E TEMÁTICOS) */
const icons = {
  ghost: new L.DivIcon({
    html: renderToStaticMarkup(<GhostIcon width={18} height={18} />),
    className: "leaflet-react-icon",
    iconSize: [18, 18],
    iconAnchor: [9, 18],
  }),

  alien: new L.DivIcon({
    html: renderToStaticMarkup(<UfoIcon width={18} height={18} />),
    className: "leaflet-react-icon",
    iconSize: [18, 18],
    iconAnchor: [9, 18],
  }),

  conspiracy: new L.DivIcon({
    html: renderToStaticMarkup(<BloodIcon width={18} height={18} />),
    className: "leaflet-react-icon",
    iconSize: [18, 18],
    iconAnchor: [9, 18],
  }),
};


function TeoriasPage() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    story: "",
    city: "",
    state: "",
    country: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    const body = `
Nova história enviada para avaliação:

Título: ${form.title}

Local:
Cidade: ${form.city}
Estado: ${form.state}
País: ${form.country}

História:
${form.story}
    `;

    window.location.href = `mailto:gabiofarias@outlook.com?subject=Nova Teoria Enviada&body=${encodeURIComponent(
      body
    )}`;
  }

  return (
    <div className="teorias-container">
      <header className="teorias-header">
        <Link to="/" className="zunzuns-back">
          ← Voltar
        </Link>
        <h1>🌍 Mapa das Teorias</h1>
        <p>Clique nos símbolos para explorar histórias ocultas</p>
        <button onClick={() => setShowForm(true)}>➕ Enviar história</button>
      </header>

      <div className="map-wrapper">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          className="teorias-map"
          maxBounds={[
            [-85, -180],
            [85, 180],
          ]}
          maxBoundsViscosity={1}
          worldCopyJump={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap
          />

          {teoriasStories.map((story) => (
            <Marker
              key={story.id}
              position={story.position}
              icon={icons[story.type]}
              eventHandlers={{
                click: () => setSelectedStory(story),
              }}
            />
          ))}
        </MapContainer>

        {/* LEGENDA */}
        <div className="map-legend">
          <h4>Legenda</h4>

          <div>
            <GhostIcon width={4} height={4} /> Fantasmas
          </div>

          <div>
            <UfoIcon width={4} height={4} /> ETs
          </div>

          <div>
            <BloodIcon width={4} height={4} /> Conspirações
          </div>
        </div>
      </div>

      {/* MODAL HISTÓRIA */}
      {selectedStory && (
        <div className="modal-overlay" onClick={() => setSelectedStory(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedStory.title}</h2>
            <p>{selectedStory.content}</p>
            <button onClick={() => setSelectedStory(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* MODAL ENVIO */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Enviar nova história</h2>

            <input name="title" placeholder="Título" onChange={handleChange} />
            <textarea
              name="story"
              placeholder="Conte a história..."
              rows="5"
              onChange={handleChange}
            />
            <input name="city" placeholder="Cidade" onChange={handleChange} />
            <input
              name="state"
              placeholder="Estado / Região"
              onChange={handleChange}
            />
            <input name="country" placeholder="País" onChange={handleChange} />

            <p className="modal-warning">
              📩 A história será avaliada antes de aparecer no mapa.
            </p>

            <div className="modal-actions">
              <button onClick={handleSubmit}>Enviar</button>
              <button className="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeoriasPage;
