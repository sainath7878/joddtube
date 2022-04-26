import styles from "components/videoCard/videoCard.module.css";
import {
  BiThreeDotsVertical,
  BiCheckCircleFill,
  PhClock,
  BiPlaylist,
} from "assets/icons/Icons";
import { useEffect, useRef, useState } from "react";

function VideoCard({
  imgSrc,
  name,
  thumbnail,
  title,
  creator,
  views,
  uploaded,
  length,
  verified,
}) {
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

  return (
    <div className={`card ${styles.card} `}>
      <img
        src={imgSrc}
        alt={title}
        loading="lazy"
        className={`card-image ${styles.cardImage}`}
      />
      <div className={styles.length}>{length}</div>
      <div className={styles.cardBody}>
        <img
          src={thumbnail}
          loading="lazy"
          alt={name}
          className="avatar-m avatar-rounded"
        />
        <p className="fs-s">{title}</p>

        {showMoreOptions && (
          <div className={styles.moreOptionsContainer}>
            <ul>
              <li className={styles.moreOptionsListItem}>
                <PhClock />
                <span>Watch Later</span>
              </li>
              <li className={styles.moreOptionsListItem}>
                <BiPlaylist />
                <span>Add to Playlist</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <span
        className={styles.moreOption}
        ref={moreOptionsRef}
        onClick={() => setShowMoreOptions((prev) => !prev)}
      >
        <BiThreeDotsVertical />
      </span>
      <div className={styles.cardFooter}>
        <p>{creator}</p>
        {verified && <BiCheckCircleFill />}
      </div>
      <div className={styles.videoDetails}>
        <p>{views} views</p>
        <p className={styles.dotSeparator}></p>
        <p>{uploaded}</p>
      </div>
    </div>
  );
}

export { VideoCard };
