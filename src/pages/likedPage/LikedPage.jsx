import { useVideos } from "context/videoContext";
import { useDocumentTitle, useFetch } from "hooks";
import { useEffect } from "react";
import styles from "./likedPage.module.css";
import { EmptyCard, LikedCard } from "components";
import { useAuth } from "context";
import { RotatingLines } from "react-loader-spinner";

function LikedPage() {
  const {
    videoDispatch,
    videoState: { likedVideos },
  } = useVideos();

  const {
    authState: { loading },
  } = useAuth();

  useDocumentTitle("Likes")

  const encodedToken = localStorage.getItem("token");

  const { likes } = useFetch("/api/user/likes", {
    headers: {
      authorization: encodedToken,
    },
  });

  useEffect(() => {
    videoDispatch({
      type: "SET_LIKED_VIDEOS",
      payload: { likedVideos: likes },
    });
  }, [likes]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <RotatingLines width="100" strokeColor="#a40ae0" />
        </div>
      ) : likedVideos.length > 0 ? (
        <>
          <div className="videos-length">
            <h1>Liked Videos ({likedVideos.length})</h1>
          </div>
          <div className={styles.likedVideosContainer}>
            {likedVideos.map(
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
                  <LikedCard
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

export { LikedPage };
