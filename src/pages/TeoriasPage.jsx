import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TeoriasPage.css";
import { renderToStaticMarkup } from "react-dom/server";
import ReturnIcon from "../assets/icons/ReturnIcon";

/* MODAIS */
import TeoriaReadModal from "../components/teorias/TeoriaReadModal";
import TeoriaSendModal from "../components/teorias/TeoriaSendModal";

/* ICONES */
import GhostIcon from "../assets/icons/GhostIcon";
import UfoIcon from "../assets/icons/UfoIcon";
import BloodIcon from "../assets/icons/BloodIcon";

/* DADOS */
import { teoriasStories } from "../data/teoriasStories";

/* ICONES DO MAPA */
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
  const [showSendModal, setShowSendModal] = useState(false);

  return (
    <div className="teorias-container">
      {/* HEADER */}
      <header className="teorias-header">
        <Link to="/" className="zunzuns-back">
          <ReturnIcon className="btn-icon" /> 
        </Link>

        <h1>🌍 Theories</h1>
        <p>Click on the simbols to explore hidden stories</p>

        <button onClick={() => setShowSendModal(true)}>
          ➕ Send storie
        </button>
      </header>

      {/* MAPA */}
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
          <h4>Capition</h4>

          <div>
            <GhostIcon width={14} height={14} /> Ghosts
          </div>

          <div>
            <UfoIcon width={14} height={14} /> Aliens/UFO
          </div>

          <div>
            <BloodIcon width={14} height={14} /> Conspiracy
          </div>
        </div>
      </div>

      {/* MODAL LEITURA */}
      <TeoriaReadModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      {/* MODAL ENVIO */}
      <TeoriaSendModal
        open={showSendModal}
        onClose={() => setShowSendModal(false)}
      />
    </div>
  );
}

export default TeoriasPage;
