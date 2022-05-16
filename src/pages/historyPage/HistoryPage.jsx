import { EmptyCard, HistoryCard } from "components";
import { useAuth, useVideos } from "context";
import { useDocumentTitle } from "hooks";
import { useFetch } from "hooks/useFetch";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./historyPage.module.css";

function HistoryPage() {
  const {
    authState: { loading, encodedToken },
  } = useAuth();

  const {
    videoState: { historyVideos },
    videoDispatch,
    clearHistoryHandler,
  } = useVideos();

  const { history } = useFetch("/api/user/history", {
    headers: {
      authorization: encodedToken,
    },
  });

  useDocumentTitle("History")

  useEffect(() => {
    videoDispatch({
      type: "SET_HISTORY_VIDEOS",
      payload: { historyVideos: history },
    });
  }, [history]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <RotatingLines width="100" strokeColor="#a40ae0" />
        </div>
      ) : historyVideos.length > 0 ? (
        <>
          <div className="videos-length">
            <h1>History Videos ({historyVideos.length})</h1>
          </div>
          <div className={styles.clearHistoryBtnContainer}>
            <button className="btn btn-danger" onClick={clearHistoryHandler}>
              Clear History
            </button>
          </div>
          <div className={styles.historyVideosContainer}>
            {historyVideos.map(
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
                  <HistoryCard
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

export { HistoryPage };
