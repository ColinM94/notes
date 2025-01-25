import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "components/button/button";
import { NoteCard } from "components/noteCard/noteCard";
import { InputText } from "components/inputText/inputText";
import { Card } from "components/card/card";
import { listDocuments } from "services/database/listDocuments";
import { createDocument } from "services/database/createDocument";
import { Note } from "types/notes";

import styles from "./styles.module.css";

export const Notes = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [newNoteHeading, setNewNoteHeading] = React.useState("");

  const loadNotes = async () => {
    const result = await listDocuments({
      collection: "notes",
    });

    if (result.success) {
      setNotes(result.data);
    }
  };

  React.useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = async () => {
    await createDocument<Note>({
      collection: "notes",
      data: {
        heading: "test",
      },
    });

    loadNotes();
  };

  return (
    <>
      {notes.map((note) => (
        <NoteCard note={note} />
      ))}

      <Card className={styles.newNote}>
        <InputText
          label="Note Heading"
          value={newNoteHeading}
          setValue={(value) => setNewNoteHeading(value)}
        />

        <Button icon="add" label="Create" onClick={handleCreate} surface={1} />
      </Card>
    </>
  );
};
