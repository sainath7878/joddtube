import styles from "./historyCard.module.css";
import { Link } from "react-router-dom";
import { BiCheckCircleFill } from "assets/icons/Icons";
import { FaTrash } from "react-icons/fa";
import { useVideos } from "context";
import { trimTitle } from "utils";

function HistoryCard(video) {
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

  const { removeFromHistoryHandler } = useVideos();
  const trimmedTitle = trimTitle(title);

  return (
    <div className={styles.cardContainer}>
      <Link to={`/video/${_id}`} className={`card ${styles.card} `}>
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
          <p className="fs-s">{trimmedTitle}</p>
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
      <FaTrash
        className={styles.trashBtn}
        onClick={() => removeFromHistoryHandler(video)}
      />
    </div>
  );
}

export { HistoryCard };
