import './App.css';
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import { Header, Sidebar, SignIn, SignUp, PlayListModal } from "components/index"
import { NotFound, LandingPage, HistoryPage, WatchLaterPage, LikedPage, PlayListPage, VideoPage, AuthorizationPage, RestrictAuth, IndividualPlayListPage } from "pages"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from 'context/authContext';
import { usePlayList } from 'context/playListContext';


function App() {
  const token = localStorage.getItem("token")
  const { authDispatch } = useAuth();
  const { showPlayListModal } = usePlayList();
  useEffect(() => {
    if (token) {
      authDispatch({ type: "SET_USER", payload: { encodedToken: token } })
    }
  }, [])
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <ToastContainer theme="colored" autoClose={2000} position="top-right" className="fs-s" />
        {showPlayListModal.state && <PlayListModal />}
        <div className="content">
          <Routes>
            <Route path="/mockman" element={<Mockman />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route element={<AuthorizationPage />}>
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/watchlater" element={<WatchLaterPage />} />
              <Route path="/liked" element={<LikedPage />} />
              <Route path="/playlist" element={<PlayListPage />} />
              <Route path="/playlist/:playlistid" element={<IndividualPlayListPage />} />
            </Route>

            <Route element={<RestrictAuth />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div >
  );
}

export default App;
