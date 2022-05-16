import { useLocation, Link } from "react-router-dom";
import styles from "./emptyCard.module.css";

function EmptyCard() {
  const location = useLocation();
  let text = "";
  switch (location.pathname) {
    case "/liked":
      text = "No Liked Videos";
      break;
    case "/history":
      text = "No Videos Watched";
      break;
    case "/watchlater":
      text = "No Videos in Watch Later";
      break;
    case "/playlist":
      text = "No Playlist available";
      break;
    default:
      text = "";
  }

  return (
    <>
      {location.pathname.match("/playlist/") ? (
        <h1 className="fs-ml">No Videos in Playlist</h1>
      ) : (
        <h1 className="fs-ml">{text}</h1>
      )}
      <img
        src="https://res.cloudinary.com/duy47nrum/image/upload/v1652174657/joddtube/undraw_video_streaming_re_v3qg_bzbtu6.svg"
        alt="empty video"
        className={styles.emptyCardImage}
      />
      {location.pathname !== "/playlist" && (
        <Link to="/">
          <button className="btn btn-secondary">Browse Videos</button>
        </Link>
      )}
    </>
  );
}

export { EmptyCard };
