import { EmptyCard, WatchLaterCard } from "components";
import { useAuth, useVideos } from "context";
import { useDocumentTitle, useFetch } from "hooks";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./watchLater.module.css";

function WatchLaterPage() {
  const {
    authState: { loading },
  } = useAuth();

  const {
    videoState: { watchLaterVideos },
    videoDispatch,
  } = useVideos();

  const encodedToken = localStorage.getItem("token");

  const { watchlater } = useFetch("/api/user/watchlater", {
    headers: {
      authorization: encodedToken,
    },
  });

  useDocumentTitle("Watch Later");

  useEffect(() => {
    videoDispatch({
      type: "SET_WATCHLATER_VIDEOS",
      payload: { watchLaterVideos: watchlater },
    });
  }, [watchlater]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <RotatingLines width="100" strokeColor="#a40ae0" />
        </div>
      ) : watchLaterVideos.length > 0 ? (
        <>
          <div className="videos-length">
            <h1>Watch Later Videos ({watchLaterVideos.length})</h1>
          </div>
          <div className={styles.watchLaterVideosContainer}>
            {watchLaterVideos.map(
              ({
                _id,
                imgSrc,
                thumbnail,
                title,
                creator,
                views,
                uploaded,
                length,
                verified,
              }) => {
                return (
                  <WatchLaterCard
                    key={_id}
                    _id={_id}
                    imgSrc={imgSrc}
                    title={title}
                    thumbnail={thumbnail}
                    creator={creator}
                    views={views}
                    uploaded={uploaded}
                    length={length}
                    verified={verified}
                  />
                );
              }
            )}
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

export { WatchLaterPage };
