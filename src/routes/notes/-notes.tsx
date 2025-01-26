import * as React from "react";

import { Button } from "components/button/button";
import { NoteCard } from "components/noteCard/noteCard";
import { InputText } from "components/inputText/inputText";
import { Card } from "components/card/card";
import { listDocuments } from "services/database/listDocuments";
import { createDocument } from "services/database/createDocument";
import { Note } from "types/notes";

import styles from "./styles.module.css";
import { client } from "inits/backend";

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
    // const channel =
    //   "databases.6781c73400396ac1fcd7.collections.6781c79a003e0fc7938c.documents";

    // const unsubscribe = client.subscribe(channel, (response) => {
    //   console.log(response);

    //   if (
    //     response.events.includes("databases.notes.collections.notes.documents")
    //   ) {
    //     // Log when a new file is uploaded
    //   }
    // });

    const unsubscribe = client.subscribe("files", (response) => {
      console.log(response.payload);
      if (response.events.includes("buckets.*.files.*.create")) {
        // Log when a new file is uploaded
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCreate = async () => {
    await createDocument<Note>({
      collection: "notes",
      data: {
        heading: "test",
      },
    });
  };

  return (
    <>
      {notes.map((note) => (
        <NoteCard note={note} key={note.id} />
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
