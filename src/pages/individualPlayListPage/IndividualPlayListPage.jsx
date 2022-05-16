import { EmptyCard, IndividualPlayListVideoCard } from "components";
import { useAuth, usePlayList } from "context";
import { useFetch, useDocumentTitle } from "hooks";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import styles from "./individualPlayListPage.module.css";

function IndividualPlayListPage() {
  const { playlistid } = useParams();

  const {
    authState: { encodedToken, loading },
  } = useAuth();

  const {
    playListDispatch,
    playListState: { playlists },
  } = usePlayList();

  const { playlist } = useFetch(`/api/user/playlists/${playlistid}`, {
    headers: {
      authorization: encodedToken,
    },
  });

  useDocumentTitle("PlayList")

  useEffect(() => {
    playlist &&
      playlist.videos.length > 0 &&
      playListDispatch({ type: "MANAGE_PLAYLISTS", payload: { playlist } });
  }, [playlist]);

  const playListVideos = playlists.find((item) => item._id === playlistid);
  return (
    <>
      {loading ? (
        <div className="loader">
          <RotatingLines width="100" strokeColor="#a40ae0" />
        </div>
      ) : playListVideos.videos && playListVideos.videos.length > 0 ? (
        <>
          <div className="videos-length">
            <h1>Videos ({playListVideos.videos.length})</h1>
          </div>
          <div className={styles.individualPlayListVideoContainer}>
            {playListVideos.videos.map((video) => {
              return (
                <IndividualPlayListVideoCard key={video._id} video={video} />
              );
            })}
          </div>
        </>
      ) : (
        <div className="emptyCard-container">
          <EmptyCard />
        </div>
      )}
    </>
  );
}

export { IndividualPlayListPage };
