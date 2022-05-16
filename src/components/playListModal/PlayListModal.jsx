import { BiXLg } from "assets/icons/Icons";
import { usePlayList } from "context/playListContext";
import { useEffect } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./playListModal.module.css";

function PlayListModal() {
  const {
    setShowPlayListModal,
    setPlayListData,
    playListData,
    createPlayListHandler,
    playListState: { playlists },
    addVideoToPlaylistHandler,
    deleteVideoFromPlayListHandler,
    showPlayListModal,
  } = usePlayList();
  const modalRef = useRef(null);
  const location = useLocation();
  const { video } = showPlayListModal;

  const submitHandler = ({ title }) => {
    if (!title) {
      toast.error("Title cannot be empty");
    } else {
      createPlayListHandler(playListData, video);
      setPlayListData({ title: "", description: "" });
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowPlayListModal((prev) => ({ ...prev, state: false, video: {} }));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const manageVideoInPlayListHandler = (playlistId, videoId) => {
    if (
      playlists
        .find((playlist) => playlist._id === playlistId)
        .videos.some(({ _id }) => _id === videoId)
    ) {
      deleteVideoFromPlayListHandler(videoId, playlistId);
    } else {
      addVideoToPlaylistHandler(video, playlistId);
    }
  };

  return (
    <div className={styles.playListModalContainer}>
      <form ref={modalRef} className={styles.playListForm}>
        <h1 className="fs-m">Add to Playlist</h1>
        {location.pathname !== "/playlist" && playlists.length > 0 && (
          <ul>
            {playlists.map((item) => {
              return (
                <div className={styles.playlistItem} key={item._id}>
                  <input
                    type="checkbox"
                    id={item.title}
                    value={item.title}
                    checked={playlists
                      .find((playlist) => playlist._id === item._id)
                      .videos.some(({ _id }) => _id === video._id)}
                    onChange={() =>
                      manageVideoInPlayListHandler(item._id, video._id)
                    }
                  />
                  <li className="fs-s">
                    <label htmlFor={item.title}>{item.title}</label>
                  </li>
                </div>
              );
            })}
          </ul>
        )}

        <input
          type="text"
          className="form-input"
          placeholder="Playlist Title"
          value={playListData.title}
          onChange={(e) =>
            setPlayListData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          className={styles.textarea}
          rows="3"
          placeholder="Enter Description (Optional)"
          maxLength="50"
          value={playListData.description}
          onChange={(e) =>
            setPlayListData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        ></textarea>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => submitHandler(playListData)}
        >
          Create New Playlist
        </button>
        <button type="button" className={styles.modalCloseBtn}>
          <BiXLg
            className="fs-m"
            onClick={() =>
              setShowPlayListModal((prev) => ({
                ...prev,
                state: false,
                video: {},
              }))
            }
          />
        </button>
      </form>
    </div>
  );
}

export { PlayListModal };
