import { EmptyCard, PlayListCard } from "components";
import { useAuth, usePlayList } from "context";
import { useDocumentTitle, useFetch } from "hooks";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./playListPage.module.css";

function PlayListPage() {
  const {
    authState: { loading, encodedToken },
  } = useAuth();

  const {
    playListState: { playlists },
    playListDispatch,
    setShowPlayListModal,
  } = usePlayList();

  //Fetching the playlists from db
  const { playlists: playlist } = useFetch("/api/user/playlists", {
    headers: {
      authorization: encodedToken,
    },
  });

  //setting the playlists in state variable
  useEffect(() => {
    playListDispatch({ type: "SET_PLAYLISTS", payload: { playlist } });
  }, [playlist]);

  useDocumentTitle("PlayList");

  return (
    <>
      {loading ? (
        <div className="loader">
          <RotatingLines width="100" strokeColor="#a40ae0" />
        </div>
      ) : playlists.length > 0 ? (
        <>
          <div className="videos-length">
            <h1>PlayList ({playlists.length})</h1>
          </div>
          <div className={styles.createPlayListBtn}>
            <button
              className="btn btn-secondary"
              onClick={() =>
                setShowPlayListModal((prev) => ({ ...prev, state: true }))
              }
            >
              Create Playlist
            </button>
          </div>
          <div className={styles.playListContainer}>
            {playlists.map((playlist) => {
              return <PlayListCard playlist={playlist} key={playlist._id} />;
            })}
          </div>
        </>
      ) : (
        <>
          <div className={styles.createPlayListBtn}>
            <button
              className="btn btn-secondary"
              onClick={() =>
                setShowPlayListModal((prev) => ({ ...prev, state: true }))
              }
            >
              Create Playlist
            </button>
          </div>
          <div className="emptyCard-container">
            <EmptyCard />
          </div>
        </>
      )}
    </>
  );
}

export { PlayListPage };
