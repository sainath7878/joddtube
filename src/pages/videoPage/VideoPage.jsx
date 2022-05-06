import { useParams } from "react-router-dom";
import styles from "./videoPage.module.css";
import { useFetch } from "hooks/useFetch";
import { RotatingLines } from "react-loader-spinner";
import {
  BiHeartFill,
  BiClockFill,
  BiArrowDownSquareFill,
} from "assets/icons/Icons";

function VideoPage() {
  const { videoId } = useParams();
  const { video } = useFetch(`/api/video/${videoId}`);

  return (
    <>
      {video ? (
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
                  <button>
                    <BiHeartFill />
                    Like
                  </button>
                </div>

                <div className={styles.btn}>
                  <button >
                    <BiArrowDownSquareFill />
                    Save
                  </button>
                </div>

                <div className={styles.btn}>
                  <button>
                    <BiClockFill />
                    Watch Later
                  </button>
                </div>
              </div>
            </div>
            <h2 className={styles.videoDescription}>{video.description}</h2>
          </div>
        </div>
      ) : (
        <div className="loader">
          <RotatingLines width="100" strokeColor="#a40ae0" />
        </div>
      )}
    </>
  );
}

export { VideoPage };
