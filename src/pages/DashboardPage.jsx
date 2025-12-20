import React from "react";
import "./DashboardPage.css";
import { Link } from "react-router-dom";

import SkullIcon from "../assets/icons/SkullIcon";
import PlayIcon from "../assets/icons/PlayIcon";
import ChatIcon from "../assets/icons/ChatIcon";
import NewsIcon from "../assets/icons/NewsIcon";

function DashboardPage() {
  const queenBee = {
    achievement:
      "The best way to ensure a prisoner never escapes is to guarantee he never knows he's in prison.",
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Welcome to the Truman Show</h2>

        <div className="action-buttons-header">
          <Link to="/debate" className="action-btn">
            <ChatIcon className="btn-icon" />
            <span className="btn-text">Debate</span>
          </Link>

          <Link to="/teorias" className="action-btn">
            <SkullIcon className="btn-icon" />
            <span className="btn-text">Theories</span>
          </Link>

          <Link to="/videos" className="action-btn">
            <PlayIcon className="btn-icon" />
            <span className="btn-text">Videos</span>
          </Link>

          <Link to="/news" className="action-btn">
            <NewsIcon className="btn-icon2" />
            <span className="btn-text2">News</span>
          </Link>
        </div>
      </header>

      <main className="dashboard-main-content">
        {/* FEATURED VIDEO */}
        <div className="main-hub">
          <div className="hub-title">🎬 Featured Broadcast</div>

          <div className="featured-video-wrapper">
            <video
              className="featured-video"
              src="https://drive.google.com/file/d/16Rf6k5Z9x_3r9k68oI0ItYx5m9J-oKR9/view?usp=drive_link"
              autoPlay
              muted
              loop
              controls
              playsInline
            />
          </div>
        </div>

        {/* NEWS */}
        <div className="queen-bee-card">
          <div className="queen-bee-header">
            <h3>News of the week</h3>
          </div>

          <div className="queen-bee-achievement">
            <p>"{queenBee.achievement}"</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
