import './App.css';
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import { Header, Sidebar } from "components/index"
import { NotFound, LandingPage, HistoryPage, WatchLaterPage, LikedPage, PlayListPage, VideoPage } from "pages/index"
import { ToastContainer } from "react-toastify"


function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <ToastContainer theme="colored" autoClose={2000} position="top-right" />
        <div className="content">
          <Routes>
            <Route path="/mockman" element={<Mockman />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/watchlater" element={<WatchLaterPage />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="/playlist" element={<PlayListPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div >
  );
}

export default App;
