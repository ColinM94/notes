import { create } from "zustand";

import { Note } from "types/notes";
import { SetStoreState, Store } from "types/zustand";

interface AppStoreState {
  notes: Note[];
}

interface Actions {
  updateAppStore: SetStoreState<AppStoreState>;
}

export const useAppStore: Store<AppStoreState & Actions> = create((set) => ({
  notes: [],
  updateAppStore: (update) => set({ ...update }),
}));
