import { BiPencilFill, BiTrashFill } from "assets/icons/Icons";
import { useVideos } from "context";
import { useParams } from "react-router-dom";
import styles from "./notesCard.module.css";

function NotesCard({ note: notesArray }) {
  const { removeNoteHandler, setNotesData } = useVideos();
  const { videoId } = useParams();
  return notesArray && notesArray.notes.length > 0
    ? notesArray.notes.map((note) => {
        const { title, description, createdAt, id, updatedAt } = note;
        const createdDate = new Date(createdAt);
        const updatedDate = new Date(updatedAt);
        return (
          <div key={id} className={styles.notedCardContainer}>
            <h1 className="fs-ml">{title}</h1>
            {description && <p className="fs-m">{description}</p>}
            {createdAt && (
              <p className="fs-s">
                Added on {createdDate.toLocaleDateString()}, at{" "}
                {createdDate.toLocaleTimeString()}
              </p>
            )}
            {updatedAt && (
              <p className="fs-s">
                Updated on {updatedDate.toLocaleDateString()}, at{" "}
                {updatedDate.toLocaleTimeString()}
              </p>
            )}
            <div className={styles.cta}>
              <BiTrashFill
                className="fs-m mr-sm"
                onClick={() => removeNoteHandler(id, videoId)}
              />
              <BiPencilFill
                className="fs-m"
                onClick={() =>
                  setNotesData((prev) => ({ ...prev, title, description, id }))
                }
              />
            </div>
          </div>
        );
      })
    : null;
}

export { NotesCard };
