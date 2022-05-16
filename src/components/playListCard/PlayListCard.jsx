import { BiTrashFill } from "assets/icons/Icons";
import { usePlayList } from "context";
import { Link } from "react-router-dom";
import styles from "./playListCard.module.css";

function PlayListCard({ playlist }) {
  const { _id, title, description } = playlist;
  const { deletePlayListHandler } = usePlayList();
  return (
    <div className={styles.playlistContainer}>
      <Link to={`${_id}`}>
        <div className={styles.playListLengthContainer}>
          {!playlist.videos.length > 0 ? (
            <img
              src="https://res.cloudinary.com/duy47nrum/image/upload/v1652469155/joddtube/plus_uwhn1l.avif"
              alt="Placeholder"
              loading="lazy"
              className={styles.playListImage}
            />
          ) : (
            <img
              src={playlist.videos[0].imgSrc}
              alt={playlist.videos[0].title}
              loading="lazy"
              className={styles.playListImage}
            />
          )}
          <h1 className={styles.playListLength}>
            {playlist.videos.length === 0
              ? "PlayList is Empty"
              : `(${playlist.videos.length}) videos`}
          </h1>
        </div>
      </Link>
      <div className={styles.playListDescription}>
        <div className={styles.playListTitle}>
          <h1 className="fs-m">{title}</h1>
          <button
            className={styles.trashBtn}
            onClick={() => deletePlayListHandler(playlist)}
          >
            <BiTrashFill className="fs-m" />
          </button>
        </div>

        <h3 className="fs-s mb-sm">{description}</h3>
      </div>
    </div>
  );
}

export { PlayListCard };
