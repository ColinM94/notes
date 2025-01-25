import { classes } from "utils/classes";
import { Note } from "types/notes";

import { NoteCardHeader } from "./components/noteCardHeader/noteCardHeader";
import styles from "./styles.module.css";

interface Props {
  note: Note;
  className?: string;
}

export const NoteCard = (props: Props) => {
  const { note, className } = props;

  return (
    <div className={classes(styles.container, className)}>
      <NoteCardHeader note={note} className={styles.header} />

      <div className={styles.app}>{note.text}</div>
    </div>
  );
};
