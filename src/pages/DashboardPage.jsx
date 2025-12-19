import React from "react";
import MjPhoto from "../assets/images/juice.png";
import "./DashboardPage.css";
import { Link } from "react-router-dom";
import SkullIcon from "../assets/icons/SkullIcon";
import PeopleIcon from "../assets/icons/PeopleIcon";
import PlayIcon from "../assets/icons/PlayIcon";
import ChatIcon from "../assets/icons/ChatIcon";
import NewsIcon from "../assets/icons/NewsIcon";

function DashboardPage() {
  const queenBee = {
    achievement: "The best way to ensure a prisioner never escapes is to guarantee he never knows he's in prision.",
  };
  const conspirationPhoto = MjPhoto;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Welcome to the Truman Show</h2>

        <div className="action-buttons-header">
          <Link to="/debate" className="action-btn">
            <ChatIcon className="btn-icon" />
            <span className="btn-text">Debate</span>
          </Link>
{/* 
          <Link to="/colmeias" className="action-btn">
            <PeopleIcon className="btn-icon" />
            <span className="btn-text">Grupos</span>
          </Link> */}

          <Link to="/teorias" className="action-btn">
            <SkullIcon className="btn-icon" />
            <span className="btn-text">'Theories'</span>
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
        <div className="main-content-row">
          <div className="main-hub">
            <div className="hub-title">
              <h3>Featured</h3>
              <img src={conspirationPhoto} alt="Destaque" className="conspiration-sings" />
            </div>
          </div>

          {/* <div className="users-list-section">
            <h3 style={{ marginBottom: "10px" }}>👥 Membros Online</h3>
            
          </div> */}
        </div>

        <div className="queen-bee-card">
          <div className="queen-bee-header">
            <h3>News of the week</h3>
          </div>

          <div className="queen-bee-profile">
          
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
