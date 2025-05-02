// useStore.ts
import create from "zustand";

interface StoreState {
  isFormOpen: boolean;
  toggleForm: () => void;
  openForm: () => void;
  closeForm: () => void;
}

const useStore = create<StoreState>((set) => ({
  isFormOpen: false,
  toggleForm: () => set((state) => ({ isFormOpen: !state.isFormOpen })),
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false }),
}));

export default useStore;
