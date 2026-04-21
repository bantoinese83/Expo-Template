import { create } from "zustand";

interface DebugStore {
  isViewerVisible: boolean;
  showViewer: () => void;
  hideViewer: () => void;
  toggleViewer: () => void;
}

/**
 * Global state for the in-app debug terminal.
 * Can be triggered via hidden gestures or settings.
 */
export const useDebugStore = create<DebugStore>((set) => ({
  isViewerVisible: false,
  showViewer: () => set({ isViewerVisible: true }),
  hideViewer: () => set({ isViewerVisible: false }),
  toggleViewer: () => set((state) => ({ isViewerVisible: !state.isViewerVisible })),
}));
