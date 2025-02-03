import { Note } from "types/notes";
import { useAppStore } from "stores/appStore";
import { listRecords } from "./listRecords";

export const loadNotes = async () => {
  const { updateAppStore } = useAppStore.getState();

  const response = await listRecords<Note>({
    collection: "notes",
  });

  if (response.success) {
    updateAppStore({
      notes: response.data,
    });
  }
};
