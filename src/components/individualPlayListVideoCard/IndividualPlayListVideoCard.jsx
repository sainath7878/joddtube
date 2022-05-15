import { BiCheckCircleFill } from "assets/icons/Icons";
import { usePlayList } from "context/playListContext";
import { FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./individualPlayListVideoCard.module.css";

function IndividualPlayListVideoCard({ video }) {
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

  const { playlistid } = useParams();
  const { deleteVideoFromPlayListHandler } = usePlayList();

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
      <FaTrash
        className={styles.trashBtn}
        onClick={() => deleteVideoFromPlayListHandler(_id, playlistid)}
      />
    </div>
  );
}

export { IndividualPlayListVideoCard };
