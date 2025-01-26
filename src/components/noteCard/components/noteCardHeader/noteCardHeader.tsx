import { classes } from "utils/classes";
import { deleteDocument } from "services/database/deleteDocument";
import { Button } from "components/button/button";
import { Note } from "types/notes";

import styles from "./styles.module.css";

interface Props {
  note: Note;
  className?: string;
}

export const NoteCardHeader = (props: Props) => {
  const { note, className } = props;

  const handleDelete = () => {
    console.log(note.id);

    deleteDocument({
      collection: "notes",
      documentId: note.id,
    });
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.heading}>{note.heading}</div>
      <Button icon="delete" onClick={handleDelete} />
    </div>
  );
};
