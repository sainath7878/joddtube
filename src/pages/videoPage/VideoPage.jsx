import { useParams } from "react-router-dom";
import styles from "./videoPage.module.css";
import { useFetch } from "hooks";
import { RotatingLines } from "react-loader-spinner";
import {
  BiHeartFill,
  BiClockFill,
  BiArrowDownSquareFill,
} from "assets/icons/Icons";
import { useVideos, useAuth, usePlayList } from "context";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function VideoPage() {
  const { videoId } = useParams();
  const { video } = useFetch(`/api/video/${videoId}`);

  const { setShowPlayListModal } = usePlayList();

  const {
    videoState: { likedVideos, watchLaterVideos, historyVideos },
    likeHandler,
    unLikeHandler,
    addToWatchLaterHandler,
    removeFromWatchlaterHandler,
    videoDispatch,
  } = useVideos();
  const {
    authState: { loading, encodedToken },
  } = useAuth();

  useEffect(() => {
    if (!historyVideos.some((item) => item._id === videoId) && video) {
      (async () => {
        try {
          const response = await axios.post(
            "/api/user/history",
            {
              video: video,
            },
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          if (response.status === 201) {
            videoDispatch({
              type: "SET_HISTORY_VIDEOS",
              payload: { historyVideos: response.data.history },
            });
          }
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.errors[0]);
        }
      })();
    }
  }, [video]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <RotatingLines width="100" strokeColor="#a40ae0" />
        </div>
      ) : (
        video && (
          <div className={styles.videoContainer}>
            <iframe
              className={styles.video}
              src={`https://www.youtube.com/embed/${video.url}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className={styles.videoDetails}>
              <h1 className={styles.videoTitle}>{video.title}</h1>
              <div className={styles.section}>
                <div className={styles.creatorSection}>
                  <div>
                    <img
                      src={video.thumbnail}
                      loading="lazy"
                      alt={video.creator}
                      className="avatar-l avatar-rounded"
                    />
                  </div>
                  <div className={styles.creatorSubSection}>
                    <h1>{video.creator}</h1>
                    <h2 className={styles.subs}>
                      {video.subscribers} subscribers
                    </h2>
                  </div>
                </div>
                <div className={styles.cta}>
                  <div className={styles.btn}>
                    {likedVideos.find((item) => item._id === video._id) ? (
                      <button
                        className={styles.activeBtn}
                        onClick={() => unLikeHandler(video)}
                      >
                        <BiHeartFill className={styles.liked} />
                        Liked
                      </button>
                    ) : (
                      <button
                        className={styles.activeBtn}
                        onClick={() => likeHandler(video)}
                      >
                        <BiHeartFill />
                        Like
                      </button>
                    )}
                  </div>

                  <div className={styles.btn}>
                    <button
                      className={styles.activeBtn}
                      onClick={() =>
                        setShowPlayListModal((prev) => ({
                          ...prev,
                          state: true,
                          video,
                        }))
                      }
                    >
                      <BiArrowDownSquareFill />
                      Save
                    </button>
                  </div>

                  <div className={styles.btn}>
                    {watchLaterVideos.find((item) => item._id === video._id) ? (
                      <button
                        onClick={() => removeFromWatchlaterHandler(video)}
                        className={styles.activeBtn}
                      >
                        <BiClockFill />
                        Remove from Later
                      </button>
                    ) : (
                      <button
                        onClick={() => addToWatchLaterHandler(video)}
                        className={styles.activeBtn}
                      >
                        <BiClockFill />
                        Watch Later
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <h2 className={styles.videoDescription}>{video.description}</h2>
            </div>
          </div>
        )
      )}
    </>
  );
}

export { VideoPage };
