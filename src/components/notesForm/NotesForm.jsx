import { BiTrashFill } from "assets/icons/Icons";
import { useVideos } from "context";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./notesForm.module.css";

function NotesForm() {
  const { videoId } = useParams();

  const {
    addNoteHandler,
    removeAllNoteshandler,
    notesData,
    setNotesData,
    editNoteHandler,
  } = useVideos();

  const submitHandler = () => {
    const { title, id } = notesData;
    if (!title || title.trim().length === 0) {
      toast.error("Title cannot be empty");
    } else if (!id) {
      addNoteHandler(notesData, setNotesData, videoId);
    } else if (id) {
      editNoteHandler({ notesData, setNotesData, videoId });
    }
  };

  return (
    <>
      <form className={styles.notesForm}>
        <div className={styles.cta}>
          <h1 className="fs-ml mb-sm">Notes</h1>
          <button
            className={`btn ${styles.trashBtn} fs-s`}
            type="button"
            onClick={() => removeAllNoteshandler(videoId)}
          >
            <BiTrashFill />
            Clear Notes
          </button>
        </div>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Title</legend>
          <input
            type="text"
            placeholder="Enter Title"
            className={styles.formInput}
            onChange={(event) =>
              setNotesData((prev) => ({ ...prev, title: event.target.value }))
            }
            value={notesData.title}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Description</legend>
          <input
            type="text"
            placeholder="Enter Description(Optional)"
            className={styles.formInput}
            onChange={(event) =>
              setNotesData((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            value={notesData.description}
          />
        </fieldset>
        {notesData.id ? (
          <button
            type="button"
            className={styles.addNoteBtn}
            onClick={submitHandler}
          >
            Update Note
          </button>
        ) : (
          <button
            type="button"
            className={styles.addNoteBtn}
            onClick={submitHandler}
          >
            Add Note
          </button>
        )}
      </form>
    </>
  );
}

export { NotesForm };
