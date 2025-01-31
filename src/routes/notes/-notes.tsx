import * as React from "react";

import { Button } from "components/button/button";
import { NoteCard } from "components/noteCard/noteCard";
import { InputText } from "components/inputText/inputText";
import { Card } from "components/card/card";
import { createDocument } from "services/database/createDocument";
import { loadNotes } from "services/database/loadNotes";
import { deleteDocument } from "services/database/deleteDocument";
import { useAppStore } from "stores/appStore";
import { Note } from "types/notes";
import { reactReducer } from "utils/reactReducer";
import { client } from "inits/backend";

import styles from "./styles.module.css";

export const Notes = () => {
  const { notes } = useAppStore();

  const [newNote, updateNewNote] = reactReducer<Note>({
    id: "",
    heading: "",
    text: "",
  });

  const handleCreate = async () => {
    await createDocument<Note>({
      collection: "notes",
      data: {
        text: newNote.text,
        heading: newNote.heading,
      },
    });

    loadNotes();
  };

  React.useEffect(() => {
    const unsubscribe = client.subscribe("collections.notes", (response) => {
      console.log(response);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (noteId: string) => {
    await deleteDocument({
      collection: "notes",
      documentId: noteId,
    });

    loadNotes();
  };

  return (
    <>
      {notes.map((note) => (
        <NoteCard
          note={note}
          key={note.$id}
          onDeleteClick={() => handleDelete(note.id)}
          className={styles.note}
        />
      ))}

      <Card className={styles.newNote}>
        <InputText
          label="Heading"
          value={newNote.heading}
          setValue={(heading) => updateNewNote({ heading })}
          surface={1}
        />

        <InputText
          label="Text"
          value={newNote.text}
          setValue={(text) => updateNewNote({ text })}
          surface={1}
        />

        <Button icon="add" label="Create" onClick={handleCreate} surface={1} />
      </Card>
    </>
  );
};
