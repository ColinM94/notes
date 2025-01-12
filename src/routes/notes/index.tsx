import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Card } from "components/card/card";
import { Button } from "components/button/button";
import { listDocuments } from "services/database/listDocuments";
import { createDocument } from "services/database/createDocument";

import styles from "./styles.module.css";
import { deleteDocument } from "services/database/deleteDocument";

interface Note extends Document {
  name: string;
}

const RouteComponent = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);

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
    await createDocument({
      collection: "notes",
      data: {
        name: "test",
      },
    });

    loadNotes();
  };

  const deleteNote = (id: string) => {
    deleteDocument({
      collection: "notes",
      documentId: id,
    });
  };
  return (
    <>
      {notes.map((note) => (
        <Card className={styles.card}>
          {note.name}

          <Button
            label="Delete"
            onClick={() => deleteNote(note.id)}
            icon="delete"
          />
        </Card>
      ))}

      <Button label="Create" onClick={handleCreate} icon={"add"} />
    </>
  );
};

export const Route = createFileRoute("/notes/")({
  component: RouteComponent,
});
