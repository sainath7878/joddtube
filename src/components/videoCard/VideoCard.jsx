import styles from "components/videoCard/videoCard.module.css";
import {
  BiThreeDotsVertical,
  BiCheckCircleFill,
  PhClock,
  BiPlaylist,
} from "assets/icons/Icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "context/videoContext";
import { usePlayList } from "context/playListContext";

function VideoCard(video) {
  const {
    _id,
    imgSrc,
    name,
    thumbnail,
    title,
    creator,
    views,
    uploaded,
    length,
    verified,
  } = video;
  const moreOptionsRef = useRef(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleClickOutside = (event) => {
    if (
      moreOptionsRef.current &&
      !moreOptionsRef.current.contains(event.target)
    ) {
      setShowMoreOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const {
    addToWatchLaterHandler,
    removeFromWatchlaterHandler,
    videoState: { watchLaterVideos },
  } = useVideos();

  const { addVideoToPlaylistHandler, setShowPlayListModal } = usePlayList();

  return (
    <div className={styles.cardContainer}>
      <Link to={`/video/${_id}`} className={`card ${styles.card} `}>
        <div>
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            className={`card-image ${styles.cardImage}`}
          />
          <span className={styles.length}>{length}</span>
        </div>

        <div className={styles.length}>{length}</div>
        <div className={styles.cardBody}>
          <img
            src={thumbnail}
            loading="lazy"
            alt={name}
            className="avatar-m avatar-rounded"
          />
          <p className="fs-s">{title}</p>
        </div>
        <div className={styles.cardFooter}>
          <p>{creator}</p>
          {verified && <BiCheckCircleFill />}
        </div>
        <div className={styles.videoDetails}>
          <p>{views} views</p>
          <p className={styles.dotSeparator}></p>
          <p>{uploaded}</p>
        </div>
      </Link>
      <span
        className={styles.moreOption}
        ref={moreOptionsRef}
        onClick={() => setShowMoreOptions((prev) => !prev)}
      >
        <BiThreeDotsVertical />
      </span>

      {showMoreOptions && (
        <div className={styles.moreOptionsContainer}>
          <ul>
            {watchLaterVideos.find((item) => item._id === video._id) ? (
              <li
                className={styles.moreOptionsListItem}
                onClick={() => removeFromWatchlaterHandler(video)}
              >
                <PhClock />
                <span>Remove from Later</span>
              </li>
            ) : (
              <li
                className={styles.moreOptionsListItem}
                onClick={() => addToWatchLaterHandler(video)}
              >
                <PhClock />
                <span>Watch Later</span>
              </li>
            )}
            <li
              className={styles.moreOptionsListItem}
              onClick={() =>
                setShowPlayListModal((prev) => ({
                  ...prev,
                  state: true,
                  video,
                }))
              }
            >
              <BiPlaylist />
              <span>Add to Playlist</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export { VideoCard };
