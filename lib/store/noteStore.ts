import type { NoteDraft } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Draft {
  draft: NoteDraft;
  setDraft: (draft: NoteDraft) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useDraftNote = create<Draft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft: NoteDraft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "draft", partialize: (state) => ({ draft: state.draft }) }
  )
);
