import { Note } from "types/notes";
import { listDocuments } from "./listDocuments";
import { useAppStore } from "stores/appStore";

export const loadNotes = async () => {
  const result = await listDocuments<Note[]>({
    collection: "notes",
  });

  if (result.success) {
    useAppStore.getState().updateAppStore({
      notes: result.data,
    });
  }
};
