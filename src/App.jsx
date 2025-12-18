import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import DebatePage from "./pages/DebatePage";
import VideosPage from "./pages/VideosPage";
import NewsPage from "./pages/NewsPage";
import TeoriasPage from "./pages/TeoriasPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/teorias" element={<TeoriasPage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/debate" element={<DebatePage />} />
      <Route path="/news" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
